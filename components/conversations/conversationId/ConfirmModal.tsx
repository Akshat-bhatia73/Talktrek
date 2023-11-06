"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import useConversation from "@/hooks/useConversation";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { RiAlertFill } from "react-icons/ri";

interface ConfirModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);
  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => setIsLoading(false));
  }, [conversationId, router, onClose]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 sm:p-0 sm:flex sm:items-start">
        <div
          className="
            mx-auto sm:mx-0
            flex flex-shrink-0 items-center justify-center
            h-12 w-12 sm:h-10 sm:w-10
            rounded-xl
            text-red-400
            bg-red-400/20
          "
        >
          <RiAlertFill size={25} />
        </div>
        <div
          className="
            mt-3 sm:ml-4 sm:mt-0
            text-center sm:text-left
          "
        >
          <Dialog.Title
            as="h3"
            className="text-base font-semibold text-neutral-100 leading-6"
          >
            Delete Conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm font-medium text-neutral-400">
              Are your sure you want to delete this conversation? This action
              cannot be reversed.
            </p>
          </div>
        </div>
      </div>
      <div
        className="
          mt-5 sm:mt-4
          flex justify-center sm:justify-end gap-2 space-y-0
        "
      >
        <Button type="button" danger disabled={isLoading} onClick={onDelete}>
          Delete
        </Button>
        <Button
          type="button"
          className="bg-neutral-700 text-neutral-100 hover:bg-neutral-700 hover:opacity-75"
          disabled={isLoading}
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
