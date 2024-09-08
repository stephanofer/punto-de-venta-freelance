import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CashRegisterSchem,
  SchemaCashRegister,
  defaultValues,
} from "@/dashboard/services/schems/CashRegisterSchem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCashRegister } from "../services/mutation";
import { DialogConfirm } from "@/components/app/DialogConfirm";
import { CircleAlertIcon } from "lucide-react";
import { AxiosError } from "axios";

type Props = {
  open: boolean;
  onOpenChange: Dispatch<React.SetStateAction<boolean>>;
};

export function CashRegister({ open, onOpenChange }: Props) {
  const [showModalError, setShowModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { mutateAsync } = useCreateCashRegister();

  const handleOpenChange = () => {
    onOpenChange((open) => !open);
    methods.reset(defaultValues);
  };

  const methods = useForm<SchemaCashRegister>({
    mode: "all",
    defaultValues,
    resolver: zodResolver(CashRegisterSchem),
  });

  const onSubmit = async (data: SchemaCashRegister) => {
    try {
      await mutateAsync(data);
      handleOpenChange();
    } catch (error) {
        console.log(error);
      if (error instanceof AxiosError) {
        console.log("proaca");
        setErrorMessage(error.response?.data.message || error.message);
      } else {
        setErrorMessage((error as Error).message);
      }
      setShowModalError(true);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Comenzar Día!</DialogTitle>
            <DialogDescription>
              Por favor ingresa la información requerida para iniciar la caja.
            </DialogDescription>
          </DialogHeader>

          {/* Muevo el formulario aquí */}
          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="grid gap-4 pb-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormField
                    control={methods.control}
                    name="initialAmount"
                    render={({ field }) => (
                      <FormItem className="col-span-4 flex items-center">
                        <FormLabel className="w-1/4 text-right pr-4">
                          Dinero Inicial
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingrese dinero inicial"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Confirmar y Iniciar Día</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <DialogConfirm
        icon={<CircleAlertIcon className="w-12 h-12 text-red-500" />}
        messages={{
          title: "Ocurrio un error",
          description: errorMessage,
        }}
        open={showModalError}
        onOpenChange={setShowModalError}
      />
    </>
  );
}
