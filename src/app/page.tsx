'use client';
import { useState } from "react";
import ProductList from "./component/ProductList";
import ProductFilter from "./component/ProductFilter";

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState<any[] | undefined>(undefined);

  return (
    <main>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        Danh sách sản phẩm
      </h1>
      <ProductFilter onFilter={setFilteredProducts} />
      <ProductList products={filteredProducts} />
    </main>
  );
}
