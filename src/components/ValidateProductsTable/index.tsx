'use client';

import { useRef, useState } from 'react';
import ProductErrorsModal from './ProductErrorsModal';

export default function ValidateProductsTable({
    productsToUpdate = [],
    valid,
    handleUpdatePrices,
}: {
    productsToUpdate: any[];
    valid: boolean;
    handleUpdatePrices: () => void;
}) {
    const [selectedProduct, setSelectedProduct] = useState<{ [key: string]: any } | null>(null);
    const modalRef = useRef(null);

    const handleSelectProduct = (product: { [key: string]: any }) => {
        setSelectedProduct(product);
        (modalRef.current as any).showModal();
    };

    return (
        <div className="flex flex-wrap m-auto">
            <div className="flex flex-wrap w-full justify-end space-x-4 my-2">
                <button
                    onClick={() => location.reload()}
                    className="btn uppercase bg-white text-blue-500 border border-blue-500 px-20 hover:bg-white hover:border-blue-500"
                >
                    Voltar
                </button>
                <button
                    disabled={valid === false}
                    onClick={handleUpdatePrices}
                    className="btn uppercase bg-blue-500 text-white border-none px-20 hover:bg-blue-400 disabled:text-white"
                >
                    Atualizar
                </button>
            </div>

            <div className="overflow-x-auto w-full border border-gray-500 rounded-md rounded-md">
                <table className="table">
                    <thead>
                        <tr className="text-black uppercase text-center">
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Preço de venda</th>
                            <th>Preço novo</th>
                            <th>Erros</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsToUpdate?.map((product) => (
                            <tr className="text-black uppercase text-center my-2 border-none">
                                <th>{product.code}</th>
                                <td>{product.name}</td>
                                <td>
                                    {Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                        maximumFractionDigits: 2,
                                    }).format(product.sales_price)}
                                </td>
                                <td>
                                    {Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                        maximumFractionDigits: 2,
                                    }).format(product.new_price)}
                                </td>
                                <td>
                                    {product.errors.length > 0 && (
                                        <button
                                            className="w-8 h-8 mx-auto"
                                            onClick={() => handleSelectProduct(product)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-full h-full text-orange-500"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ProductErrorsModal modalRef={modalRef} selectedProduct={selectedProduct} />
        </div>
    );
}
