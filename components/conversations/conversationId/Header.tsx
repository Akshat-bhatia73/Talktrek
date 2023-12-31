"use client";

import Avatar from "@/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { RiArrowLeftLine, RiMoreFill } from "react-icons/ri";
import AvatarGroup from "../AvatarGroup";
import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      />
      <div
        className="
        w-full
        flex items-center justify-between
        border-b-[1px] border-neutral-700/70
        py-3 px-4
        shadow-sm
        transition
      "
      >
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="
            lg:hidden
            block
            p-1
            text-neutral-400
            hover:text-neutral-300
            transition-all
          "
          >
            <RiArrowLeftLine size={25} />
          </Link>

          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="font-semibold text-sm xs:text-lg">
            {conversation.name || otherUser.name}
          </div>
        </div>
        <div
          className="
          p-1 xs:p-2
          cursor-pointer 
          bg-neutral-800 hover:bg-neutral-700 
          rounded-xl hover:rounded-md 
          transition-all
        "
          onClick={() => {
            setDrawerOpen(true);
          }}
        >
          <RiMoreFill size={25} />
        </div>
      </div>
    </>
  );
};

export default Header;
