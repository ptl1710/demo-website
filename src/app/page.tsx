'use client';
import { useState } from "react";
import ProductList from "./component/ProductList";
import ProductFilter from "./component/ProductFilter";
import styles from './page.module.css'
export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState<any[] | undefined>(undefined);

  return (
    <main className={styles.main}>
      <div className={styles.breadcrumb}>
        <p>Trang chủ</p>
        <span>
          <svg width="20" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 13L7.5 7L1.5 0.999999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            </path>
          </svg>
        </span>
        <p>Sản phẩm</p>
      </div>
      <ProductFilter onFilter={setFilteredProducts} />
      <ProductList products={filteredProducts} />
    </main>
  );
}
