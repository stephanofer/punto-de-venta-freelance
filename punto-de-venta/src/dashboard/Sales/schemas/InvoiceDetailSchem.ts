import { z } from "zod";

export const InvoiceDetailSchema = 


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

export type SchemaInvoiceDetail = z.infer<typeof InvoiceDetailSchema>;

export const defaultValues: SchemaInvoiceDetail = {
  variant: "",
};
