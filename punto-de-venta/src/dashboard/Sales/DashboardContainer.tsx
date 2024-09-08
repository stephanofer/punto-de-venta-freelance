import { AddProduct } from "./components/AddProduct";
import { SaleSummary } from "./components/SaleSummary";

import { AllTable } from "@/components/app/AllTables";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InvoiceDetail } from "@/dashboard/entities/types";
import { ColumnDef } from "@tanstack/react-table";
import { FilePenIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CashRegister } from "../components/CashRegister";
import {
  useGetNextInvoiceNumber,
  useValidateCashRegister,
} from "../services/queries";
import { useProductStore } from "./services/useProductStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export function DashboardContainer() {
  const { data: validateCashRegister } = useValidateCashRegister();

  const { data: dataInvoiceNumber, isLoading: isLoadingInvoiceNumer } =
    useGetNextInvoiceNumber();

  const [cashRegisterDialog, setCashRegisterDialog] = useState(false);

  const dateSaleProduct = useProductStore((state) => state.saleProducts);

  const moneyFormatted = (number: number) => {
    const formatted = new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);

    return formatted;
  };

  useEffect(() => {
    if (validateCashRegister === false) {
      setCashRegisterDialog(true);
    }
  }, [validateCashRegister]);

  const columns: ColumnDef<InvoiceDetail>[] = [
    {
      accessorKey: "productId",
      header: "Codigo",
    },
    {
      accessorKey: "productName",
      header: "Nombre",
    },
    {
      accessorKey: "amount",
      header: "Cantidad",
      cell: ({ row }) => {
        const rowCurrent = row.original;

        return <Badge variant="outline">{rowCurrent.amount.label}</Badge>;
      },
    },

    {
      accessorKey: "subTotal",
      header: "Sub Total",
      cell: ({ row }) => {
        const rowCurrent = row.original;

        return (
          <Badge variant="outline">
            {moneyFormatted(parseFloat(rowCurrent.subTotal))}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Acciones",

      cell: () => {
        return (
          <div className="flex gap-2 pr-1">
            <Button
              variant="outline"
              size="sm"
              // onClick={() => handleEditar()}
            >
              <FilePenIcon className="w-4 h-4" />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              // onClick={() => handleDelete()}
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
      className="flex flex-col bg-background"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <CashRegister
        open={cashRegisterDialog}
        onOpenChange={setCashRegisterDialog}
      />
      <main className="p-4 relative" style={{ height: "calc(100vh - 80px)" }}>
        {isLoadingInvoiceNumer ? (
          "Cargando...."
        ) : (
          <Card>
            <AllTable
              columns={columns}
              data={dateSaleProduct}
              extraButton={<AddProduct />}
              filterBy={{
                label: "Filtrar por producto",
                value: "name",
              }}
              title={`Ticket #${dataInvoiceNumber || "Error"}`}
            />
          </Card>
        )}
      </main>

      <footer className="flex items-center h-20 border-t px-6 w-full absolute bottom-0 bg-background text-foreground">
        <SaleSummary />
      </footer>

      {/* <Dialog open={true}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generar Comprobante</DialogTitle>
            <DialogDescription>
              Revise los detalles de la venta antes de completar la transacción.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Cliente:</div>
              <div>Stephano Fernandez</div>
              <div className="font-medium">Tipo de Pago:</div>
              <div>Contado</div>
              <div className="font-medium">Fecha y Hora:</div>
              <div>{format(new Date(), "dd/MM/yyyy HH:mm:ss")}</div>
            </div>
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Ajinomen Gallina</TableCell>
                  <TableCell>50 Cajas</TableCell>
                  <TableCell>S/ 1625.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Lejía Clorox chica</TableCell>
                  <TableCell>10 Cajas</TableCell>
                  <TableCell>S/ 180.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">La patrona 1 litro</TableCell>
                  <TableCell>1 Caja y 6 Unidades</TableCell>
                  <TableCell>S/ 132.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Capri 900ml</TableCell>
                  <TableCell>20 Cajas</TableCell>
                  <TableCell>S/ 1,900.00</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} className="font-medium text-right">
                    Total:
                  </TableCell>
                  <TableCell className="font-medium">S/ 3837.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <DialogFooter>
            <Button variant="destructive" size="sm">
              Cancelar
            </Button>
            <Button variant="outline" size="sm">
              {" "}
              No Imprimir
            </Button>
            <Button variant="outline" size="sm">
              {" "}
              Imprimir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
