import { Link } from "react-router";

import { TableRow, TableCell } from "@/components/ui/table";
import type { Product } from "@/interfaces/product.interface";
import { currencyFormatter } from "@/lib/currency-formatter";
import { PencilIcon } from "lucide-react";

interface Props {
  product: Product;
}

export const ProductRow = ({ product }: Props) => {
  return (
    <TableRow>
      <TableCell>
        <img
          src={product.images[0] ?? ""}
          alt="Product"
          className="w-20 h-20 object-cover rounded-md"
        />
      </TableCell>
      <TableCell>
        <Link
          className="hover:text-blue-500 underline"
          to={`/admin/products/${product.id}`}
        >
          {product.title}
        </Link>
      </TableCell>
      <TableCell>{currencyFormatter(product.price)}</TableCell>
      <TableCell>{product.tags.join(", ")}</TableCell>
      <TableCell>{product.stock} stock</TableCell>
      <TableCell>{product.sizes.join(", ")}</TableCell>
      <TableCell className="text-right">
        <Link to={`/admin/products/${product.id}`}>
          <PencilIcon className="w-4 h-4 text-blue-500" />
        </Link>
      </TableCell>
    </TableRow>
  );
};
