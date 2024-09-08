import { apiClient } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import {
  Brand,
  Category,
  ProductsGet,
  SubUnit,
  Unit,
  // Utils,
} from "@/dashboard/entities/types";
import { SchemaProduct } from "../Products/schemas/ProductSchem";

// const data: Utils = {
//   categories: categoriesResponse.data,
//   brand: brandResponse.data,
//   unit: unitResponse.data,
//   subUnit: subUnitResponse.data,
// };

const queryCategories = async () => {
  const response = await apiClient.get<Category[]>("/category");
  return response.data;
};

const queryBrands = async (): Promise<Brand[]> => {
  const brands = await apiClient.get<Brand[]>("/brand");
  const response = brands.data;
  return response;
};

const queryUnits = async (): Promise<Unit[]> => {
  const units = await apiClient.get<Unit[]>("/unit");
  const response = units.data;
  return response;
};

const querySubUnits = async (): Promise<SubUnit[]> => {
  const subUnit = await apiClient.get<SubUnit[]>("/sub-unit");
  const response = subUnit.data;
  return response;
};

const queryProducts = async (): Promise<ProductsGet[]> => {
  const response = await apiClient.get<ProductsGet[]>("/products");
  return response.data;
};

const validateCashRegister = async () => {
  const response = await apiClient.get<boolean>("/cash-register-session/validate");
  return response.data;
};


const getNextInvoiceNumber = async () => {
  const response = await apiClient.get("/invoice/next-invoice-number");
  return response.data;
};

const queryProduct = async (id: string): Promise<SchemaProduct> => {
  const { data } = await apiClient.get<ProductsGet>(`/products/${id}`);
  return {
    variant: "edit",
    productId: data.productId.toString(),
    name: data.name,
    categoryId: data.categoryId.toString(),
    brandId: data.brandId.toString(),
    unitId: data.unitId.toString(),
    subUnitId: data.subUnitId.toString(),
    stock: data.stock.toString(),
    sub_stock: data.sub_stock.toString(),
    cost_price: data.cost_price.toString(),
    quantity_for_unit: data.quantity_for_unit.toString(),
    selling_price_for_1: data.selling_price_for_1.toString(),
    selling_price_for_3: data.selling_price_for_3.toString(),
    selling_price_for_6: data.selling_price_for_6.toString(),
    selling_price_for_12: data.selling_price_for_12.toString(),
    selling_price_for_unit: data.selling_price_for_unit.toString(),
  };
};



export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: queryCategories,
  });
}

export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: queryBrands,
  });
}

export function useUnit() {
  return useQuery({
    queryKey: ["units"],
    queryFn: queryUnits,
  });
}

export function useSubUnit() {
  return useQuery({
    queryKey: ["subUnits"],
    queryFn: querySubUnits,
  });
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: queryProducts,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", { id }],
    queryFn: () => queryProduct(id),
  });
}


export function useValidateCashRegister() {
  return useQuery({
    queryKey: ["validateCashRegister"],
    queryFn: validateCashRegister,
  });
}

export function useGetNextInvoiceNumber() {
  return useQuery({
    queryKey: ["getNextInvoiceNumber"],
    queryFn: getNextInvoiceNumber,
  });
}