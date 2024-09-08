import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import myImage  from './images.jpg'
import { Link } from "react-router-dom";
function LoginForm() {
  return (
    <div className="w-full h-full md:grid md:min-h-[600px] md:grid-cols-2 xl:h-screen">
      <div className="flex items-center justify-center py-5">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Ingresar al Sistema</h1>
            <p className="text-balance text-muted-foreground">
            Ingrese su correo electrónico a continuación
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@hotmail.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Ingresar
            </Button>
            <Button variant="outline" className="w-full">
              Ingresar con Google
            </Button>
          </div>
          <div className="text-center text-sm">
          ¿No tienes una cuenta?{" "}
          <Link to={"/"} className="underline">
              Registrate
          </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted md:block">
        <img
          src={myImage}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
export default LoginForm;
