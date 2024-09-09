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
import { ProductsGet } from "@/dashboard/entities/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import {
  InvoiceDetailSchema,
  SchemaInvoiceDetail,
  defaultValues,
} from "../schemas/InvoiceDetailSchem";
import { useDetailStore } from "../services/useDetailStore";
import { useAmountFormat, useCalcularTotalSubunidades, useCalculateInvoice } from "../services/useCalculateInvoice";
import { formatMoney } from "@/services/useUtils";

export function AddProductForm() {

  //Componente donde estaran los datos del producto
  const [productDetail, setProductDetail] = useState<ProductsGet>();

  const dialogTwo = useDetailStore((state) => state.dialogTwo);
  const setDialogTwo = useDetailStore((state) => state.setDialogTwo);

  const productSelect = useDetailStore((state) => state.productSelect);
  const setProductSelect = useDetailStore((state) => state.setProductSelect);

  const productEdited = useDetailStore((state) => state.productEdited);
  const setProductEdited = useDetailStore((state) => state.setProductEdited);

  
  const setProductsInvoice = useDetailStore(
    (state) => state.setProductsInvoice
  );
  const updateProductsInvoice = useDetailStore(
    (state) => state.updateProductsInvoice
  );

  const methods = useForm<SchemaInvoiceDetail>({
    mode: "all",
    resolver: zodResolver(InvoiceDetailSchema),
    defaultValues,
  });

  const reset = methods.reset;

  useEffect(() => {
    if (!productSelect && productEdited) {
      setProductDetail(productEdited.product);
      switch (productEdited.variant) {
        case "1":
          reset({
            variant: productEdited.variant,
            amountSubUnit: productEdited.amountSubUnit,
          });
          break;
        case "2":
          reset({
            variant: productEdited.variant,
            amountUnit: productEdited.amountUnit,
          });
          break;
        case "3":
          reset({
            variant: productEdited.variant,
            amountUnit: productEdited.amountUnit,
            amountSubUnit: productEdited.amountSubUnit,
          });
          break;
      }
    } else if (productSelect) {
      setProductDetail(productSelect);
      reset({
        amountSubUnit: "",
        amountUnit: "",
      });
    }
  }, [productSelect, reset, productEdited]);

  const variant = useWatch({ control: methods.control, name: "variant" });

  const amountUnit = useWatch({ control: methods.control, name: "amountUnit" });
  const amountSubUnit = useWatch({
    control: methods.control,
    name: "amountSubUnit",
  });
  

  const subTotal = useCalculateInvoice({
    unidadesGrandes: parseInt(amountUnit),
    subUnidades: parseInt(amountSubUnit),
    product: productDetail || null,
    variant: variant
  });


  const amountFormatt = useAmountFormat({
    product: productDetail || null,
    unit: parseInt(amountUnit),
    subUnit: parseInt(amountSubUnit),
    variant: variant
  })

  const amountValue = useCalcularTotalSubunidades({
    productoInfo: productDetail || null,
    unidadesGrandes: parseInt(amountUnit),
    subUnidades: parseInt(amountSubUnit),
    variant: variant
  })

  const handleOpen = () => {
    setDialogTwo();
    setProductSelect(null);
    setProductEdited(null);
  };

  const onSubmit: SubmitHandler<SchemaInvoiceDetail> = (data) => {

    if (productDetail) {
      if  (productSelect) {
        switch (data.variant) {
          case "1":
            setProductsInvoice({
              ...data,
              product: productDetail,
              productName: productDetail.name,
              subTotal: subTotal?.total ? subTotal.total : 0,
              profitAmount: subTotal?.ganancia ? subTotal.ganancia : 0,
              amount: {
                label: amountFormatt ? amountFormatt : "",
                value: amountValue,
              },  
            });
            break;
          case "2":
            setProductsInvoice({
              ...data,
              product: productDetail,
              productName: productDetail.name,
              subTotal: subTotal?.total ? subTotal.total : 0,
              profitAmount: subTotal?.ganancia ? subTotal.ganancia : 0,

              amount: {
                label: amountFormatt ? amountFormatt : "",
                value: amountValue,
              },
            });
            break;
          case "3":
            setProductsInvoice({
              ...data,
              product: productDetail,
              productName: productDetail.name,
              subTotal: subTotal?.total ? subTotal.total : 0,
              profitAmount: subTotal?.ganancia ? subTotal.ganancia : 0,

              amount: {
                label: amountFormatt ? amountFormatt : "",
                value: amountValue,
              },
            });
            break;
        }
      } else if(productEdited){
        switch (data.variant) {
          case "1":
            updateProductsInvoice(productEdited, {
              ...data,
              product: productDetail,
              productName: productDetail.name,
              subTotal: subTotal?.total ? subTotal.total : 0,
              profitAmount: subTotal?.ganancia ? subTotal.ganancia : 0,

              amount: {
                label: amountFormatt ? amountFormatt : "",
                value: amountValue,
              },
            });
            break;
          case "2":
            updateProductsInvoice(productEdited, {
              ...data,
              product: productDetail,
              productName: productDetail.name,
              subTotal: subTotal?.total ? subTotal.total : 0,
              profitAmount: subTotal?.ganancia ? subTotal.ganancia : 0,


              amount: {
                label: amountFormatt ? amountFormatt : "",
                value: amountValue,
              },
            });
            break;
          case "3":
            updateProductsInvoice(productEdited, {
              ...data,
              product: productDetail,
              productName: productDetail.name,
              subTotal: subTotal?.total ? subTotal.total : 0,
              profitAmount: subTotal?.ganancia ? subTotal.ganancia : 0,


              amount: {
                label: amountFormatt ? amountFormatt : "",
                value: amountValue,
              },
            });
            break;
        }
      }
    }
    handleOpen();
  };

  return (
    <Dialog open={dialogTwo} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Agregar un producto a la venta</DialogTitle>
          <DialogDescription>
            Complete los detalles para agregar un nuevo producto. Recuerda
            revisar el resumen antes.
          </DialogDescription>
        </DialogHeader>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex gap-6">
              <div className="flex-1 space-y-4">
                <div className="space-y-2"></div>

                <FormField
                  control={methods.control}
                  name="variant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Metodo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo de cantidad..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productDetail && (
                            <>
                              <SelectItem value="1">
                                {`${productDetail.subUnit.namePlural}`}
                              </SelectItem>
                              <SelectItem value="2">
                                {`${productDetail.unit.namePlural}`}
                              </SelectItem>
                              <SelectItem value="3">
                                {`${productDetail.unit.namePlural} + ${productDetail.subUnit.namePlural}`}
                              </SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {variant === "1" && (
                  <div className="space-y-2">
                    <FormField
                      control={methods.control}
                      name="amountSubUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {productDetail && productDetail.subUnit.namePlural}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder={`Ingrese el numero de los ${productDetail?.subUnit.namePlural}...`}
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
                            {productDetail?.unit.namePlural}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder={`Ingrese el numero de los ${productDetail?.unit.namePlural}...`}
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
                            {productDetail?.unit.namePlural}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder={`Ingrese el numero de los ${productDetail?.unit.namePlural}...`}
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
                            {productDetail?.subUnit.namePlural}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder={`Ingrese el numero de los ${productDetail?.subUnit.namePlural}...`}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
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
                          {productDetail && productDetail.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Cantidad:</span>
                        <span className="font-medium">
                          {amountFormatt}
                        </span>
                      </div>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground font-semibold">
                            Sub Total
                          </span>
                          <span className="font-bold text-lg">
                            {subTotal ? formatMoney(subTotal.total) : "Completa las cantidades..."}
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
