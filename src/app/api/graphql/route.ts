import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const typeDefs = `#graphql
  type Category {
    id: ID!
    name: String!
    slug: String!
    image: String
  }

  type Product {
    id: ID!
    name: String!
    price: Int!
    image: String
    category: Category!
  }

  type Query {
    products: [Product!]!
    categories: [Category!]!
    productsByFilter(categoryId: ID, minPrice: Int, maxPrice: Int): [Product!]!
  }
`;
const categories = [
  { id: "1", name: "Mẹ bầu và sau sinh", slug: "sua-dinh-duong", image: "https://cdn-v2.kidsplaza.vn//media/catalog/category/Icon_B_ng_b_u_2.png" },
  { id: "2", name: "Sữa cho bé", slug: "do-an-dam", image: "https://cdn-v2.kidsplaza.vn//media/catalog/category/Icon_S_a_cho_b__1_1.png" },
  { id: "3", name: "Bé ăn dặm", slug: "bim-ta", image: "https://cdn-v2.kidsplaza.vn//media/catalog/category/Icon_B_n_d_m_1.png" },
  { id: "4", name: "Bỉm tã và vệ sinh", slug: "do-dung-cho-be", image: "https://cdn-v2.kidsplaza.vn//media/catalog/category/Icon_B_m_t_V_sinh_1.png" },
  { id: "5", name: "Bình sữa và phụ kiện", slug: "sua-dinh-duong", image: "https://cdn-v2.kidsplaza.vn//media/catalog/category/Icon_B_nh-s_a_1.png" },
  { id: "6", name: "Đồ sơ sinh", slug: "do-an-dam", image: "https://cdn-v2.kidsplaza.vn//media/catalog/category/Icon__s_sinh_1.png" },
  { id: "7", name: "Thời trang và phụ kiện", slug: "bim-ta", image: "https://cdn-v2.kidsplaza.vn//media/catalog/category/Icon_Gi_y_1.png" },
  { id: "8", name: "Vitamin và sức khỏe", slug: "do-dung-cho-be", image: "https://cdn-v2.kidsplaza.vn//media/catalog/category/Icon_Vitamin_1.png" },
  { id: "9", name: "Đồ dùng mẹ và bé", slug: "do-dung-cho-be", image: "https://cdn-v2.kidsplaza.vn//media/catalog/category/Icon_Th_a_d_a_1.png" },
];

