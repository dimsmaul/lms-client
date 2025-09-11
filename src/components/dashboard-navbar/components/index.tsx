import ThemeToggleButton from "@/features/theme/components/theme-toggle";
import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { Bell } from "lucide-react";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useAuthStore } from "@/hooks/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavbar } from "../hooks/useNavbar";
import { cn } from "@/lib/utils";
import { DarkLogo, LightLogo } from "@/assets/logo";
import { useThemeStore } from "@/features/theme/hooks/useTheme";

export const NavbarMenu = [
  {
    name: "My Course",
    path: "/my-courses",
  },
  {
    name: "Course",
    path: "/courses",
  },
  {
    name: "Timeline",
    path: "/timeline",
  },
];

const DashboardNavbar = () => {
  const { theme } = useThemeStore();
  const location = useLocation();
  return (
    <div className="sticky top-0 z-40 bg-background">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b flex-row justify-between px-8">
        <div className="flex flex-row gap-8 items-center">
          <Link to={"/"} className="text-xl font-bold">
            <img
              src={theme === "dark" ? DarkLogo : LightLogo}
              alt=""
              className="size-24"
            />
            {/* Algeo */}
          </Link>
          <div className="flex flex-row items-center gap-4">
            {NavbarMenu.map((item) => (
              <Link
                to={item.path}
                key={item.name}
                className={cn(
                  location.pathname === item.path
                    ? "text-foreground"
                    : "text-foreground/50",
                  "hover:text-foreground transition-all duration-150 cursor-pointer"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-row gap-3 items-center">
          <ThemeToggleButton />
          <Button variant={"outline"} size={"icon"}>
            <Bell />
          </Button>
          <UserHeaderCard />
        </div>
      </header>
    </div>
  );
};

export default DashboardNavbar;

export const UserHeaderCard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { handleLogout } = useNavbar();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row items-center gap-3 cursor-pointer">
          <Avatar className="size-8">
            <AvatarImage src={user?.profile} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h6 className="font-semibold">Hi, {user?.firstName}</h6>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          {user?.isSuperAdmin && (
            <DropdownMenuItem onClick={() => navigate("/admin")}>
              Administrator Page
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
