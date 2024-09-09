import { ProductsGet } from "@/dashboard/entities/types";
import { calcularSubtotal } from "@/services/useUtils";

type Props = {
  unidadesGrandes: number;
  subUnidades: number;
  product: ProductsGet | null;
};

type PropsAmountFormat = {
  unit: number;
  subUnit: number;
  variant: "" | "1" | "2" | "3";
  product: ProductsGet | null;
};

export function useCalculateInvoice({
  unidadesGrandes,
  subUnidades,
  product,
}: Props) {
  if (product) {
    return calcularSubtotal(unidadesGrandes, subUnidades, product);
  }
}

export function useAmountFormat({
  unit,
  subUnit,
  variant,
  product,
}: PropsAmountFormat) {
  if (product) {
    const unitName = unit === 1 ? product.unit.name : product.unit.namePlural;
    const subUnitName =
      subUnit === 1 ? product.subUnit.name : product.subUnit.namePlural;

    if (unit && subUnit && variant === "3") {
      return `${unit} ${unitName} y ${subUnit} ${subUnitName}`;
    } else if (unit && variant === "2") {
      return `${unit} ${unitName}`;
    } else if (subUnit && variant === "1") {
      return `${subUnit} ${subUnitName}`;
    }

    return "Complete las cantidades...";
  }
}
