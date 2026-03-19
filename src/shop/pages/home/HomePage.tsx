import { Pagination } from "@/components/custom/Pagination";
import { products } from "@/mocks/products.mock";
import { Jumbotron } from "@/shop/components/Jumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useProducts } from "@/shop/hooks/useProducts";

export const HomePage = () => {
  const { data } = useProducts();
  console.log({ data });

  return (
    <>
      <Jumbotron title="Todos los productos" />

      <ProductsGrid products={products} />

      <Pagination totalPages={7} />
    </>
  );
};
