import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCallback, useState } from "react";

export interface IUserEditDialogProps {
  children: React.ReactNode;
  user: User;
}

export const UserEditDialog: React.FC<IUserEditDialogProps> = ({ children, user }) => {


  const [switchValue, setSwitchValue] = useState<boolean>(user.status);

  const handleChangeSwitch = useCallback(() => {
    setSwitchValue(!switchValue)
  }, [switchValue])

  return (
    <>
      <Dialog>
        <DialogTrigger className="w-[100%]">
          {children}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Editar {user.name}
            </DialogTitle>
            <DialogDescription>
              Matrícula: {user.username}
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-4 items-center" action="
          ">
            <Input className="" placeholder="Nome" defaultValue={user.name} />
            <Input className="" placeholder="Matrícula" defaultValue={user.username} />
            <div className="flex gap-4 items-center w-full">
              <Switch defaultChecked={switchValue} onCheckedChange={handleChangeSwitch} id={'user-status'} />
              <Label htmlFor={'user-status'}>{switchValue ? 'Ativo' : 'Inativo'}</Label>
            </div>
            <Button className="bg-green-700 w-auto">Salvar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}