"use client";

import Avatar from "@/components/Avatar";
import Modal from "@/components/Modal";
import useOtherUser from "@/hooks/useOtherUser";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";
import { RiCloseLine, RiDeleteBin4Fill } from "react-icons/ri";
import ConfirmModal from "./ConfirmModal";

interface ProfileDrawerProps {
  data: Conversation & {
    users: User[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const otherUser = useOtherUser(data);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const status = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return "Active";
  }, [data]);
  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
        }}
      />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => {
            confirmOpen ? null : onClose();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-700/70 bg-opacity-60 backdrop-blur-sm" />
          </Transition.Child>
          <div
            className="
            fixed inset-0
            overflow-hidden
          "
          >
            <div
              className="
              absolute inset-0 
              overflow-hidden
            "
            >
              <div
                className="
                pointer-events-none
                fixed inset-y-0 right-0
                flex
                max-w-full
                pl-10
              "
              >
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel
                    className="
                      pointer-events-auto
                      w-screen max-w-sm
                    "
                  >
                    <div
                      className="
                        h-full
                        flex flex-col
                        overflow-y-scroll
                        bg-neutral-900 lg:bg-neutral-800
                        py-6
                        shadow-xl
                      "
                    >
                      <div className="px-4">
                        <div
                          className="
                            flex items-start justify-end
                          "
                        >
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="
                                  rounded-xl 
                                  p-1
                                  text-neutral-300
                                  bg-neutral-800 lg:bg-neutral-700 
                                  hover:rounded-md hover:text-neutral-100
                                  focus:outline-none 
                                  transition-all
                                "
                              onClick={onClose}
                            >
                              <span className="sr-only">Close Panel</span>
                              <RiCloseLine size={25} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        className="
                          relative
                          mt-6
                          flex-1
                          px-4
                        "
                      >
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            <Avatar user={otherUser} />
                          </div>
                          <div className="text-neutral-100">{title}</div>
                          <div className="text-sm text-neutral-400 font-light">
                            {status}
                          </div>
                          <div className="flex gap-10 my-8">
                            <div
                              onClick={() => {
                                setConfirmOpen(true);
                              }}
                              className="
                                flex gap-2 items-center
                                cursor-pointer
                                hover:opacity-80
                                text-neutral-100
                                bg-neutral-800 lg:bg-neutral-700
                                rounded-xl hover:rounded-md
                                px-3 py-2
                                transition-all
                              "
                            >
                              <div
                                className="
                                  text-red-400
                                "
                              >
                                <RiDeleteBin4Fill size={20} />
                              </div>
                              <div className="text-red-400 text-sm font-semibold">
                                Delete
                              </div>
                            </div>
                          </div>
                          <div
                            className="
                              w-full
                              pb-5 pt-5
                              sm:px-0
                              sm:pt-0
                            "
                          >
                            <dl className="space-y-8 sm:space-y-6 px-4">
                              {!data.isGroup && (
                                <div>
                                  <dt className="text-sm font-medium text-neutral-400 sm:w-40 sm:flex-shrink-0">
                                    Email
                                  </dt>
                                  <dd className="mt-1 text-sm text-neutral-100 sm:col-span-2">
                                    {otherUser.email}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <>
                                  <hr className="border-neutral-700/70 lg:border-neutral-600/70" />
                                  <div>
                                    <dt className="text-sm font-medium text-neutral-400 sm:w-40 sm:flex-shrink-0">
                                      Joined
                                    </dt>
                                    <dd className="mt-1 text-sm text-neutral-100 sm:col-span-2">
                                      <time dateTime={joinedDate}>
                                        {joinedDate}
                                      </time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;
