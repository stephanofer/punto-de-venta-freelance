import { Button } from "@/components/ui/button";
import { formatMoney } from "@/services/useUtils";
import { ShoppingCartIcon } from "lucide-react";
import { useDetailStore } from "../services/useDetailStore";


export function SaleSummary() {
  const productsLength = useDetailStore((state) => state.invoiceDetailLenght);
  const total = useDetailStore((state) => state.total);
  const setDialogInvoiceDetail = useDetailStore((state) => state.setDialogInvoiceDetail);
  // console.log(total);

  const handleClick = () => {
    console.log("click");
    setDialogInvoiceDetail()
  };

  return (
    <div className="flex items-center gap-4 ml-auto ">
      <div className="flex items-center gap-2">
        <ShoppingCartIcon className="w-5 h-5 text-muted-foreground" />
        <span>{`${productsLength} ${
          productsLength === 1 ? "Producto" : "Productos"
        }`}</span>
        <span className="font-bold text-xl">{formatMoney(total)}</span>
      </div>
      <Button size={"lg"} onClick={() => handleClick()}>
        Realizar Venta
      </Button>
    </div>
  );
}
