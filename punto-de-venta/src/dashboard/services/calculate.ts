import { ProductsGet } from "../entities/types";

export function calcularSubtotal(
  unidadesGrandes: number = 0,
  subUnidades: number = 0,
  product: ProductsGet
): number {
  let total = 0;

  // Calcular el precio de las unidades grandes (cajas)
  if (unidadesGrandes > 0) {
    total += unidadesGrandes * product.selling_price_for_unit;
  }

  // Calcular el precio de las subunidades
  if (subUnidades > 0) {
    if (subUnidades >= 12) {
      total += Math.floor(subUnidades / 12) * product.selling_price_for_12;
      subUnidades = subUnidades % 12; //
    }
    if (subUnidades >= 6) {
      total += product.selling_price_for_6;
      subUnidades -= 6;
    }
    if (subUnidades >= 3) {
      total += product.selling_price_for_3;
      subUnidades -= 3;
    }
    if (subUnidades > 0) {
      total += subUnidades * product.selling_price_for_1;
    }
  }

  return total;
}

export function calcularTotalSubunidades(
  unidadesGrandes: number,
  subUnidades: number,
  productoInfo: ProductsGet
): number {
  const subUnidadesDeUnidadesGrandes =
    unidadesGrandes * productoInfo.quantity_for_unit;
  const totalSubunidades = subUnidadesDeUnidadesGrandes + subUnidades;
  return totalSubunidades;
}