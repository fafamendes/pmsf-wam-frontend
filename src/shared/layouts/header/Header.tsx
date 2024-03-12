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

  return (
    <div className='w-full justify-between flex bg-pmsf py-1 px-4 md:px-16 md:py-2'>
      <img src="/simoes-filho.png" alt="pmsf" className='w-16' />
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Olá {user?.name}</NavigationMenuTrigger>
            <NavigationMenuContent className='w-[100%]'>
              <ul className='gap-2 flex flex-col min-w-[120px]'>
                <li>
                  <NavigationMenuLink onClick={() => logout()}
                    style={{ width: '100%' }}
                    className={`${navigationMenuTriggerStyle()} cursor-pointer justify-between`}>
                    <span className="material-symbols-outlined">
                      logout
                    </span>
                    <span>Sair</span>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}