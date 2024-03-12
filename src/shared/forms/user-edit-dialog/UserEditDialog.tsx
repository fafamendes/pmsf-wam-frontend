import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTokenContext } from "@context/TokenContext";
import { updateUser } from "@services/updateUser";


export interface IUserEditDialogProps {
  children: React.ReactNode;
  user: User;
  onUpdate?: () => void;
  beforeUpdate?: () => void;
}

export const UserEditDialog: React.FC<IUserEditDialogProps> = ({ children, user, onUpdate, beforeUpdate }) => {

  const { token } = useTokenContext();


  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputUsernameRef = useRef<HTMLInputElement>(null);
  const switchRef = useRef<HTMLButtonElement>(null);
  const [hasEdited, setHasEdited] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>(user.role);


  const handleSaveUser = useCallback((event: React.FormEvent) => {
    let checked = switchRef.current?.getAttribute("aria-checked") === "true" ? true : false;
    event.preventDefault();
    if (inputNameRef.current?.value === user.name &&
      inputUsernameRef.current?.value === user.username &&
      checked === user.status) {
      return;
    } else {

      beforeUpdate!();
      updateUser({
        id: user.id,
        name: inputNameRef.current?.value!,
        username: inputUsernameRef.current?.value!,
        status: checked!,
      }, token!)
        .then((response) => {
          if (response.success) {
            toast.success("Usuário editado com sucesso!", {
              description: `O usuário ${user.name} foi editado com sucesso!`,
            })
          }
        }).catch((e) => {
          toast.error("Ocorreu um erro ao editar o usuário!", {
            description: `Ocorreu um erro ao editar o usuário ${user.name}!`,
          })
        })
        .finally(() => {
          onUpdate!();
        })

    }

  }, [user, token, onUpdate, beforeUpdate])

  const handleChangeForm = useCallback((event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    let checked = switchRef.current?.getAttribute("aria-checked") === "true" ? true : false;
    console.log(userRole)
    if (inputNameRef.current?.value === user.name &&
      inputUsernameRef.current?.value === user.username &&
      checked === user.status &&
      userRole === user.role
    ) {
      setHasEdited(false);
      return;
    } else {
      setHasEdited(true);
    }
  }, [user, userRole]);

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
            <div className="w-full flex justify-start">
              <Select onValueChange={(value) => setUserRole(value)} defaultValue={user.role} >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de usuário" />
                </SelectTrigger>
                <SelectContent >
                  <SelectGroup>
                    <SelectLabel>Selecione o tipo de usuário</SelectLabel>
                    <SelectItem value="ADMIN">Administrador</SelectItem>
                    <SelectItem value="USER">Usuário</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-4 items-center w-full">
              <Switch ref={switchRef}
                className="data-[state=checked]:bg-pmsf"
                defaultChecked={user.status}

                id={'user-status'} />
              <Label htmlFor={'user-status'}>{switchRef.current?.getAttribute("aria-checked") === "true" ? 'Ativo' : 'Inativo'}</Label>
            </div>
            <DialogClose asChild>
              <Button type="submit" disabled={!hasEdited} className="bg-green-700 w-auto">Salvar</Button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}