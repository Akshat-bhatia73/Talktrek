"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import { RiSettings4Line } from "react-icons/ri";
import MobileItem from "./MobileItem";
import { useState } from "react";
import SettingsModal from "./SettingsModal";
import { User } from "@prisma/client";

const MobileFooter = ({ currentUser }: { currentUser: User }) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  if (isOpen) {
    return null;
  }
  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
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
        <div
          onClick={() => setSettingsOpen(true)}
          className="
            group
            cursor-pointer
            flex gap-x-3 justify-center
            p-3
            w-full
            text-sm leading-6 font-bold
            text-neutral-300
            hover:text-neutral-100
            bg-neutral-900 hover:bg-neutral-700
            transition-all

          "
        >
          <RiSettings4Line size={28} />
        </div>
      </div>
    </>
  );
};

export default MobileFooter;
