import { Pagination } from "@/components/custom/Pagination";
import { products } from "@/mocks/products.mock";
import { Jumbotron } from "@/shop/components/Jumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useParams } from "react-router";

export const GenderPage = () => {
  const { gender } = useParams();

  const genderLabel =
    gender === "men" ? "Hombres" : gender === "women" ? "Mujeres" : "Niños";
  return (
    <>
      <Jumbotron title={`Productos para ${genderLabel}`} />

      <ProductsGrid products={products} />

      <Pagination totalPages={7} />
    </>
  );
};
