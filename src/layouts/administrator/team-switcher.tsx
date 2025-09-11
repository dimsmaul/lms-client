import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SimpleDarkLogo, SimpleLightLogo } from "@/assets/logo";
import { useThemeStore } from "@/features/theme/hooks/useTheme";
import { useNavigate } from "react-router-dom";

export function TeamSwitcher() {
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer "
          onClick={() => navigate("/")}
        >
          <div className="bg-foreground text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <img
              src={theme !== "dark" ? SimpleDarkLogo : SimpleLightLogo}
              className="size-4"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Algeo</span>
            <span className="truncate text-xs"></span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
