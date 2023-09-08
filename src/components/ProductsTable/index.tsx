'use client';

import { useProducts } from '@/context/productContext';

export default function ProductsTable() {
    const { loading, products } = useProducts();

    return loading ? (
        <div>Loading</div>
    ) : (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Preço de custo</th>
                        <th>Preço de venda</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr>
                            <th>{product.code}</th>
                            <td>{product.name}</td>
                            <td>
                                {Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                    maximumFractionDigits: 2,
                                }).format(product.cost_price)}
                            </td>
                            <td>
                                {Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                    maximumFractionDigits: 2,
                                }).format(product.sales_price)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
