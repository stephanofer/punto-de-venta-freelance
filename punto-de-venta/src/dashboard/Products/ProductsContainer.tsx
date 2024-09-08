import { AllTable } from "@/components/app/AllTables";
import { DialogConfirm } from "@/components/app/DialogConfirm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductsGet } from "@/dashboard/entities/types";
import { useProducts } from "@/dashboard/services/queries";
import { ColumnDef } from "@tanstack/react-table";
import { CircleAlertIcon, FilePenIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useDeleteProduct } from "../services/mutation";
import { ProductForm } from "./components/ProductForm";
import { Card } from "@/components/ui/card";

export function ProductsContainer() {
  const { data, isLoading } = useProducts();

  const { mutateAsync } = useDeleteProduct();

  //Booleans modales Editar y eliminar
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  //Booleans Formularios Crear / Editar
  const [showFormProduct, setShowFormProduct] = useState(false);

  //Estados para guardar el contexto de un producto
  const [product, setProduct] = useState<ProductsGet>();
  const [productEdited, setProductEdited] = useState<ProductsGet>();

  const columns: ColumnDef<ProductsGet>[] = [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => {
        return <span className="font-medium">{row.getValue("name")}</span>;
      },
    },
    {
      header: "Stock",
      // accessorFn: row => `${row.stock} ${row.sub_stock}`
      cell: ({ row }) => {
        const currentRow = row.original;
        const unit =
          currentRow.stock === 1
            ? currentRow.unit.name
            : currentRow.unit.namePlural;

        const subUnit =
          currentRow.sub_stock === 1
            ? currentRow.subUnit.name
            : currentRow.subUnit.namePlural;

        return (
          <Badge variant="outline">
            {`${currentRow.stock} ${unit} y ${currentRow.sub_stock} ${subUnit}`}
          </Badge>
        );
      },
    },
    {
      accessorKey: "cost_price",
      header: "Precio Costo",
      cell: ({ row }) => {
        const cost_price = parseFloat(row.getValue("cost_price"));
        const formatted = new Intl.NumberFormat("es-PE", {
          style: "currency",
          currency: "PEN",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(cost_price);
        return <Badge variant="secondary">{formatted}</Badge>;
      },
    },
    {
      accessorKey: "selling_price_for_unit",
      header: "Precio Venta",
      cell: ({ row }) => {
        const cost_price = parseFloat(row.getValue("selling_price_for_unit"));
        const formatted = new Intl.NumberFormat("es-PE", {
          style: "currency",
          currency: "PEN",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(cost_price);
        return <Badge variant="secondary">{formatted}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Acciones",

      cell: ({ row }) => {
        const productActually: ProductsGet = row.original;

        const handleDelete = () => {
          setProduct(productActually);
          setShowModalDelete(true);
        };

        const handleEditar = () => {
          setProductEdited(productActually);
          setShowFormProduct(true);
        };

        return (
          <div className="flex gap-2 ">
            <Button variant="outline" size="sm" onClick={() => handleEditar()}>
              <FilePenIcon className="w-4 h-4" />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete()}
            >
              <TrashIcon className="w-4 h-4" />
              Eliminar
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div
      className="flex flex-col bg-background p-4"
      style={{ height: "calc(100vh - 64px)" }}
    >
      {isLoading ? (
        "Cargando...."
      ) : (
        <Card>
          <AllTable
            columns={columns}
            data={data || []}
            title="Inventario"
            filterBy={{ value: "name", label: "Filtrar por nombre..." }}
            extraButton={
              <Button
                onClick={() => setShowFormProduct(true)}
                className="h-12 rounded-md px-8"
              >
                Nuevo Producto
              </Button>
            }
          />
        </Card>
      )}

      <ProductForm
        open={showFormProduct}
        setOpen={setShowFormProduct}
        productEdit={productEdited}
        setProductEdit={setProductEdited}
      />

      <DialogConfirm
        icon={<CircleAlertIcon className="w-12 h-12 text-red-500" />}
        messages={{
          title: `¿Seguro de Eliminar ${product?.name}?`,
          description: `Presiona "Cancelar" para salir`,
        }}
        open={showModalDelete}
        onOpenChange={setShowModalDelete}
        deleteButton={{
          control: true,
          handleClickDelete: async () => {
            try {
              if (product) {
                console.log(product);
                await mutateAsync(product.productId);
                setShowModalDelete(false);
              }
            } catch (e) {
              setShowModalError(true);
            }
          },
        }}
      />

      <DialogConfirm
        icon={<CircleAlertIcon className="w-12 h-12 text-red-500" />}
        messages={{
          title: `Ocurrió un error`,
          description: `Contacté al equipo de soporte`,
        }}
        open={showModalError}
        onOpenChange={setShowModalError}
      />
    </div>
  );
}
