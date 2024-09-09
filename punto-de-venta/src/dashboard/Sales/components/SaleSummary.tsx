import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { useProductStore } from "../services/useProductStore";
import { useDetailStore } from "../services/useDetailStore";

export function SaleSummary() {

  const productsLength = useProductStore((state) => state.productLength)
  const total = useDetailStore((state) => state.invoiceDetailLenght)
  console.log(total);

  const moneyFormatted = (number: number) => {

    const formatted = new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);

    return formatted

  }

  return (
    <div className="flex items-center gap-4 ml-auto ">
      <div className="flex items-center gap-2">
        <ShoppingCartIcon className="w-5 h-5 text-muted-foreground" />
        <span>{`${productsLength} Productos`}</span>
        <span className="font-bold text-xl">{`${moneyFormatted(total)}`}</span>
      </div>
      <Button size={"lg"}>Realizar Venta</Button>
    </div>
  );
}
