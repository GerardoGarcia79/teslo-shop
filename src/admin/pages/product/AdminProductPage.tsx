import { Navigate, useParams } from "react-router";

import { useProduct } from "@/admin/hooks/useProduct";
import { FullScreenLoading } from "@/components/custom/FullScreenLoading";
import { ProductForm } from "./ui/ProductForm";

export const AdminProductPage = () => {
  const { id } = useParams();

  const {
    isLoading,
    data: product,
    isError,
    handleSubmitForm,
  } = useProduct(id || "");

  const title = id === "new" ? "Nuevo producto" : "Editar producto";
  const subtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  if (isError) return <Navigate to="/admin/products" />;

  if (isLoading) return <FullScreenLoading />;

  if (!product) {
    return <Navigate to="/admin/products" />;
  }

  return (
    <ProductForm
      title={title}
      subtitle={subtitle}
      product={product}
      onSubmit={handleSubmitForm}
    />
  );
};
