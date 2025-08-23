import { useQuery } from "@apollo/client/react";

import { GET_PRODUCTS } from "@/app/queries/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

import ProductSkeleton from "./ProductSkeleton";
import ProductCard from "./ProductCard";

export default function ProductList({ products }: { products?: any[] }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Nếu có props products (tức là đã filter) → bỏ qua query mặc định
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    skip: products !== undefined,
  });

  if (products === undefined && loading) return <ProductSkeleton count={8} />;
  if (products === undefined && error) return <p>Lỗi: {error.message}</p>;

  const displayProducts = products !== undefined ? products : data?.products || [];

  if (displayProducts.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Không tìm thấy sản phẩm nào</p>;
  }

  const handleAdd = (product: any) => {
    const { success } = addToCart(product);
    if (success) {
      showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, "success");
    } else {
      showToast(`"${product.name}" đã tồn tại trong giỏ hàng!`, "fail");
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {displayProducts.map((product: any) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAdd}
        />
      ))}
    </div>
  );
}
