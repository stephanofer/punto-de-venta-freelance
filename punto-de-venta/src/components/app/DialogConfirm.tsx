import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, ReactNode } from "react";

type TypeMessage = {
  title: string;
  description: string;
};

type Props = {
  open: boolean;
  onOpenChange: Dispatch<React.SetStateAction<boolean>>;
  messages: TypeMessage;
  deleteButton?: {
    control: boolean;
    handleClickDelete: () => void;
  };
  icon: ReactNode;
};

export function DialogConfirm({
  open,
  onOpenChange,
  messages,
  deleteButton,
  icon,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          {icon}
          <DialogTitle>
            <span className="text-lg font-medium block">{messages.title}</span>
          </DialogTitle>
          <DialogDescription>
            <span className="text-muted-foreground">
              {messages.description}
            </span>
          </DialogDescription>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange((open) => !open)}
          >
            Cancelar
          </Button>
          {deleteButton?.control && (
            <Button
              variant="destructive"
              onClick={deleteButton.handleClickDelete}
            >
              Eliminar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
