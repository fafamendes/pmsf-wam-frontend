import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserContext } from "@context/UserContext";


export const UserInfo = () => {

  const { user } = useUserContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados do usuário</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <span>
          ✍️: {user?.name}
        </span>
        <span>
          📃: {user?.username}
        </span>
        <span>
          🧑‍💼: {user?.role === "ADMIN" ? "Administrador" : "Usuário"}
        </span>
        <span>
          {user?.status ? "🟢" : "🔴"}: {user?.status ? "Ativo" : "Inativo"
          }
        </span>
      </CardContent>

    </Card>
  );
}