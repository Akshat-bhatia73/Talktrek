"use client";

import useRoutes from "@/hooks/useRoutes";
import { User } from "@prisma/client";
import { useState } from "react";
import { RiSettings4Line } from "react-icons/ri";
import Avatar from "../Avatar";
import DesktopItem from "./DesktopItem";
import SettingsModal from "./SettingsModal";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div
        className="
        hidden lg:fixed
        lg:inset-y-0 lg:left-0
        lg:z-40
        lg:w-20
        lg:pb-4 xl:px-6
        lg:overflow-y-auto
        lg:bg-neutral-900
        lg:border-r
        lg:border-neutral-700/70
        lg:flex lg:flex-col justify-between
        text-neutral-100
      "
      >
        <nav
          className="
          mt-4
          flex flex-col justify-between
        "
        >
          <ul
            role="list"
            className="
              flex flex-col items-center
              space-y-2
            "
          >
            {routes.map((item) => {
              return (
                <DesktopItem
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  active={item.active}
                  icon={item.icon}
                  onClick={item.onClick}
                />
              );
            })}
          </ul>
        </nav>
        <nav
          className="
          mt-4
          flex flex-col gap-2 justify-between items-center
        "
        >
          <div
            onClick={() => setIsOpen(true)}
            className="
            cursor-pointer
            p-2
            text-neutral-300
            hover:text-neutral-100
            bg-neutral-800 hover:bg-neutral-700
            rounded-2xl hover:rounded-md
            transition-all

          "
          >
            <RiSettings4Line size={30} />
          </div>
          <div
            className="
            cursor-pointer
            transition-all
          "
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
