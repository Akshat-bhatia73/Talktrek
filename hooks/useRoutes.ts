import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { RiChat3Line, RiLogoutBoxLine, RiGroupLine } from "react-icons/ri";

import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: RiChat3Line,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: RiGroupLine,
        active: pathname === "/users",
      },
      {
        label: "LogOut",
        href: "#",
        onClick: () => signOut(),
        icon: RiLogoutBoxLine,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
