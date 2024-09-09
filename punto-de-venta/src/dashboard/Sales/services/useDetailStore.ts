import { InvoiceDetailAddEdit, ProductsGet } from "@/dashboard/entities/types";
import { create } from "zustand";

type InvoiceDetailStore = {
  dialogInvoice: boolean;
  setDialogInvoice: () => void;

  dialogInvoiceDetail: boolean;
  setDialogInvoiceDetail: () => void;
  invoiceDetailLenght: number;
  total: number;
  dialogFirst: boolean;
  setDiagloFirst: () => void;
  dialogTwo: boolean;
  setDialogTwo: () => void;

  productSelect: ProductsGet | null;
  setProductSelect: (product: ProductsGet | null) => void;

  productEdited: InvoiceDetailAddEdit | null;
  setProductEdited: (product: InvoiceDetailAddEdit | null) => void;

  productsInvoice: InvoiceDetailAddEdit[];
  setProductsInvoice: (invoiceDetail: InvoiceDetailAddEdit) => void;
  removeProductsInvoice: (invoiceDetail: InvoiceDetailAddEdit) => void;
  updateProductsInvoice: (
    invoiceDetailOld: InvoiceDetailAddEdit,
    invoiceDetail: InvoiceDetailAddEdit
  ) => void;
};

export const useDetailStore = create<InvoiceDetailStore>((set) => ({
  invoiceDetailLenght: 0,
  total: 0,

  dialogInvoiceDetail: false,
  setDialogInvoiceDetail: () => {
    console.log("cambiando");
    return set((state) => ({
      dialogInvoiceDetail: !state.dialogInvoiceDetail,
    }));
  },

  dialogInvoice: false,
  setDialogInvoice: () => {
    return set((state) => ({ dialogInvoice: !state.dialogInvoice }));
  },

  dialogFirst: false,

  setDiagloFirst: () => {
    return set((state) => ({ dialogFirst: !state.dialogFirst }));
  },

  dialogTwo: false,
  setDialogTwo: () => {
    return set((state) => ({ dialogTwo: !state.dialogTwo }));
  },

  productSelect: null,

  setProductSelect: (product: ProductsGet | null) => {
    return set(() => ({
      productSelect: product,
    }));
  },

  productEdited: null,

  setProductEdited: (product: InvoiceDetailAddEdit | null) => {
    return set(() => ({
      productEdited: product,
    }));
  },

  productsInvoice: [],

  setProductsInvoice: (invoiceDetail: InvoiceDetailAddEdit) =>
    set((state) => {
      const updatedSaleProducts = [invoiceDetail, ...state.productsInvoice];
      const newTotal = state.total + invoiceDetail.subTotal;
      return {
        productsInvoice: updatedSaleProducts,
        invoiceDetailLenght: updatedSaleProducts.length,
        total: newTotal,
      };
    }),
  removeProductsInvoice: (invoiceDetail: InvoiceDetailAddEdit) => {
    set((state) => {
      const removeInvoiceProducts = state.productsInvoice.filter(
        (product) =>
          product.product.productId !== invoiceDetail.product.productId
      );
      const newTotal = state.total - invoiceDetail.subTotal;
      return {
        productsInvoice: removeInvoiceProducts,
        productLength: removeInvoiceProducts.length,
        total: newTotal,
      };
    });
  },

  updateProductsInvoice: (invoiceDetailOld, newInvoiceDetail) => {
    set((state) => {
      const updateInvoiceProduct = state.productsInvoice.map((product) =>
        product.product.productId === invoiceDetailOld.product.productId
          ? newInvoiceDetail
          : product
      );
      const newTotal =
        state.total - invoiceDetailOld.subTotal + newInvoiceDetail.subTotal;

      return {
        productsInvoice: updateInvoiceProduct,
        productLength: updateInvoiceProduct.length,
        total: newTotal,
      };
    });
  },
}));
