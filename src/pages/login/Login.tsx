
import { useCallback, useEffect, useRef, useState } from 'react';


import { login } from '@services/login';
import { useTokenContext } from '@context/TokenContext';

import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@context/UserContext';


export const Login = () => {

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { setToken, token } = useTokenContext();
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    !!token && navigate('/');
  }, [token, navigate])

  const handleLogin = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = usernameInputRef.current?.value;
    const password = passwordInputRef.current?.value;


    if (username && password) {
      const response = await login(username, password);
      const token = response?.token;
      const user = response?.user;
      if (!token) {
        setLoginError(response.message);
        return;
      };
      setToken(token);
      setUser(user);
    }

  }, [setToken, setUser]);

  const removeError = () => {
    setLoginError(null);
  }

  return (
    <div className='flex flex-col items-center h-screen w-screen bg-[#184742] select-none gap-4 pt-[10vh]'>
      <img className='uxs:w-[100px] sm:w-[120px] md:w-[180px]' src="/simoes-filho.png" alt="PMSF" />
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
                className="material-symbols-outlined absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[#333]">
                {showPassword ? 'visibility' : 'visibility_off'}
              </span>
            </div>
            <p className='text-red-500 text-center'>{loginError}</p>
            <Button variant={'default'} className='bg-[#2c6c5c] hover:bg-[#2c6c5c]/90 w-[auto]'>Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}