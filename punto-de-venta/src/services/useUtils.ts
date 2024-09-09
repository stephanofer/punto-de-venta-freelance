import { ProductsGet } from "../dashboard/entities/types";

export function calcularSubtotal(
  unidadesGrandes: number = 0,
  subUnidades: number = 0,
  product: ProductsGet,
  variant: string
): { total: number; ganancia: number } {
  let total = 0;
  let ganancia = 0;
  const precioCostoXUnidad = Number((product.cost_price / product.quantity_for_unit).toFixed(2));

  

  if (product) {
    // Calcular el precio de las unidades grandes (cajas)
    if (unidadesGrandes > 0 && (variant === "2" || variant === "3")) {
      total += unidadesGrandes * product.selling_price_for_unit;
      ganancia += total - unidadesGrandes * product.cost_price;
    }

    // Calcular el precio de las subunidades
    if (subUnidades > 0 && (variant === "1" || variant === "3")) {
      if (subUnidades >= 12) {
        const cantidadDe12 = Math.floor(subUnidades / 12);
        const result = cantidadDe12 * product.selling_price_for_12;
        total += result;
        ganancia += result - cantidadDe12 * 12 * precioCostoXUnidad;
        subUnidades = subUnidades % 12;
      }
      if (subUnidades >= 6) {
        const result = product.selling_price_for_6;
        total += result;
        ganancia += result - 6 * precioCostoXUnidad;
        subUnidades -= 6; 
      } 
      if (subUnidades >= 3) {
        const result = product.selling_price_for_3;
        total += result;
        ganancia += result - 3 * precioCostoXUnidad;
        subUnidades -= 3;
      }
      if (subUnidades > 0) {
        const result = subUnidades * product.selling_price_for_1;
        ganancia += result - (subUnidades * precioCostoXUnidad);
        total += result;
      }
    }
  }

  total = Number(total.toFixed(2));
  ganancia = Number(ganancia.toFixed(2));
  return { total, ganancia };
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



export function singularOrPlural(product: ProductsGet) {
  const unit =
    product.stock === 1
      ? product.unit.name
      : product.unit.namePlural;

  const subUnit =
  product.sub_stock === 1
      ? product.subUnit.name
      : product.subUnit.namePlural;

  return {unit, subUnit}
}


export function formatMoney(amount: number) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}