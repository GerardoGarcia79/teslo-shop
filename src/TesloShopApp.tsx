import { RouterProvider } from "react-router";
import type { PropsWithChildren } from "react";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

import { appRouter } from "./app.router";
import { checkAuthAction } from "./auth/actions/check-auth.action";
import { FullScreenLoading } from "./components/custom/FullScreenLoading";

const queryClient = new QueryClient();

const CustomAuthProvider = ({ children }: PropsWithChildren) => {
  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthAction,
    retry: false,
    refetchInterval: 1000 * 60 * 90, // 90 minutes,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <FullScreenLoading />;

  return children;
};

export const TesloShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <CustomAuthProvider>
        <RouterProvider router={appRouter} />
      </CustomAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
