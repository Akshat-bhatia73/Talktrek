"use client";

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  RiImage2Fill,
  RiImage2Line,
  RiImageAddLine,
  RiSendPlane2Fill,
} from "react-icons/ri";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId: conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId
    })
  }

  return (
    <div
      className="
        py-2 px-4
        border-t border-neutral-700/70
        flex items-center gap-2 lg:gap-4
        text-neutral-100
        w-full
      "
    >
      <CldUploadButton
        options={{maxFiles: 1}}
        onUpload={handleUpload}
        uploadPreset="g8w4awuy"
      >
        <div
          className="
            p-2 
            rounded-xl hover:rounded-md 
            cursor-pointer 
            bg-blue-800 hover:bg-blue-700 
            text-neutral-100 
            transition-all
          "
        >
          <RiImage2Fill size={20} />
        </div>
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message..."
        />
        <button
          type="submit"
          className="
            rounded-xl hover:rounded-md
            bg-blue-800 hover:bg-blue-700
            p-2
            transition-all
            text-neutral-100
          "
        >
          <RiSendPlane2Fill size={20} />
        </button>
      </form>
    </div>
  );
};

export default Form;
