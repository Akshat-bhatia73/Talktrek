"use client";

import Avatar from "@/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { RiArrowLeftLine, RiMoreFill } from "react-icons/ri";
import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);
  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
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
          <Avatar user={otherUser} />
          <div className="flex flex-col">
            <div className="font-semibold text-sm xs:text-base">
              {conversation.name || otherUser.name}
            </div>
            <div className="font-light text-neutral-400 text-xs xs:text-sm">
              {statusText}
            </div>
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
          onClick={() => {}}
        >
          <RiMoreFill size={25} />
        </div>
      </div>
    </>
  );
};

export default Header;
