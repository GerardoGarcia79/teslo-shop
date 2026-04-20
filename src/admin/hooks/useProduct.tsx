import { useMutation, useQuery } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions/get-product-by-id.action";
import { createUpdateProductAction } from "../actions/create-update-product.action";

export const useProduct = (id: string) => {
  const data = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, //5 minutes
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product) => {
      console.log("Todo salió bien", product);
    },
  });

  return {
    ...data,
    mutation,
  };
};
