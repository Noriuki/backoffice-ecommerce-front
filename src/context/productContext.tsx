'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import apiService from '@/services/api';
import { Product } from '@/types';

interface ProductsContextProps {
    products: Product[];
    loading: boolean;
    productsToUpdate: any[];
    setProductsToUpdate: React.Dispatch<React.SetStateAction<any[]>>;
    fetchProducts: (param: object) => void;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [productsToUpdate, setProductsToUpdate] = useState<any[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const fetchProducts = async (query = {}) => {
        try {
            setLoading(true);
            const response = await apiService.get('/products', { params: query });

            setProducts(response.data);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        } catch (err: unknown) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider value={{ products, loading, fetchProducts, productsToUpdate, setProductsToUpdate }}>
            {children}
        </ProductsContext.Provider>
    );
}

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
