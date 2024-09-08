import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, useEffect } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import {
  InvoiceDetailSchema,
  SchemaInvoiceDetail,
  defaultValues,
} from "../schemas/InvoiceDetailSchem";
import { useProductStore } from "../services/useProductStore";
import { calcularSubtotal, calcularTotalSubunidades } from "@/dashboard/services/calculate";

type Props = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
};

export function AddProductForm({ open, setOpen }: Props) {
  const methods = useForm<SchemaInvoiceDetail>({
    mode: "all",
    resolver: zodResolver(InvoiceDetailSchema),
    defaultValues,
  });

  const reset = methods.reset;
  const selectProduct = useProductStore((state) => state.selectProduct);
  const add = useProductStore((state) => state.add);
  console.log(selectProduct);

  useEffect(() => {
    if (selectProduct) {
      reset({
        productId: `${selectProduct.productId}`,
        productName: selectProduct.name,
      });
    }
  }, [selectProduct, reset]);

  const setSelectProduct = useProductStore((state) => state.setSelect);

  const variant = useWatch({ control: methods.control, name: "variant" });
  const amountSubUnit = useWatch({
    control: methods.control,
    name: "amountSubUnit",
  });
  const amountUnit = useWatch({ control: methods.control, name: "amountUnit" });

  const formattedAmount = (unit: string, subUnit: string) => {
    const unitName =
      unit === "1" ? selectProduct.unit.name : selectProduct.unit.namePlural;
    const subUnitName =
      subUnit === "1"
        ? selectProduct.subUnit.name
        : selectProduct.subUnit.namePlural;

    if (unit && subUnit && variant === "3") {
      return `${unit} ${unitName} y ${subUnit} ${subUnitName}`;
    } else if (unit && variant === "2") {
      return `${unit} ${unitName}`;
    } else if (subUnit && variant === "1") {
      return `${subUnit} ${subUnitName}`;
    }

    return "Complete las cantidades...";
  };

  const formattedSubTotal = () => {
    let evaluatedUnit = 0;
    let evaluatedSubUnit = 0;

    if (variant === "3") {
      evaluatedUnit = parseInt(amountUnit);
      evaluatedSubUnit = parseInt(amountSubUnit);
    }

    if (variant === "2") {
      evaluatedUnit = parseInt(amountUnit);
      evaluatedSubUnit = 0;
    }

    if (variant === "1") {
      evaluatedUnit = 0;
      evaluatedSubUnit = parseInt(amountSubUnit);
    }

    const subTotal = calcularSubtotal(
      evaluatedUnit,
      evaluatedSubUnit,
      selectProduct
    );



    return subTotal;
  };

  const moneyFormatted = (number: number) => {

    const formatted = new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);

    return formatted

  }

  const formattedAmountValue = () => {
    let evaluatedUnit = 0;
    let evaluatedSubUnit = 0;

    if (variant === "3") {
      evaluatedUnit = parseInt(amountUnit);
      evaluatedSubUnit = parseInt(amountSubUnit);
    }

    if (variant === "2") {
      evaluatedUnit = parseInt(amountUnit);
      evaluatedSubUnit = 0;
    }

    if (variant === "1") {
      evaluatedUnit = 0;
      evaluatedSubUnit = parseInt(amountSubUnit);
    }

    const subTotal = calcularTotalSubunidades(
      evaluatedUnit,
      evaluatedSubUnit,
      selectProduct
    );

    return `${subTotal}`;
  };

  const handleOpen = () => {
    setOpen((open) => !open);
    setSelectProduct;
  }; 

  const onSubmit: SubmitHandler<SchemaInvoiceDetail> = (data) => {
    // console.log(data);

    add({
      ...data,
      amount: {
        label: formattedAmount(amountUnit, amountSubUnit),
        value: formattedAmountValue()
      },
      productId: parseInt(data.productId),
      subTotal: `${formattedSubTotal()}`,
      variantAction: "edit",
      variant: variant,
    })
    
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Agregar un producto a la venta</DialogTitle>
          <DialogDescription>
            Complete los detalles para agregar un nuevo producto. Recuerda
            revisar el resumen antes.
          </DialogDescription>
        </DialogHeader>
        <DevTool control={methods.control} />
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex gap-6">
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <FormField
                    control={methods.control}
                    name="variant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Metodo</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona el tipo de cantidad..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">
                              {`${selectProduct.subUnit.namePlural}`}
                            </SelectItem>
                            <SelectItem value="2">
                              {`${selectProduct.unit.namePlural}`}
                            </SelectItem>
                            <SelectItem value="3">
                              {`${selectProduct.unit.namePlural} + ${selectProduct.subUnit.namePlural}`}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  {/* //Only Sub Unit */}
                  {variant === "1" && (
                    <div className="space-y-2">
                      <FormField
                        control={methods.control}
                        name="amountSubUnit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {selectProduct.subUnit.namePlural}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder={`Ingrese el numero de los ${selectProduct.subUnit.namePlural}...`}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {variant === "2" && (
                    <div className="space-y-2">
                      <FormField
                        control={methods.control}
                        name="amountUnit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {selectProduct.unit.namePlural}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder={`Ingrese el numero de los ${selectProduct.unit.namePlural}...`}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {variant === "3" && (
                    <div className="space-y-2">
                      <FormField
                        control={methods.control}
                        name="amountUnit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {selectProduct.unit.namePlural}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder={`Ingrese el numero de los ${selectProduct.unit.namePlural}...`}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={methods.control}
                        name="amountSubUnit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {selectProduct.subUnit.namePlural}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder={`Ingrese el numero de los ${selectProduct.subUnit.namePlural}...`}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-4">
                      Resumen del Producto
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Nombre:</span>
                        <span className="font-medium">
                          {selectProduct.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Cantidad:</span>
                        <span className="font-medium">
                          {formattedAmount(amountUnit, amountSubUnit)}
                        </span>
                      </div>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground font-semibold">
                            Sub Total
                          </span>
                          <span className="font-bold text-lg">
                            {moneyFormatted(formattedSubTotal())}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-end mt-3">
              <Button type="submit">Guardar y Agregar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
