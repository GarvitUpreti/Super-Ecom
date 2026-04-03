import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/apiClient';
import { Product, Category } from '../types';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';

const ORIGINAL_CATEGORY_IDS = [1, 2, 3, 4, 5];

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedCategories = (searchParams.get('categories') || '')
    .split(',')
    .map(Number)
    .filter((n) => !isNaN(n) && n > 0);

  const fetchProducts = useCallback(async (catIds: number[]) => {
    setLoading(true);
    setError(null);
    try {
      let products: Product[];
      if (catIds.length === 0) {
        products = await api.get<Product[]>('/products?offset=0&limit=30');
      } else if (catIds.length === 1) {
        products = await api.get<Product[]>(
          `/products/?categoryId=${catIds[0]}&offset=0&limit=30`
        );
      } else {
        const promises = catIds.map((id) =>
          api.get<Product[]>(`/products/?categoryId=${id}&offset=0&limit=30`)
        );
        const results = await Promise.all(promises);
        const seen = new Set<number>();
        products = [];
        for (const batch of results) {
          for (const p of batch) {
            if (!seen.has(p.id)) {
              seen.add(p.id);
              products.push(p);
            }
          }
        }
      }
      setProducts(products);
    } catch {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    api
      .get<Category[]>('/categories')
      .then((all) => {
        setCategories(all.filter((c) => ORIGINAL_CATEGORY_IDS.includes(c.id)));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('categories'), fetchProducts]);

  const handleCategoryChange = (ids: number[]) => {
    if (ids.length > 0) {
      setSearchParams({ categories: ids.join(',') });
    } else {
      setSearchParams({});
    }
  };

  return (
    <main style={{ minHeight: '80vh', backgroundColor: '#f9fafb' }}>
      <header style={{ padding: '24px 20px 8px', textAlign: 'center' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: 800, color: '#111827' }}>
          Browse Products
        </h1>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
          Find something you love
        </p>
      </header>

      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />
      )}

      {loading && (
        <p style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280', fontSize: '16px' }}>
          Loading products...
        </p>
      )}

      {error && (
        <p style={{ textAlign: 'center', padding: '40px 20px', color: '#dc2626', fontSize: '16px' }}>
          {error}
        </p>
      )}

      {!loading && !error && <ProductGrid products={products} />}
    </main>
  );
}

export default HomePage;
