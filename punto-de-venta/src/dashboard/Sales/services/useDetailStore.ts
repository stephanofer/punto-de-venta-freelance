import { InvoiceDetailAddEdit, ProductsGet } from "@/dashboard/entities/types";
import { create } from "zustand";

type InvoiceDetailStore = {
  invoiceDetailLenght: number,
  dialogFirst: boolean;
  setDiagloFirst: () => void;
  dialogTwo: boolean;
  setDialogTwo: () => void;

  productSelect: ProductsGet | null;
  setProductSelect: (product: ProductsGet | null) => void;

  productEdited: InvoiceDetailAddEdit | null;
  setProductEdited: (product: InvoiceDetailAddEdit | null) => void;


  productsInvoice: InvoiceDetailAddEdit[],
  setProductsInvoice: (invoiceDetail: InvoiceDetailAddEdit) => void;
  removeProductsInvoice: (id: number) => void;
  updateProductsInvoice: (id: number, invoiceDetail: InvoiceDetailAddEdit) => void;

};

export const useDetailStore = create<InvoiceDetailStore>((set) => ({

  invoiceDetailLenght: 0,
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
      // const newTotal = state.total + parseFloat(product.subTotal)
      return {
        productsInvoice: updatedSaleProducts,
        invoiceDetailLenght: updatedSaleProducts.length,
        // total: newTotal
      };
    }),
    removeProductsInvoice: (id: number) => {
      set((state) => {
        const removeInvoiceProducts = state.productsInvoice.filter(
          (product) => product.product.productId !== id
        )
        return {
          productsInvoice: removeInvoiceProducts,
          productLength: removeInvoiceProducts.length,
        }
      });
    },

    updateProductsInvoice: (id, newInvoiceDetail) => {
      set((state) => ({
        productsInvoice: state.productsInvoice.map(
          (product) => product.product.productId === id ? newInvoiceDetail : product
        ),
      }));
    },

}));
