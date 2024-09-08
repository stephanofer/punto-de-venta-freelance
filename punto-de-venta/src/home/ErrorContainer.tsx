import { useEffect, useState } from "react";
import {
  isRouteErrorResponse,
  Link,
  useRouteError,
} from "react-router-dom";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export function ErrorContainer() {
  console.log("C: ErrorContainer");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const error = useRouteError();
  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      setErrorMessage(
        "Lo sentimos, pero parece que la página a la que intentabas acceder no está disponible. Inténtelo de nuevo más tarde o contáctenos si el problema persiste."
      );
    } else {
      setErrorMessage("Ocurrio un error internamente");
    }
  }, [error]);
  console.log(error);
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <EyeClosedIcon className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          ¡Huy! Algo salió mal!
        </h1>
        <p className="mt-4 text-muted-foreground">{errorMessage}</p>
        <div className="mt-6">
          <Link to={"/"}>
            <Button className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Ir a Inicio</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
