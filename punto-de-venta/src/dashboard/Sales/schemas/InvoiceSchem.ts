import { z } from "zod";

export const InvoiceSchem = z.intersection(
  z.object({
    isCustomerRegister: z.boolean(),
  }),

  z.discriminatedUnion("paymentMethodId", [
    z.object({ paymentMethodId: z.literal("") }),
    z.object({
      paymentMethodId: z.literal("Efectivo"),
      registerCustomerId: z.string().min(1).optional(),
      name: z.string().min(1).optional(),
    }),
    z.object({
      paymentMethodId: z.literal("Transferencia Bancaria"),
      registerCustomerId: z.string().min(1).optional(),
      name: z.string().min(1).optional(),
    }),
    z.object({
      paymentMethodId: z.literal("Yape"),
      registerCustomerId: z.string().min(1).optional(),
      name: z.string().min(1).optional(),
    }),
    z.object({
      paymentMethodId: z.literal("Credito"),
      registerCustomerId: z.string().min(1),
    }),
  ])
);

export type SchemaInvoiceForm = z.infer<typeof InvoiceSchem>;

export const defaultValues: SchemaInvoiceForm = {
  paymentMethodId: "",
  isCustomerRegister: false,
};
