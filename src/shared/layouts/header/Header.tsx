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
    <div className='w-full justify-end flex bg-[#2c6c5c] p-4'>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem >
            <NavigationMenuTrigger>Olá {user?.name}</NavigationMenuTrigger>
            <NavigationMenuContent className='w-[100%]'>
              <ul className='gap-2 flex flex-col min-w-[120px]'>
                <li>
                  <NavigationMenuLink onClick={() => logout()}
                    style={{width: '100%'}}
                    className={`${navigationMenuTriggerStyle()} cursor-pointer`}>Sair</NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}