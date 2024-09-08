import {
  InvoiceDetailAddEdit,
  ProductsGet
} from "@/dashboard/entities/types";
import { create } from "zustand";

type ProductStore = {
  saleProducts: InvoiceDetailAddEdit[];
  add: (product: InvoiceDetailAddEdit) => void;
  addSelect: (product: ProductsGet & { variantAction: string }) => void;
  remove: (id: number) => void;
  productLength: number;
  total: number;
  selectProduct: ProductsGet;
  setSelect: () => void;
};

const selectDefault = {
  name: "",
  categoryId: 0,
  brandId: 0,
  unitId: 0,
  subUnitId: 0,
  stock: 0,
  cost_price: 0,
  quantity_for_unit: 0,
  selling_price_for_1: 0,
  selling_price_for_3: 0,
  selling_price_for_6: 0,
  selling_price_for_12: 0,
  selling_price_for_unit: 0,
  productId: 0,
  sub_stock: 0,
  category: {
    categoryId: 0,
    name: "",
  },
  brand: {
    brandId: 0,
    name: "",
  },
  unit: {
    unitId: 0,
    name: "",
    namePlural: "",
    abrevation: "",
  },
  subUnit: {
    subUnitId: 0,
    name: "",
    namePlural: "",
    abrevation: "",
  },
};

export const useProductStore = create<ProductStore>((set) => ({
  saleProducts: [],
  selectProduct: selectDefault,
  addSelect: (product: ProductsGet) =>
    set(() => {
      return {
        selectProduct: product,
      };
    }),
  setSelect: () =>
    set(() => {
      return {
        selectProduct: selectDefault,
      };
    }),
  add: (product: InvoiceDetailAddEdit) =>
    set((state) => {
      const updatedSaleProducts = [product, ...state.saleProducts];
      const newTotal = state.total + parseFloat(product.subTotal)
      return {
        saleProducts: updatedSaleProducts,
        productLength: updatedSaleProducts.length,
        total: newTotal
      };
    }),

  remove: (id: number) => {
    set((state) => ({
      saleProducts: state.saleProducts.filter(
        (product) => product.productId !== id
      ),
    }));
  },
  productLength: 0,
  total: 0,
}));