const products = [
  {
    id: "1",
    name: "Sắt sinh học Ferrolip 20x1.8g",
    price: 360000,
    image: "https://cdn.kidsplaza.vn/_next/image?url=https%3A%2F%2Fcdn-v2.kidsplaza.vn%2Fmedia%2Fcatalog%2Fproduct%2Fs%2Fa%2Fsat-sinh-hoc-ferrolip-20-1-8g-1.jpg&w=3840&q=100&fm=webp",
    category: categories[0]
  },
  {
    id: "2",
    name: "Vitamin mẹ bầu Pregnacare Orginal - Hộp 30 viên",
    price: 368000,
    image: "https://cdn.kidsplaza.vn/_next/image?url=https%3A%2F%2Fcdn-v2.kidsplaza.vn%2Fmedia%2Fcatalog%2Fproduct%2Fv%2Fi%2Fvitamin-me-bau-pregnacare-orginal-hop-30v-2.jpg&w=828&q=100&fm=webp",
    category: categories[0]
  },
  {
    id: "3",
    name: "Combo 3 hộp sữa PediaSure BA 800g ít ngọt cho bé 1-10 tuổi (hương vani)",
    price: 1922000,
    image: "https://cdn.kidsplaza.vn/_next/image?url=https%3A%2F%2Fcdn-v2.kidsplaza.vn%2Fmedia%2Fcatalog%2Fproduct%2Fc%2Fo%2Fcombo-3-hop-sua-pediasure-ba-800g-it-ngot-cho-be-1-10-tuoi-huong-vani.png&w=828&q=100&fm=webp",
    category: categories[1]
  },
  {
    id: "4",
    name: "Combo 2 hộp sữa PediaSure BA 1.6kg ít ngọt cho bé 1-10 tuổi (vị vani)",
    price: 2198000,
    image: "https://cdn.kidsplaza.vn/_next/image?url=https%3A%2F%2Fcdn-v2.kidsplaza.vn%2Fmedia%2Fcatalog%2Fproduct%2Fc%2Fo%2Fcombo-2-hop-sua-pediasure-ba-1-6kg-it-ngot-cho-be-1-10-tuoi-vi-vani.png&w=828&q=100&fm=webp",
    category: categories[1]
  },
  {
    id: "5",
    name: "Phô mai tươi Hoff 4x55g 1Y+",
    price: 56000,
    image: "https://cdn.kidsplaza.vn/_next/image?url=https%3A%2F%2Fcdn-v2.kidsplaza.vn%2Fmedia%2Fcatalog%2Fproduct%2Fp%2Fh%2Fpho-mai-tuoi-hoff-4x55g-1y-1.jpg&w=828&q=100&fm=webp",
    category: categories[2]
  },
  {
    id: "6",
    name: "Bánh gạo hữu cơ Little Spoon vị nguyên bản 30g",
    price: 50150,
    image: "https://cdn.kidsplaza.vn/_next/image?url=https%3A%2F%2Fcdn-v2.kidsplaza.vn%2Fmedia%2Fcatalog%2Fproduct%2Fb%2Fa%2Fbanh-gao-huu-co-little-spoon-vi-nguyen-ban-30g-1.jpg&w=828&q=100&fm=webp",
    category: categories[2]
  },
  {
    id: "7",
    name: "Giấy vệ sinh cao cấp Silkwell 4 lớp",
    price: 126000,
    image: "https://cdn.kidsplaza.vn/_next/image?url=https%3A%2F%2Fcdn-v2.kidsplaza.vn%2Fmedia%2Fcatalog%2Fproduct%2Fg%2Fi%2Fgiay-ve-sinh-cao-cap-silkwell-4-lop-1.jpg&w=828&q=100&fm=webp",
    category: categories[3]
  },
  {
    id: "8",
    name: "Dụng cụ hút mũi kéo tay thế hệ mới Nasal AC",
    price: 118000,
    image: "https://cdn.kidsplaza.vn/_next/image?url=https%3A%2F%2Fcdn-v2.kidsplaza.vn%2Fmedia%2Fcatalog%2Fproduct%2Fd%2Fu%2Fdung-cu-hut-mui-keo-tay-the-he-moi-nasal-ac-1.jpg&w=828&q=100&fm=webp",
    category: categories[3]
  },
  {
    id: "9",
    name: "Set 2 núm ty Moyuum Mov.aa size 1/2/3/4",
    price: 259600,
    image: "https://cdn.kidsplaza.vn/_next/image?url=https%3A%2F%2Fcdn-v2.kidsplaza.vn%2Fmedia%2Fcatalog%2Fproduct%2Fs%2Fe%2Fset-2-num-ty-moyuum-mov-aa-3.jpg&w=828&q=100&fm=webp",
    category: categories[4]
  },
  {
    id: "10",
    name: "Bộ quần áo dài tay cài giữa Kiza in voi BA25H (Trắng)",
    price: 99000,
    image: "https://cdn.kidsplaza.vn/_next/image?url=https%3A%2F%2Fcdn-v2.kidsplaza.vn%2Fmedia%2Fcatalog%2Fproduct%2Fb%2Fo%2Fbo-quan-ao-dai-tay-cai-giua-kiza-in-voi-ba25h-trang_1.jpg&w=828&q=100&fm=webp",
    category: categories[5]
  },
];

const resolvers = {
  Query: {
    products: () => products,
    categories: () => categories,
    productsByFilter: (
      _: any,
      { categoryId, minPrice, maxPrice }: { categoryId?: string; minPrice?: number; maxPrice?: number }
    ) => {
      return products.filter((p) => {
        const matchCategory = categoryId ? p.category.id === categoryId : true;
        const matchMin = minPrice ? p.price >= minPrice : true;
        const matchMax = maxPrice ? p.price <= maxPrice : true;
        return matchCategory && matchMin && matchMax;
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
