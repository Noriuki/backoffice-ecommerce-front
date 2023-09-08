'use client';

import Uploader from '@/components/Uploader';
import ValidateProductsTable from '@/components/ValidateProductsTable';
import apiService from '@/services/api';
import { ChangeEvent, useState } from 'react';
import Swal from 'sweetalert2';

export default function Produtos() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [productsToUpdate, setProductsToUpdate] = useState<any[]>([]);
    const [validList, setValidList] = useState<boolean>(false);
    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files) {
            const file = files[0];
            setFile(file);
        }
    };

    const handleValidateCsv = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file as Blob);

            const { data } = await apiService.post('/products/check-csv', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
            if (data?.success) {
                Swal.fire('Parabéns!', 'Os preço foram verificados e podem ser atualizados.', 'success');
            } else {
                Swal.fire('Revise sua lista!', 'Os preço não podem ser atualizados.', 'warning');
            }
            setValidList(data?.success);
            setProductsToUpdate(data?.results);
        } catch (err) {
            console.log(err);
            Swal.fire('Ocorreu um erro!', 'Tente novamente.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePrices = async () => {
        setLoading(true);
        const formattedList = productsToUpdate.map((product) => ({
            product_code: product.code,
            new_price: product.new_price,
        }));
        try {
            const { data } = await apiService.post('/products/update-prices', { products: formattedList });
            if (data?.success) {
                Swal.fire('Parabéns!', 'Produtos atualizados com sucesso.', 'success');
            } else {
                Swal.fire('Revise sua lista!', 'Os preço não podem ser atualizados.', 'warning');
            }
        } catch (err) {
            console.log(err);
            Swal.fire('Ocorreu um erro!', 'Tente novamente.', 'error');
        } finally {
            setFile(null);
            setValidList(false);
            setProductsToUpdate([]);

            setLoading(false);
        }
    };

    if (loading) return <span className="loading loading-spinner loading-lg min-h-screen mx-auto"></span>;
    return (
        <div className="flex flex-wrap max-w-screen-lg w-full min-h-screen mx-auto py-8">
            {!!productsToUpdate.length ? (
                <ValidateProductsTable
                    productsToUpdate={productsToUpdate}
                    valid={validList}
                    handleUpdatePrices={handleUpdatePrices}
                />
            ) : (
                <div className="w-1/3 h-max flex flex-wrap space-y-4 m-auto">
                    <Uploader onChange={handleUpload} file={file} accept=".csv" />
                    <button
                        disabled={!file}
                        className="btn flex flex-wrap w-full bg-blue-500 text-white border-none hover:bg-blue-400 disabled:text-white"
                        onClick={handleValidateCsv}
                    >
                        Validar
                    </button>
                </div>
            )}
        </div>
    );
}
