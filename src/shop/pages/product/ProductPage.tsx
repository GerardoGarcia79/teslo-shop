import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { type Product, products } from "@/mocks/products.mock";

interface ProductPageProps {
  product: Product;
  onAddToCart?: (product: Product, size: string, color: string) => void;
}

export const ProductPage = ({ onAddToCart }: ProductPageProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const product = products[0]; // Simulamos obtener el producto

  const canAddToCart = selectedSize && selectedColor;

  const handleAddToCart = () => {
    if (canAddToCart) {
      onAddToCart?.(product, selectedSize, selectedColor);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
            <img
              src={product.image}
              alt={product.name}
              // fill
              // priority
              className="object-contain p-8"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {/* Category Badge */}
            <Badge
              variant="secondary"
              className="mb-3 w-fit bg-neutral-100 text-neutral-600 hover:bg-neutral-100"
            >
              {product.category}
            </Badge>

            {/* Product Name */}
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-4 text-2xl font-medium text-neutral-900">
              ${product.price}
            </p>

            {/* Description */}
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              {product.description}
            </p>

            <Separator className="my-6" />

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-900">
                  Talla
                </span>
                {!selectedSize && (
                  <span className="text-sm text-neutral-500">
                    Selecciona una talla
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "flex h-10 min-w-12 items-center justify-center rounded-md border px-4 text-sm font-medium transition-all",
                      selectedSize === size
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400",
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Color Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-900">
                  Color
                </span>
                {selectedColor ? (
                  <span className="text-sm text-neutral-600">
                    {selectedColor}
                  </span>
                ) : (
                  <span className="text-sm text-neutral-500">
                    Selecciona un color
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium transition-all",
                      selectedColor === color
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400",
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Add to Cart Button */}
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className={cn(
                "w-full gap-2 text-base font-medium transition-all",
                canAddToCart
                  ? "bg-neutral-900 hover:bg-neutral-800"
                  : "cursor-not-allowed bg-neutral-300 text-neutral-500",
              )}
            >
              {isAdded ? (
                <>
                  <Check className="h-5 w-5" />
                  Agregado al carrito
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Agregar al carrito
                </>
              )}
            </Button>

            {!canAddToCart && (
              <p className="mt-3 text-center text-sm text-neutral-500">
                Selecciona una talla y un color para continuar
              </p>
            )}

            {/* Product Details Summary */}
            <div className="mt-8 space-y-4">
              <h3 className="text-sm font-medium text-neutral-900">
                Detalles del producto
              </h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-neutral-400" />
                  Tallas disponibles: {product.sizes.join(", ")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-neutral-400" />
                  Colores disponibles: {product.colors.join(", ")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-neutral-400" />
                  Categoría: {product.category}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
