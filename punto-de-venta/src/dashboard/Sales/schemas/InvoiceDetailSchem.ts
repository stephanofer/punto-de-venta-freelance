import { z } from "zod";

export const InvoiceDetailSchema = z.intersection(
  z.object({
    productId: z.string().min(1, { message: "Required" }),
    variant: z.string().min(1, { message: "Required" }),
    productName: z.string().min(1, { message: "Required" }),
  }),

  z.discriminatedUnion("variant", [
    z.object({ variant: z.literal("") }),
    z.object({ variant: z.literal("1"), amountSubUnit: z.string().min(1) }),
    z.object({ variant: z.literal("2"), amountUnit: z.string().min(1) }),
    z.object({
      variant: z.literal("3"),
      amountUnit: z.string().min(1),
      amountSubUnit: z.string().min(1),
    }),
  ])
);

export type SchemaInvoiceDetail = z.infer<typeof InvoiceDetailSchema>;

export const defaultValues: SchemaInvoiceDetail = {
  // variantAction: "add",
  variant: "",
  productId: "",
  productName: "",
};
