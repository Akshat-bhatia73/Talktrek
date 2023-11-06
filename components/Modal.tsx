"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { RiCloseLine } from "react-icons/ri";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacit-100 scale-100"
          leaveTo="opacity-0 scale-50"
        >
          <div
            className="
              fixed inset-0
              bg-neutral-700 bg-opacity-60 backdrop-blur-sm
              transition-opacity
            "
          />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="
            flex items-center justify-center
            min-h-full
            p-4 sm:p-0
            text-center
          "
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-400"
              enterFrom="opacity-0 translate-y-4 scale-50 sm:translate-y-0 sm:scale-70"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-4 scale-50 sm:translate-y-0 sm:scale-70"
            >
              <Dialog.Panel
                className="
                relative
                transform overflow-hidden
                bg-neutral-800
                px-4 pb-4 sm:p-6
                text-left 
                rounded-xl 
                shadow-xl
                w-full sm:max-w-lg
                sm:my-8
                transition-all
              "
              >
                <div
                  className="
                  absolute right-0 top-0 
                  hidden sm:block 
                  pr-4 pt-4 
                  z-10
                "
                >
                  <button
                    type="button"
                    className="
                    z-[70]
                    rounded-xl
                    p-1
                    bg-neutral-700
                    text-neutral-300
                    hover:text-neutral-100 hover:rounded-md
                    focus:outline-none
                    transition-all
                  "
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <RiCloseLine size={25} />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
