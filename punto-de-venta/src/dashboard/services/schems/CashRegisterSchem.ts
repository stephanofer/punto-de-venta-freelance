import { z } from "zod";

export const CashRegisterSchem = z.object({
  cashRegisterId: z.string().min(1, { message: "Campo Requerido" }),
  openingDate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  initialAmount: z.string().min(1, { message: "Campo Requerido" }),
  statusId: z.string().min(1, { message: "Campo Requerido" }),
});

export type SchemaCashRegister = z.infer<typeof CashRegisterSchem>;

export const defaultValues: SchemaCashRegister = {
  cashRegisterId: "1",
  openingDate: new Date(),
  initialAmount: "",
  statusId: "1",
};
