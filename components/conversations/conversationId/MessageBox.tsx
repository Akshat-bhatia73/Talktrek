"use client";

import Avatar from "@/components/Avatar";
import { FullMessageType } from "@/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { RiCheckDoubleLine } from "react-icons/ri";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ isLast, data }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-2", isOwn && "items-end");

  const message = clsx(
    "text-sm w-fit overflow-hidden font-semibold text-neutral-100 transition-all",
    isOwn ? "bg-blue-800" : "bg-neutral-800 lg:bg-neutral-700",
    data.image ? "rounded-xl hover:rounded-md p-0" : "rounded-xl py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-neutral-300">
            {data.sender.name}
          </div>
          <div className="text-xs text-neutral-400">
            {format(new Date(), "PP") === format(new Date(data.createdAt), "PP")
              ? format(new Date(data.createdAt), "p")
              : format(new Date(data.createdAt), "PP")}
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              alt="image"
              height="288"
              width="288"
              src={data.image}
              className="
              object-cover
              cursor-pointer
              hover:scale-110 
                  transition
                  translate
                  "
              onClick={() => setImageModalOpen(true)}
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="flex items-center gap-1 text-xs font-light text-neutral-400">
            <RiCheckDoubleLine size={14} /> {`${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
