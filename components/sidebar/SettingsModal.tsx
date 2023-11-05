"use client";

import { User } from "@prisma/client";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

interface SettingsModalProps {
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  currentUser,
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-neutral-700/70 pb-12">
            <h2 className="text-base font-semibold leading-6 text-neutral-100">
              Profile
            </h2>
            <p className="mt-1 text-sm font-medium text-neutral-400">
              Edit your details.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                register={register}
                errors={errors}
                required
                darkMode={true}
                placeholder={currentUser.name || "Enter your name"}
              />
              <div>
                <label
                  htmlFor=""
                  className="w-fit text-sm font-medium leading-6 text-neutral-200"
                >
                  Profile Picture
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width="48"
                    height="48"
                    src={image || currentUser.image || "/images/user.png"}
                    alt="Photo"
                    className="rounded-xl hover:rounded-md transition-all"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="g8w4awuy"
                  >
                    <Button disabled={isLoading} type="button">
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div
            className="
              mt-6
              flex items-center justify-end
              gap-x-6
            "
          >
            <Button
              disabled={isLoading}
              type="button"
              className="bg-neutral-700 text-neutral-100 hover:bg-neutral-700 hover:opacity-75"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
