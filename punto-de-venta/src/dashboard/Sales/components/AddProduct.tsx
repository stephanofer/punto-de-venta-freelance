import { AllTable } from "@/components/app/AllTables";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { ProductsGet } from "@/dashboard/entities/types";
import { useProducts } from "@/dashboard/services/queries";
import { ColumnDef } from "@tanstack/react-table";
import { MousePointerClick } from "lucide-react";
import { useState } from "react";
import { useProductStore } from "../services/useProductStore";
import { AddProductForm } from "./AddProductForm";

export function AddProduct() {
  const [firstOpen, setFirstOpen] = useState(false);
  const [twoOpen, setTwoOpen] = useState(false);

  const { data, isLoading } = useProducts();

  const selectProduct = useProductStore((state) => state.addSelect);

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

        const handleAdd = () => {
          selectProduct({
            variantAction: "add",
            ...productActually
          });
          setFirstOpen(false)
          setTwoOpen(true)
        };

        return (
          <div className="flex gap-2 ">
            <Button variant="outline" size="sm" onClick={() => handleAdd()}>
              Agregar
              <MousePointerClick className="ml-1 w-4 h-4 " />
            </Button>
          </div>
        );
      },
    },
  ];

  const handleFirstOpen = () => {
    console.log("Entrando Open");
    setFirstOpen((firstOpen) => !firstOpen);
  };


  // onClick={() => {
  //   setSelectedProduct({
  //     id: 1,
  //     description: "asd",
  //     image: "asd",
  //     name: "asd",
  //     price: 10,
  //   });
  //   setFirstOpen((firstOpen) => !firstOpen);
  //   setTwoOpen((twoOpen) => !twoOpen);
  // }}

  return (
    <div>
      <Dialog open={firstOpen} onOpenChange={handleFirstOpen}>
        {" "}
        <DialogTrigger asChild>
          <Button className="h-11 rounded-md px-5">
            Agregar Producto
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 ml-1">
              <span className="text-xs">F10</span>
            </kbd>
          </Button>
        </DialogTrigger>
        <DialogContent className="md:max-w-[1200px] xl:max-w-[1500px]">
          <div className="grid gap-4">
            {isLoading ? (
              "Cargando..."
            ) : (
              <AllTable
                columns={columns}
                data={data || []}
                filterBy={{
                  label: "Filtrar por producto",
                  value: "name",
                }}
                title={`Agregar un Producto a la venta`}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AddProductForm open={twoOpen} setOpen={setTwoOpen} />
    </div>
  );
}
