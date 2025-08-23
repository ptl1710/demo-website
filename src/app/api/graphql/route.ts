import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const typeDefs = `#graphql
  type Category {
    id: ID!
    name: String!
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
  { id: "1", name: "Sữa & Dinh dưỡng" },
  { id: "2", name: "Đồ ăn dặm" },
  { id: "3", name: "Bỉm & Tã" },
  { id: "4", name: "Đồ dùng cho bé" },
];

const products = [
  { id: "1", name: "Sữa bột Vinamilk Dielac Alpha", price: 250000, image: "https://d8um25gjecm9v.cloudfront.net/cms/SBTE_Dielac_Alpha_S2_400_dd3c226764_eaad54d77a.png", category: categories[0] },
  { id: "2", name: "Sữa bột Abbott Grow", price: 320000, image: "https://cdn-v2.kidsplaza.vn/media/catalog/product/s/u/sua-abbott-grow-1-huong-vani-850g-1.jpg", category: categories[0] },
  { id: "3", name: "Bánh ăn dặm Gerber vị táo", price: 85000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_I_Ckdi4cGozs6FTy4Si6v_ZmgW4k5UfBg&s", category: categories[1] },
  { id: "4", name: "Cháo ăn liền Wakodo", price: 60000, image: "https://product.hstatic.net/200000112547/product/4987244600707_c08aa423b1ba4634ac7548a0f4abaaf2_master.jpg", category: categories[1] },
  { id: "5", name: "Bỉm Merries size M 62 miếng", price: 370000, image: "https://product.hstatic.net/200000833669/product/ta_dan_size_s_bb973f4e74b340c3b9b18cc9d297deb8.jpg", category: categories[2] },
  { id: "6", name: "Bỉm Huggies size L 56 miếng", price: 340000, image: "https://concung.com/2022/03/29873-85204-large_mobile/bim-ta-quan-huggies-dry-pants-goi-cuc-dai-xxl-15-25kg-56-mieng.jpg", category: categories[2] },
  { id: "7", name: "Bình sữa Comotomo 250ml", price: 280000, image: "https://comotomo.com.vn/image/cache/catalog/product/CT00013/binh-250-xanh-CT00013-01-900x900.jpg", category: categories[3] },
  { id: "8", name: "Muỗng tập ăn cho bé", price: 35000, image: "https://cdn.tgdd.vn//News/1506681//kinh-nghiem-chon-muong-an-dam-cho-be-dung-cach-5-845x550.jpg", category: categories[3] },
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
