import { Pagination } from "@/components/custom/Pagination";
import { products } from "@/mocks/products.mock";
import { Jumbotron } from "@/shop/components/Jumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";

export const HomePage = () => {
  return (
    <>
      <Jumbotron title="Todos los productos" />

      <ProductsGrid products={products} />

      <Pagination totalPages={7} />
    </>
  );
};
