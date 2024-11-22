import { cn } from "@/lib/utils"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import NavigationLink from "./NavigationLink"
import DarkBtn from './DarkMode'
import Logout from "./Logout"

type Props = {
  user: any
}

export default function Header({
  user,
  ...props
}: Props) {
  return (
    <div className="w-full mb-5 border-b-2 border-primary-foreground">
      <div className="flex flex-row justify-between h-20 w-full ">
        <nav
          className={cn("flex items-center space-x-4 lg:space-x-10")}
          {...props}
        >
          <NavigationLink href="/">Dashboard</NavigationLink>
          <NavigationLink href="/bus">Buses</NavigationLink>
          <NavigationLink href='/stop'>Stops</NavigationLink>
          <NavigationLink href='/driver'>Drivers</NavigationLink>
          <NavigationLink href='/announcement'>Announcement</NavigationLink>
          <NavigationLink href='/notification'>Notifications</NavigationLink>
        </nav>
        <div className="flex items-center content-center flex-row  gap-x-6">
          <DarkBtn />
          <DropdownMenu >
            <DropdownMenuTrigger asChild>

              <div className="space-x-4 flex items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>{user.name}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Logout />
                </DropdownMenuItem>
              </DropdownMenuGroup>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}