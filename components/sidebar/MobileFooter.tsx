"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  if (isOpen) {
    return null;
  }
  return (
    <div
      className="
        fixed bottom-0 lg:hidden
        flex items-center justify-between
        w-full
        z-40
        bg-neutral-900
        border-t-[1px]
        border-neutral-700/70
        text-neutral-100
        animate-fade-in
      "
    >
      {routes.map((item) => {
        return (
          <MobileItem
            key={item.label}
            label={item.label}
            href={item.href}
            icon={item.icon}
            onClick={item.onClick}
            active={item.active}
          />
        );
      })}
    </div>
  );
};

export default MobileFooter;
