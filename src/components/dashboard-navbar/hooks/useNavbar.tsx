import { callAlert } from "@/components/custom-alert";
import { useAuthStore } from "@/hooks/useAuthStore";

export const useNavbar = () => {
  const { logOut } = useAuthStore();
  const handleLogout = () => {
    callAlert({
      type: "question",
      title: "Log Out",
      message: "Are you sure want to log out ?",
      onConfirm(result) {
        if (result.isConfirmed) {
          logOut();
        }
      },
    });
  };

  return {
    handleLogout,
  };
};
