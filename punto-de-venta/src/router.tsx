import { createBrowserRouter } from "react-router-dom";
import {LayoutContainer} from "@/home/LayoutContainer";
import {HomeContainer} from "@/home/HomeContainer";
import {LoginContainer} from "@/home/login/LoginContainer";
import {ErrorContainer} from "@/home/ErrorContainer";
import {DashboardContainer} from '@/dashboard/Sales/DashboardContainer'
import { LayoutDashboard } from "@/dashboard/LayoutDashboard";
import {ProductsContainer} from "@/dashboard/Products/ProductsContainer";
import {CheckoutContainer} from '@/dashboard/Checkout/CheckoutContainer'
import {ReportsContainer} from '@/dashboard/Reports/ReportsContainer'
import {InvoicesContainer} from '@/dashboard/Invoices/InvoicesContainer'
import {ClientsContainer} from '@/dashboard/Clients/ClientsContainer'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutContainer />,
    errorElement: (
        <LayoutContainer>
            <ErrorContainer />
        </LayoutContainer>
    ),
    children: [
      { index: true, element: <HomeContainer />, },
      { path: "/login", element: <LoginContainer />, },
      
    ],
  },
  {
    path: "/dashboard",
    element: <LayoutDashboard/>,
    children: [
      { index: true, element: <DashboardContainer/>},
      { path:"products", element: <ProductsContainer/>},
      { path:"checkout", element: <CheckoutContainer/>},
      { path:"clients", element: <ClientsContainer/>},
      { path:"invoices", element: <InvoicesContainer/>},
      { path:"reports", element: <ReportsContainer/>},
    ]
  },
]);
