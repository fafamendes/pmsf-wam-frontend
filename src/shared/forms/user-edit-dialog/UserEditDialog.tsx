import { useCallback, useEffect, useState } from "react";
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


  const [hasEdited, setHasEdited] = useState<boolean>(false);

  const [name, setName] = useState<string>(user.name);
  const [username, setUsername] = useState<string>(user.username);
  const [userRole, setUserRole] = useState<string>(user.role);
  const [status, setStatus] = useState<boolean>(user.status);

  const handleSaveUser = useCallback((event: React.FormEvent) => {

    event.preventDefault();
    if (!hasEdited) {
      return;
    } else {
      beforeUpdate!();
      updateUser({
        id: user.id,
        name,
        username,
        role: userRole,
        status,
      }, token!)
        .then((response) => {
          if (response.success) {
            toast.success("Usuário editado com sucesso!", {
              description: `O usuário ${user.name} foi editado com sucesso!`,
            })
          } else {
            console.log(response);
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
  }, [user, name, username, status, userRole, onUpdate, beforeUpdate, hasEdited, token]);

  useEffect(() => {
    if (
      name === user.name &&
      username === user.username &&
      userRole === user.role &&
      status === user.status
    ) {
      setHasEdited(false);
      return;
    } else {
      setHasEdited(true);
    }
  }, [user, userRole, username, name, status]);

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
          <form className="flex flex-col gap-4 items-center" onSubmit={handleSaveUser}>
            <Input className="" onChange={(e) => { setName(e.target.value) }} placeholder="Nome" defaultValue={user.name} />
            <Input className="" onChange={(e) => { setUsername(e.target.value) }} placeholder="Matrícula" defaultValue={user.username} />
            <div className="w-full flex justify-start">
              <Select onValueChange={setUserRole} defaultValue={user.role} >
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
              <Switch
                className="data-[state=checked]:bg-pmsf"
                defaultChecked={user.status}
                onCheckedChange={setStatus}
                id={'user-status'} />
              <Label htmlFor={'user-status'}>{ }</Label>
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