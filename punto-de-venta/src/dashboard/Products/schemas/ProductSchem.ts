import { z } from "zod";

export const ProductSchema = z.intersection(
  z.object({
    name: z.string().min(1, { message: "Campo Requerido" }),
    categoryId: z.string().min(1, { message: "Campo Requerido" }),
    brandId: z.string().min(1, { message: "Campo Requerido" }),
    unitId: z.string().min(1, { message: "Campo Requerido" }),
    subUnitId: z.string().min(1, { message: "Campo Requerido" }),
    stock: z.string().min(1, { message: "Campo Requerido" }),
    cost_price: z.string().min(1, { message: "Campo Requerido" }),
    quantity_for_unit: z.string().min(1, { message: "Campo Requerido" }),
    selling_price_for_1: z.string().min(1, { message: "Campo Requerido" }),
    selling_price_for_3: z.string().min(1, { message: "Campo Requerido" }),
    selling_price_for_6: z.string().min(1, { message: "Campo Requerido" }),
    selling_price_for_12: z.string().min(1, { message: "Campo Requerido" }),
    selling_price_for_unit: z.string().min(1, { message: "Campo Requerido" }),
  }),

  z.discriminatedUnion("variant", [
    z.object({ variant: z.literal("create") }),
    z.object({
      variant: z.literal("edit"),
      productId: z.string().min(1),
      sub_stock: z.string().min(1),
    }),
  ])
);

export type SchemaProduct = z.infer<typeof ProductSchema>;

export const defaultValues: SchemaProduct = {
  variant: "create",
  name: "",
  categoryId: "",
  brandId: "",
  unitId: "",
  subUnitId: "",
  stock: "",
  cost_price: "",
  quantity_for_unit: "",
  selling_price_for_1: "",
  selling_price_for_3: "",
  selling_price_for_6: "",
  selling_price_for_12: "",
  selling_price_for_unit: "",
};
