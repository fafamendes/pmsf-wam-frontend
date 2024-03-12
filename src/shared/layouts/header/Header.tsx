import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { useTokenContext } from '@context/TokenContext';

import { useUserContext } from '@context/UserContext'

export const Header = () => {

  const { user } = useUserContext();
  const { logout } = useTokenContext();

  const menuItems = [
    {
      label: 'Novo usuário',
      onClick: () => {
        console.log('Novo usuário')
      },
      icon: 'person_add',
    },
    {
      label: 'Sair',
      onClick: () => logout(),
      icon: 'logout',
    },
  ]

  return (
    <div className='w-full justify-between flex bg-pmsf py-1 px-4 md:px-16 md:py-2 align-center'>
      <img src="/simoes-filho.png" alt="pmsf" className='w-16' />
      <h1 className='hidden md:flex text-2xl text-white font-bold items-center'>SISTEMA DE CONTROLE DE ACESSO WI-FI</h1>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Olá {user?.name}</NavigationMenuTrigger>
            <NavigationMenuContent className='w-[100%]'>
              <ul className='gap-2 flex flex-col min-w-[120px]'>

                {
                  menuItems.map((item, index) =>
                    <li key={index} className='md:min-w-[160px]'>
                      <NavigationMenuLink key={index}
                        onClick={item.onClick}
                        style={{ width: '100%' }}
                        className={`${navigationMenuTriggerStyle()} cursor-pointer grid grid-cols-4`}>
                        <span className="material-symbols-outlined ">
                          {item.icon}
                        </span>
                        <span className="col-span-3">{item.label}</span>
                      </NavigationMenuLink>
                    </li>
                  )
                }
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}