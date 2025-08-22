'use client';
import { useCart } from "./context/CartContext";
import { useToast } from "./context/ToastContext";

export default function Home() {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const product = {
    id: "1",
    name: "Sữa bột cho bé",
    price: 250000,
  };

  const handleAdd = () => {
    addToCart(product);
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()} đ</p>
      <button onClick={handleAdd}>Thêm vào giỏ</button>
    </div>
  );
}
