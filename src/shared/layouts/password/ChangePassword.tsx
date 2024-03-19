import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { VisibilityButton } from "@components/visibility-button/VisibilityButton"
import { useUserContext } from "@context/UserContext"
import { updatePassword } from "@services/updatePassword"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useRef, useState } from "react"
import { toast } from "sonner"


export const ChangePassword = () => {

  const passwordRef = useRef<HTMLInputElement>(null)
  const repeatPasswordRef = useRef<HTMLInputElement>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const delay = 250

  const { user } = useUserContext();

  const { mutate } = useMutation({
    mutationKey: ['changePassword'],
    mutationFn: () => {
      return updatePassword(user?.id!, passwordRef.current?.value!, localStorage.getItem('token')!)
    },
    onSuccess: () => {
      toast.success('Senha alterada com sucesso', { style: { background: 'green', color: 'white' } })
    },
    onError: () => {
      toast.error('Erro ao alterar a senha', { style: { background: 'red', color: 'white' } })
    }
  })

  const handleComparePasswords = () => {
    if (passwordRef.current?.value.length === 0 || repeatPasswordRef.current?.value.length === 0) {
      setError(false)
    }
    else if (passwordRef.current?.value !== repeatPasswordRef.current?.value) {
      setErrorMessage('As senhas devem ser iguais')
      setError(true)
    }
    else if (passwordRef.current?.value.length! < 4 || repeatPasswordRef.current?.value.length! < 4) {
      setErrorMessage('A senha precisa ter ao menos 4 dígitos')
      setError(true)
    }
    else {
      setError(false)
    }
  }

  const handleSubmit = useCallback(() => {

    if (!error) {
      mutate()
    }
  }, [error, mutate])

  return (
    <>
      <Card className="mt-10 w-[80%] sm:w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg">
            Altere senha
          </CardTitle>
        </CardHeader>
        <CardContent >
          <form onSubmit={ev => ev.preventDefault()} className="grid gap-4" action="">
            <div className="relative">
              <Input ref={passwordRef} required
                type={showPassword ? "text" : "password"}
                onChange={handleComparePasswords}
                placeholder="Nova senha" />
              <VisibilityButton visibility={showPassword} onClick={visibility => setShowPassword(visibility!)} />
            </div>
            <div className="relative">
              <Input ref={repeatPasswordRef} required
                type={showRepeatPassword ? "text" : "password"}
                onChange={handleComparePasswords}
                placeholder="Confirme sua nova senha" />
              <VisibilityButton visibility={showRepeatPassword} onClick={visibility => setShowRepeatPassword(visibility!)} />
            </div>

            <div className={`flex gap-2 text-orange-500 justify-center ${error ? 'opacity-100' : 'opacity-0'} transition-all duration-${delay} ease-linear`}>
              <span className="material-symbols-outlined">warning</span>
              <span className="italic">
                Dica: {errorMessage}
              </span>
            </div>

            <Button onClick={handleSubmit} className="bg-pmsf" type="submit">Salvar</Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}