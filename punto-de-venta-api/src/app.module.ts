import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { UnitModule } from './unit/unit.module';
import { SubUnitModule } from './sub-unit/sub-unit.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { StatusInvoiceModule } from './status-invoice/status-invoice.module';
import { TypeInvoiceModule } from './type-invoice/type-invoice.module';
import { StatusCreditModule } from './status-credit/status-credit.module';
import { InvoiceModule } from './invoice/invoice.module';
import { CashRegisterSessionModule } from './cash-register-session/cash-register-session.module';
import { CashMovementModule } from './cash-movement/cash-movement.module';

@Module({
  imports: [ProductsModule, CategoryModule, BrandModule, UnitModule, SubUnitModule, PaymentMethodsModule, StatusInvoiceModule, TypeInvoiceModule, StatusCreditModule, InvoiceModule, CashRegisterSessionModule, CashMovementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
