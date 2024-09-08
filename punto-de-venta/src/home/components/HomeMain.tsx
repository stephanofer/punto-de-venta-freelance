import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { GlobeIcon } from "@radix-ui/react-icons";

export function HomeMain() {
  return (
    <section className="w-full h-full bg-background text-foreground xl:h-screen">
      <div className=" flex flex-col items-center justify-center pt-8">
        <h1 className="text-5xl font-bold  tracking-tighter pb-2 truncate md:text-6xl md:pb-4 xl:text-7xl">
          Púnto de Venta
        </h1>
        <p className="w-[400px] text-center md:w-[500px] md:text-lg xl:text-2xl">
          Únase a nosotros y tome el control de su negocio. Rápido, seguro y
          diseñado para la vida moderna.
        </p>
      </div>
      <div className="my-6 flex flex-col items-center">
        <form className="flex">
          <Input
            className="w-60 mr-2 md:w-[300px]"
            placeholder="Ingresa tu Correo"
            type="email"
          />
          <Button type="submit">Empezar</Button>
        </form>
        <p className="w-[400px] mt-2 text-center md:w-[500px] md:text-md">
          Prepárese para redefinir su negocio.{"  "}
          <Link to={"/"} className="underline underline-offset-2 ">
            Terminos y Condiciones
          </Link>
        </p>
      </div>

      <div className="grid grid-cols-1 pt-1 pb-10 md:pb-20 md:grid-cols-3 xl:gap-20 xl:pt-10">
        <div className="flex flex-col items-center p-3">
          <div className="p-2">
            <GlobeIcon className="h-6 w-6 mb-2 opacity-75" />
          </div>
          <h2 className="text-xl font-bold">Smart Inbox</h2>
          <p className="text-md text-center w-[400px] md:w-[300px] xl:w-[400px]">
            Our Smart Inbox feature helps you manage your emails efficiently by
            prioritizing important emails.
          </p>
        </div>

        <div className="flex flex-col items-center p-3">
          <div className="p-2">
            <GlobeIcon className="h-6 w-6 mb-2 opacity-75" />
          </div>
          <h2 className="text-xl font-bold">Smart Inbox</h2>
          <p className="text-md text-center w-[400px] md:w-[300px] xl:w-[400px]">
            Our Smart Inbox feature helps you manage your emails efficiently by
            prioritizing important emails.
          </p>
        </div>

        <div className="flex flex-col items-center p-3">
          <div className="p-2">
            <GlobeIcon className="h-6 w-6 mb-2 opacity-75" />
          </div>
          <h2 className="text-xl font-bold">Smart Inbox</h2>
          <p className="text-md text-center w-[400px] md:w-[300px] xl:w-[400px]">
            Our Smart Inbox feature helps you manage your emails efficiently by
            prioritizing important emails.
          </p>
        </div>

        <div className="flex flex-col items-center p-3">
          <div className="p-2">
            <GlobeIcon className="h-6 w-6 mb-2 opacity-75" />
          </div>
          <h2 className="text-xl font-bold">Smart Inbox</h2>
          <p className="text-md text-center w-[400px] md:w-[300px] xl:w-[400px]">
            Our Smart Inbox feature helps you manage your emails efficiently by
            prioritizing important emails.
          </p>
        </div>

        <div className="flex flex-col items-center p-3">
          <div className="p-2">
            <GlobeIcon className="h-6 w-6 mb-2 opacity-75" />
          </div>
          <h2 className="text-xl font-bold">Smart Inbox</h2>
          <p className="text-md text-center w-[400px] md:w-[300px] xl:w-[400px]">
            Our Smart Inbox feature helps you manage your emails efficiently by
            prioritizing important emails.
          </p>
        </div>

        <div className="flex flex-col items-center p-3">
          <div className="p-2">
            <GlobeIcon className="h-6 w-6 mb-2 opacity-75" />
          </div>
          <h2 className="text-xl font-bold">Smart Inbox</h2>
          <p className="text-md text-center w-[400px] md:w-[300px] xl:w-[400px]">
            Our Smart Inbox feature helps you manage your emails efficiently by
            prioritizing important emails.
          </p>
        </div>
      </div>
    </section>
  );
}

