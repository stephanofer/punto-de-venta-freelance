import { Product, ProductCreateEdit } from "../entities/types";
import { SchemaProduct } from "../Products/schemas/ProductSchem";

export function mapData(data: SchemaProduct): ProductCreateEdit {
  const common: Product = {
    name: data.name,
    categoryId: parseInt(data.categoryId),
    brandId: parseInt(data.brandId),
    unitId: parseInt(data.unitId),
    subUnitId: parseInt(data.subUnitId),
    stock: parseInt(data.stock),
    cost_price: parseFloat(data.cost_price),
    quantity_for_unit: parseFloat(data.quantity_for_unit),
    selling_price_for_1: parseFloat(data.selling_price_for_1),
    selling_price_for_3: parseFloat(data.selling_price_for_3),
    selling_price_for_6: parseFloat(data.selling_price_for_6),
    selling_price_for_12: parseFloat(data.selling_price_for_12),
    selling_price_for_unit: parseFloat(data.selling_price_for_unit),
  };

  switch (data.variant) {
    case "create": {
      return { ...common, variant: data.variant, sub_stock: 0};
    }
    case "edit": {
      return {
        ...common,
        variant: data.variant,
        productId: parseInt(data.productId),
        sub_stock: parseInt(data.sub_stock),
      };
    }
  }
}
