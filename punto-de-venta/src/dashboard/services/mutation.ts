import { apiClient } from "@/services/apiClient";
import { ProductsGet } from "@/dashboard/entities/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SchemaProduct } from "../Products/schemas/ProductSchem";
import { omit } from "lodash";
import { mapData } from "./mapData";
import { SchemaCashRegister } from "./schems/CashRegisterSchem";

const createProduct = async (product: SchemaProduct) => {
  const response = await apiClient.post<ProductsGet>(
    "products",
    omit(mapData(product), "variant")
  );
  const data = response.data;
  return data;
};

const updateProduct = async (product: SchemaProduct) => {
  if (product.variant === "edit") {
    const response = await apiClient.patch<ProductsGet>(
      `products/${product.productId}`,
      omit(mapData(product), "variant")
    );
    const data = response.data;
    return data;
  }
};

const deleteProduct = async (productId: number) => {
  const { data } = await apiClient.delete<ProductsGet>(`products/${productId}`);
  return data;
};

const createCashRegister = async (cashRegister: SchemaCashRegister) => {
  const newCashRegister = {
    cashRegisterId: parseInt(cashRegister.cashRegisterId),
    openingDate: new Date(cashRegister.openingDate),
    initialAmount: parseFloat(cashRegister.initialAmount),
    statusId: parseInt(cashRegister.statusId),
  };

  await apiClient.post(`cash-register-session`, newCashRegister);
};

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: (savedProduct) => {
      queryClient.setQueryData<ProductsGet[]>(["products"], (products = []) => [
        savedProduct,
        ...products,
      ]);
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (savedProduct) => {
      if (savedProduct) {
        queryClient.setQueryData<ProductsGet[]>(
          ["products"],
          (products = []) => {
            const updatedProducts = products.map((product) =>
              product.productId === savedProduct.productId
                ? savedProduct
                : product
            );
            return updatedProducts;
          }
        );
      }
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (savedProduct) => {
      queryClient.setQueryData<ProductsGet[]>(["products"], (products = []) => {
        const updatedProducts = products.filter(
          (product) => product.productId !== savedProduct.productId
        );
        return updatedProducts;
      });
    },
  });
}

export function useCreateCashRegister() {
  return useMutation({
    mutationFn: createCashRegister,
  });
}
