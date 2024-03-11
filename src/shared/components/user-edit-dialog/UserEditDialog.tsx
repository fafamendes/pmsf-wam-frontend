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
import { useCallback, useRef, useState } from "react";

export interface IUserEditDialogProps {
  children: React.ReactNode;
  user: User;
}

export const UserEditDialog: React.FC<IUserEditDialogProps> = ({ children, user }) => {


  const [switchValue, setSwitchValue] = useState<boolean>(user.status);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputUsernameRef = useRef<HTMLInputElement>(null);
  const switchRef = useRef<HTMLButtonElement>(null);
  const [hasEdited, setHasEdited] = useState<boolean>(false);

  const handleChangeSwitch = useCallback((checked: boolean) => {
    console.log("ESTÁ CHECKADO:", checked)
    console.log(user.status)
    setSwitchValue(checked)
  }, [])

  const handleSaveUser = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    if (inputNameRef.current?.value === user.name && inputUsernameRef.current?.value === user.username && switchValue === user.status) {
      setHasEdited(false);
      return;
    } else {
      setHasEdited(true);
    }
    
  }, [user, switchValue])
  
  const handleChangeForm = useCallback((event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('UHU')
    if (inputNameRef.current?.value === user.name && inputUsernameRef.current?.value === user.username && switchValue === user.status) {
      setHasEdited(false);
      return;
    } else {
      setHasEdited(true);
    }
  }, [user, switchValue])

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
          <form className="flex flex-col gap-4 items-center" onChange={handleChangeForm} onSubmit={handleSaveUser}>
            <Input ref={inputNameRef} className="" placeholder="Nome" defaultValue={user.name} />
            <Input ref={inputUsernameRef} className="" placeholder="Matrícula" defaultValue={user.username} />
            <div className="flex gap-4 items-center w-full">
              <Switch ref={switchRef} defaultChecked={true} onCheckedChange={handleChangeSwitch} id={'user-status'} />
              <Label htmlFor={'user-status'}>{switchValue ? 'Ativo' : 'Inativo'}</Label>
            </div>
            <Button type="submit" disabled={!hasEdited} className="bg-green-700 w-auto">Salvar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}