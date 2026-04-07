import { Link } from "react-router";

import { AdminTitle } from "@/admin/components/AdminTitle";
import { Pagination } from "@/components/custom/Pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";

import { PlusIcon } from "lucide-react";
import { useProducts } from "@/shop/hooks/useProducts";
import { ProductRow } from "@/admin/components/ProductRow";
import { FullScreenLoading } from "@/components/custom/FullScreenLoading";

export const AdminProductsPage = () => {
  const { data, isLoading } = useProducts();

  if (isLoading) return <FullScreenLoading />;

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subtitle="Aquí puedes ver y administrar tus productos."
        />
        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon />
              Nuevo producto
            </Button>
          </Link>
        </div>
      </div>
      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data!.products.map((product) => (
            <ProductRow product={product} key={product.id} />
          ))}
        </TableBody>
      </Table>
      <Pagination totalPages={data?.pages || 0} />
    </>
  );
};
