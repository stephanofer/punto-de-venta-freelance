import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/app/ModeToggle";
import { Link } from "react-router-dom";
import {PackageCheck, Menu} from 'lucide-react'

type LinkUri = {
  label: string;
  uri: string;
};

export function Navbar() {
  console.log("C: NavBar Dashboard");

  const links: LinkUri[] = [
    {
      label: "Ventas",
      uri: "/dashboard",
    },
    {
      label: "Inventario",
      uri: "/dashboard/products",
    },
    {
      label: "Caja",
      uri: "/dashboard/checkout",
    },
    {
      label: "Clientes",
      uri: "/dashboard/clients",
    },
    {
      label: "Cuentas",
      uri: "/dashboard/invoices",
    },

    {
      label: "Reportes",
      uri: "/dashboard/reports",
    },
  ];

  return (
    <header className="flex flex-row w-full bg-background sticky top-0 border-b h-16  px-4 items-center text-foreground z-10">
      <nav className="flex flex-grow basis-0 items-center">
        <Link className="text-lg font-bold truncate" to={"/dashboard"}>
          <PackageCheck className="w-6 h-6 mr-3" />
        </Link>
        <ul className="hidden md:flex flex-row text-md">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                className="inline-block px-4 py-2 hover:bg-primary/10 rounded-md "
                to={link.uri}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="hidden md:flex md:flex-grow md:justify-end md:basis-0">
        <div className="ml-2 md:flex flex-row items-center">
          <ModeToggle />
        </div>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <div className="ml-2  md:hidden">
          <ModeToggle />
        </div>
        <SheetContent side="right" className="w-64 shadow-lg">
          <SheetHeader className="flex flex-col items-start">
            <SheetTitle className="text-lg font-bold truncate">
              Punto de Venta
            </SheetTitle>
            <SheetDescription>Seleccione una Opción</SheetDescription>
          </SheetHeader>

          <div className="flex flex-col space-y-4 p-4">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.uri}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
