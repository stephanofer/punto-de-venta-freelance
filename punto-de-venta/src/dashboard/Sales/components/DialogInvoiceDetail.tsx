import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePaymentMethods } from "@/dashboard/services/queries";
import { useForm, useWatch } from "react-hook-form";
import { useDetailStore } from "../services/useDetailStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  defaultValues,
  InvoiceSchem,
  SchemaInvoiceForm,
} from "../schemas/InvoiceSchem";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";
import { DevTool } from "@hookform/devtools";

export function DialogInvoiceDetail() {
  const { data: paymentMethods } = usePaymentMethods();

  const methods = useForm<SchemaInvoiceForm>({
    mode: "all",
    resolver: zodResolver(InvoiceSchem),
    defaultValues,
  });

  // const reset = methods.reset;

  // useEffect(() => {
  //   reset({
  //     registerCustomerId: "",
  //     name: "",
  //   });
  // }, [reset]);

  const setDialogInvoiceDetail = useDetailStore(
    (state) => state.setDialogInvoiceDetail
  );
  const dialogInvoiceDetail = useDetailStore(
    (state) => state.dialogInvoiceDetail
  );

  const isCustomerRegistered = useWatch({
    control: methods.control,
    name: "customer.isRegistered",
  });

  const paymentMethodWatch = useWatch({
    control: methods.control,
    name: "paymentMethodId",
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Dialog open={dialogInvoiceDetail} onOpenChange={setDialogInvoiceDetail}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generar una Venta</DialogTitle>
          <DialogDescription>Completa todos los campos</DialogDescription>
        </DialogHeader>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <DevTool control={methods.control}/>
            <FormField
              control={methods.control}
              name="paymentMethodId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Pago</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo de pago" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {paymentMethods &&
                          paymentMethods.map((payment) => (
                            <SelectItem
                              key={payment.paymentMethodId}
                              value={payment.name}
                            >
                              {payment.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {paymentMethodWatch !== "Credito" ? (
              isCustomerRegistered ? (
                <>
                  <FormField
                    control={methods.control}
                    name="customer.registeredCustomerId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cliente Registrado</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Elegir Cliente registrado"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <FormField
                  control={methods.control}
                  name="customer.customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del Cliente</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre del cliente..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )
            ) : (
              <FormField
                control={methods.control}
                name="customer.registeredCustomerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente Registrado</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Elegir Cliente registrado"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {paymentMethodWatch !== "Credito" && (
              <FormField
                control={methods.control}
                name="customer.isRegistered"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>¿Cliente Registrado?</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="submit">Guardar cambios</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
