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
import { formatMoney, singularOrPlural } from "@/services/useUtils";
import { ColumnDef } from "@tanstack/react-table";
import { MousePointerClick } from "lucide-react";
import { useDetailStore } from "../services/useDetailStore";
import { AddProductForm } from "./AddProductForm";

export function AddProduct() {
  const dialogFirst = useDetailStore((state) => state.dialogFirst);
  // const dialogTwo = useDetailStore((state) => state.dialogTwo);

  const setDialogFirst = useDetailStore((state) => state.setDiagloFirst);
  const setDialogTwo = useDetailStore((state) => state.setDialogTwo);

  const setProductSelect = useDetailStore((state) => state.setProductSelect);

  const { data, isLoading } = useProducts();

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
        const { unit, subUnit } = singularOrPlural(currentRow);
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

        const formatted = formatMoney(cost_price);

        return <Badge variant="secondary">{formatted}</Badge>;
      },
    },
    {
      accessorKey: "selling_price_for_unit",
      header: "Precio Venta",
      cell: ({ row }) => {
        const cost_price = parseFloat(row.getValue("selling_price_for_unit"));

        const formatted = formatMoney(cost_price);

        return <Badge variant="secondary">{formatted}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Acciones",

      cell: ({ row }) => {
        const productActually = row.original;

        const handleAdd = () => {
          handleFirstOpen()
          setDialogTwo()
          setProductSelect(productActually)
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
    setDialogFirst();
  };

  return (
    <div>
      <Dialog open={dialogFirst} onOpenChange={handleFirstOpen}>
        {" "}
        <DialogTrigger asChild>
          <Button className="h-11 rounded-md px-5">
            Agregar Producto
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 ml-1">
              <span className="text-xs">F10</span>
            </kbd>
          </Button>
        </DialogTrigger>
        <DialogContent
          className="md:max-w-[1200px] xl:max-w-[1500px]"
          aria-describedby="asd"
        >
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

      <AddProductForm />
    </div>
  );
}
