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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTokenContext } from "@context/TokenContext";
import { updateUser } from "@services/updateUser";
import { useCallback, useRef, useState } from "react";

export interface INewUserFormProps {
  children: React.ReactNode;
  beforeCreate?: () => void;
  onCreate?: () => void;
}

export const NewUserForm: React.FC<INewUserFormProps> = ({ children, beforeCreate, onCreate }) => {

  const { token } = useTokenContext();

  return (
    <>

    </>
  );
}



