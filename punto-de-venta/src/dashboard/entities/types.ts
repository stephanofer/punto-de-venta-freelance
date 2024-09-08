type Create = {
  variant: "create";
  sub_stock: number;
};

type Edit = {
  variant: "edit";
  productId: number;
  sub_stock: number;
};

export type Product = {
  name: string;
  categoryId: number;
  brandId: number;
  unitId: number;
  subUnitId: number;
  stock: number;
  cost_price: number;
  quantity_for_unit: number;
  selling_price_for_1: number;
  selling_price_for_3: number;
  selling_price_for_6: number;
  selling_price_for_12: number;
  selling_price_for_unit: number;
};

export type Utils = {
  category: Category;
  brand: Brand;
  unit: Unit;
  subUnit: SubUnit;
}


export type ProductsGet = Omit<Product & Edit & Utils, 'variant'>
export type ProductCreateEdit = Product & (Create | Edit)

type InvoiceDetailAdd = {
  variantAction: "add",
  variant: string,
}

type InvoiceDetailEdit = {
  variantAction: "edit",
  variant: string,
}

export type InvoiceDetail = {
  productId: number;
  productName: string;
  subTotal: string;
  amount: {
    value: string,
    label: string,
  }
};

export type InvoiceDetailAddEdit = InvoiceDetail & (InvoiceDetailAdd | InvoiceDetailEdit)



// type Table

// export type TableInvoiceDetail = InvoiceDetail & TableInvoiceDetailAmount


// type InvoiceDetailAdd = {
//   variant = "add"

// }

export type Category = {
  categoryId: number;
  name: string;
};

export type Brand = {
  brandId: number;
  name: string;
};
export type Unit = {
  unitId: number;
  name: string;
  namePlural: string;
  abrevation: string;
};
export type SubUnit = {
  subUnitId: number;
  name: string;
  namePlural: string;
  abrevation: string;
};

// export type Utils = {
//   categories: Category[];
//   brand: Brand[];
//   unit: Unit[];
//   subUnit: SubUnit[];
// };

// export type Option = {
//   value: number;
//   label: string;
// };
