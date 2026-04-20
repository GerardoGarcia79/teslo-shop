import { Navigate, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

import { useProduct } from "@/admin/hooks/useProduct";
import { FullScreenLoading } from "@/components/custom/FullScreenLoading";
import { ProductForm } from "./ui/ProductForm";

import type { Product } from "@/interfaces/product.interface";

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, data: product, isError, mutation } = useProduct(id || "");

  const title = id === "new" ? "Nuevo producto" : "Editar producto";
  const subtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  const handleSubmit = async (productLike: Partial<Product>) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success("Producto actualizado correctamente", {
          position: "top-right",
        });
        navigate(`/admin/products/${data.id}`);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Error al actualizar el producto");
      },
    });
  };

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
      onSubmit={handleSubmit}
      isPosting={mutation.isPending}
    />
  );
};
