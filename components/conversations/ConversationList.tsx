"use client";

import useConversation from "@/hooks/useConversation";
import { FullConversationType } from "@/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
  initialItems: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
}) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();
  return (
    <aside
      className={clsx(
        `
        fixed
        inset-y-0
        pb-20 lg:pb-0
        lg:left-20
        lg:w-80
        overflow-y-auto
        lg:block w-full left-0
        `,
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5">
        <div className="flex justify-between items-center mb-4 pt-4">
          <div className=" text-2xl font-bold text-neutral-200">Messages</div>
          <div
            className="
              cursor-pointer
              rounded-xl hover:rounded-md
              p-2
              bg-neutral-800 hover:bg-neutral-700
              text-neutral-100
              transition-all
            "
          >
            <MdOutlineGroupAdd size={25} />
          </div>
        </div>
        {items.map((item) => {
          return (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default ConversationList;
