
import { useCallback, useEffect, useRef, useState } from 'react';


import { login } from '@services/login';
import { useTokenContext } from '@context/TokenContext';

import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@context/UserContext';
import { useMutation } from '@tanstack/react-query';


export const Login = () => {

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { setToken, token } = useTokenContext();
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: { username: string; password: string }) => {
      const response = await login(data.username, data.password);
      return response;
    },
    onSuccess: (data) => {
      if (data) {
        setToken(data.token);
        setUser(data.user);
      } else {
        setLoginError('Usuário ou senha inválidos');
      }
    },
    onError: (error) => {
      console.log(error)
      if (error instanceof Error) {
        setLoginError(error.message);
      }
    }
  })

  useEffect(() => {
    !!token && navigate('/');
  }, [token, navigate])



  const handleLogin = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = usernameInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    if (username && password) {
      mutate({ username, password });
    }

  }, [mutate]);

  const removeError = () => {
    setLoginError(null);
  }

  return (
    <div className='flex flex-col items-center h-screen w-screen bg-pmsf select-none gap-4 pt-[10vh]'>
      <img className='uxs:w-[100px] sm:w-[120px] md:w-[150px]' src="/simoes-filho.png" alt="PMSF" />
      <Card className='w-[80%] lg:w-[500px] sm:w-[350px] md:w-[400px]'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent >
          <form onSubmit={handleLogin} className='flex flex-col gap-6 items-center'>
            <Input onKeyDown={removeError} ref={usernameInputRef} required placeholder='Matrícula' />
            <div className='relative w-full'>
              <Input onKeyDown={removeError} ref={passwordInputRef} required type={showPassword ? 'text' : 'password'} placeholder='Senha' />
              <span onClick={() => setShowPassword(!showPassword)}
                className="material-symbols-outlined absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer text-[#333] rounded-full text-[1.3rem] p-1 hover:bg-gray-200">
                {showPassword ? 'visibility' : 'visibility_off'}
              </span>
            </div>
            <p className='text-red-500 text-center'>{loginError}</p>
            <Button variant={'default'} className='bg-pmsf hover:bg-pmsf/80 w-[auto]'>Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}