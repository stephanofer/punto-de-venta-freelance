import { DialogConfirm } from "@/components/app/DialogConfirm";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductsGet } from "@/dashboard/entities/types";
import {
  ProductSchema,
  SchemaProduct,
  defaultValues,
} from "@/dashboard/Products/schemas/ProductSchem";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/dashboard/services/mutation";
import {
  useBrands,
  useCategories,
  useProduct,
  useSubUnit,
  useUnit,
} from "@/dashboard/services/queries";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Check, ChevronsUpDown, CircleAlertIcon } from "lucide-react";
import { Dispatch, useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";

type Props = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  productEdit?: ProductsGet;
  setProductEdit?: Dispatch<React.SetStateAction<ProductsGet | undefined>>;
};

export function ProductForm({
  open,
  setOpen,
  productEdit,
  setProductEdit,
}: Props) {
  //booleans
  const [showModalError, setShowModalError] = useState(false);
  const [showLabelBrand, setShowLabelBrand] = useState(false);

  //Message error for dialog response back-end

  const [errorMessage, setErrorMessage] = useState("");

  const categoriesQuery = useCategories();
  const brandsQuery = useBrands();
  const unitsQuery = useUnit();
  const subUnitQuery = useSubUnit();

  const { mutateAsync } = useCreateProduct();
  const { mutateAsync: mutateUpdateAsync } = useUpdateProduct();

  const methods = useForm<SchemaProduct>({
    mode: "all",
    resolver: zodResolver(ProductSchema),
    defaultValues,
  });

  const { reset } = methods;

  const onSubmit: SubmitHandler<SchemaProduct> = async (data) => {
    try {
      if (variant === "create") {
        await mutateAsync(data);
        handleClose();
      } else {
        await mutateUpdateAsync(data);
        handleClose();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message);
      } else {
        setErrorMessage((error as Error).message);
      }
      setShowModalError(true);
    }
  };

  const id = productEdit ? productEdit.productId.toString() : undefined;
  const variant = useWatch({ control: methods.control, name: "variant" });

  const productQuery = useProduct(id || "");

  useEffect(() => {
    if (productQuery.data) {
      reset(productQuery.data);
    }
  }, [reset, productQuery.data]);

  const handleClose = () => {
    if (productEdit && setProductEdit) {
      setProductEdit(undefined);
    }
    setOpen((open) => !open);
    reset(defaultValues);
  };


  return (
    <Form {...methods}>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {variant === "create"
                ? "Crear Nuevo Producto"
                : "Editar Producto"}
            </DialogTitle>
            <DialogDescription>
              {variant === "create"
                ? "Complete el formulario para crear un nuevo producto. "
                : "Complete el formulario para editar un producto existente. "}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormField
                  control={methods.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre del producto" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={methods.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={`${field.value}`}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona la categoria..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoriesQuery?.data?.map((category) => (
                            <SelectItem
                              value={`${category.categoryId}`}
                              key={category.categoryId}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={methods.control}
                  name="brandId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-2.5">Marcas</FormLabel>

                      <Popover
                        open={showLabelBrand}
                        onOpenChange={setShowLabelBrand}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value && "font-normal"
                              )}
                            >
                              {field.value
                                ? brandsQuery?.data?.find(
                                    (brand) =>
                                      `${brand.brandId}` === field.value
                                  )?.name
                                : "Seleccionar Marca"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Buscar Marca..." />
                            <ScrollArea>
                              <CommandList>
                                <CommandEmpty>
                                  No se encontro la marca.
                                </CommandEmpty>
                                <CommandGroup>
                                  {brandsQuery?.data?.map((brand) => (
                                    <CommandItem
                                      value={brand.name}
                                      key={brand.brandId}
                                      onSelect={() => {
                                        methods.setValue(
                                          "brandId",
                                          `${brand.brandId}`
                                        );
                                        setShowLabelBrand(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          `${brand.brandId}` === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {brand.name}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </ScrollArea>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={methods.control}
                  name="unitId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unidad</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={`${field.value}`}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona la Unidad..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {unitsQuery?.data?.map((unit) => (
                            <SelectItem
                              value={`${unit.unitId}`}
                              key={unit.unitId}
                            >
                              {unit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={methods.control}
                  name="subUnitId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub Unidad</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={`${field.value}`}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona la Sub Unidad..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subUnitQuery?.data?.map((subUnit) => (
                            <SelectItem
                              value={`${subUnit.subUnitId}`}
                              key={subUnit.subUnitId}
                            >
                              {subUnit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={methods.control}
                  name="quantity_for_unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cantidad por cada Unidad</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Cantidad por cada Unidad (X Caja)"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={methods.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese el stock"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {variant === "edit" && (
                <div className="space-y-2">
                  <FormField
                    control={methods.control}
                    name="sub_stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sub Stock</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="space-y-2">
                <FormField
                  control={methods.control}
                  name="cost_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio Costo</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ingrese precio de costo"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={methods.control}
                  name="selling_price_for_1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio Venta (1)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ingrese precio de venta (1)"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={methods.control}
                  name="selling_price_for_3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio Venta (3)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ingrese precio de venta (3)"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={methods.control}
                  name="selling_price_for_6"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio Venta (6)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ingrese precio de venta (6)"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={methods.control}
                  name="selling_price_for_12"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio Venta (12)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ingrese precio de venta (12)"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={methods.control}
                  name="selling_price_for_unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio Venta (Unidad)</FormLabel>

                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ingrese precio de venta (Caja)"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="mt-3">
                {variant === "create" ? "Crear Producto" : "Editar Producto"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>

        <DialogConfirm
          icon={<CircleAlertIcon className="w-12 h-12 text-red-500" />}
          messages={{
            title: "Ocurrio un error",
            description: errorMessage,
          }}
          open={showModalError}
          onOpenChange={setShowModalError}
        />
      </Dialog>
    </Form>
  );
}
