import { ProductsGet } from "@/dashboard/entities/types";
import { calcularSubtotal } from "@/services/useUtils";

type Props = {
  unidadesGrandes: number;
  subUnidades: number;
  product: ProductsGet | null;
  variant: "" | "1" | "2" | "3";
};

type PropsAmountFormat = {
  unit: number;
  subUnit: number;
  variant: "" | "1" | "2" | "3";
  product: ProductsGet | null;
};

type PropsSubUnidades = {
  unidadesGrandes: number;
  subUnidades: number;
  variant: "" | "1" | "2" | "3";
  productoInfo: ProductsGet | null;
};

export function useCalculateInvoice({
  unidadesGrandes,
  subUnidades,
  product,
  variant
}: Props) {
  if (product) {
    return calcularSubtotal(unidadesGrandes, subUnidades, product, variant);
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

export function useCalcularTotalSubunidades({
  unidadesGrandes,
  subUnidades,
  productoInfo,
  variant,
}: PropsSubUnidades) {
  const subUnidadesDeUnidadesGrandes =
      unidadesGrandes * (productoInfo?.quantity_for_unit ?? 0);
  const totalSubunidades = subUnidadesDeUnidadesGrandes + subUnidades;


  if (unidadesGrandes > 0 && subUnidades > 0 && variant === "3") {
    return totalSubunidades;
  } else if (unidadesGrandes > 0 && variant === "2") {
    return subUnidadesDeUnidadesGrandes;
  } else if (subUnidades > 0 && variant === "1") {
  return subUnidades;
  }

  return 0;
}
