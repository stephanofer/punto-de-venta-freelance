import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { InvoiceDetailAddEdit } from "@/dashboard/entities/types";
import { formatMoney } from "@/services/useUtils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useDetailStore } from "../services/useDetailStore";
import { TableInvoice } from "./TableInvoice";


export function GenerateInvoice() {
  const productsInvoice = useDetailStore((state) => state.productsInvoice);
  const total = useDetailStore((state) => state.total);

  const dialogInvoice = useDetailStore((state) => state.dialogInvoice);
  const setDialogInvoice = useDetailStore((state) => state.setDialogInvoice);


  const columns: ColumnDef<InvoiceDetailAddEdit>[] = [
    {
      accessorKey: "productName",
      header: "Nombre",
    },
    {
      accessorKey: "amount",
      header: "Cantidad",
      cell: ({ row }) => {
        const rowCurrent = row.original;

        return rowCurrent.amount.label;
      },
    },
    {
      accessorKey: "subTotal",
      header: "Sub Total",
      cell: ({ row }) => {
        const rowCurrent = row.original;
        return (
          <Badge variant="outline">{formatMoney(rowCurrent.subTotal)}</Badge>
        );
      },
    },
  ];

  return (
    <Dialog open={dialogInvoice} onOpenChange={setDialogInvoice}>
      <DialogContent className="sm:max-w-xl">
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
          <TableInvoice columns={columns} data={productsInvoice} />
        </div>
        <DialogFooter className="grid grid-cols-[auto,1fr] gap-4 items-center">
          <Badge variant="secondary" className="text-md justify-self-start">
            Total: {formatMoney(total)}
          </Badge>
          <div className="flex justify-end gap-2">
            <Button variant="destructive" size="sm">
              Cancelar
            </Button>
            <Button variant="outline" size="sm">
              No Imprimir
            </Button>
            <Button variant="outline" size="sm">
              Imprimir
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
