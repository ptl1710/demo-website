# 🛒 Demo Website - Next.js + Apollo Client + React Hook Form + Jest

Dự án demo website bán hàng đơn giản, được xây dựng bằng **Next.js (App Router)** với các chức năng:

- Hiển thị danh sách sản phẩm từ **GraphQL API**.
- Giỏ hàng sử dụng **React Context** (thêm sản phẩm, tính tổng số lượng và tổng giá trị).
- Thông báo (toast) khi thêm sản phẩm thành công hoặc trùng lặp.
- Bộ lọc sản phẩm theo **category** và **khoảng giá**.
- Đăng ký/Đăng nhập bằng **số điện thoại + OTP SMS**.

---

## 🚀 Công nghệ sử dụng

- [Next.js 13+ (App Router)](https://nextjs.org/docs/app)  
- [Apollo Client](https://www.apollographql.com/docs/react/)  
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)  
- [React Hook Form](https://react-hook-form.com/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)  

---

## 📂 Cấu trúc thư mục

src/
├── app/
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Trang chính (hiển thị sản phẩm + filter)
│ ├── queries/ # GraphQL queries
│ │ └── products.ts
│ ├── context/
│ │ ├── CartContext.tsx # Context giỏ hàng
│ │ └── ToastContext.tsx# Context hiển thị thông báo
│ ├── component/
│ │ ├── Navbar.tsx
│ │ ├── ProductList.tsx
│ │ ├── ProductFilter.tsx
│ │ ├── AuthForm.tsx # Form đăng nhập/đăng ký OTP
│ │ └── ...
│ └── lib/
│ └── apolloClient.ts # Cấu hình Apollo Client
tsconfig.json # TypeScript config
---

## ⚙️ Cài đặt

### 1. Clone repo
```bash
git clone https://github.com/ptl1710/demo-website.git
cd demo-website
npm install
npm run dev
✨ Tính năng chính
🛍️ Sản phẩm

Lấy dữ liệu sản phẩm từ GraphQL.

Loading state với animation skeleton.

Lọc sản phẩm theo loại và khoảng giá.

Reset filter về mặc định.

🛒 Giỏ hàng

Thêm sản phẩm vào giỏ.

Nếu sản phẩm đã có → hiển thị thông báo lỗi.

🔔 Toast thông báo

Hiển thị khi thêm sản phẩm thành công / thất bại.

Tự động biến mất sau 3 giây.

Có type: success | fail.

📱 Đăng nhập bằng số điện thoại (OTP SMS)

Nhập số điện thoại → gửi OTP.

Nhập OTP để xác minh → đăng nhập thành công.

Sau khi đăng nhập thành công → đóng modal login.

📷 Demo

Trang chủ: Danh sách sản phẩm + Filter

Modal đăng nhập bằng SMS

📜 License

MIT License © 2025