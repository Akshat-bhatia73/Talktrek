"use client";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { RiGithubFill } from "react-icons/ri";
import AuthSocialButton from "./AuthSocialButton";
import Button from "./Button";
import Input from "./Input";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      // Axios Register
    } else if (variant === "LOGIN") {
      //Next Auth SignIn
    }

    setIsLoading(false);
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    // Next Auth Social Signin
    setIsLoading(false);
  };

  return (
    <div
      className="
        w-full
      "
    >
      <h2 className="mb-2 text-center font-bold text-lg tracking-tightest">
        {variant === "LOGIN" ? "Login" : "Register"}
      </h2>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        {variant === "REGISTER" && (
          <Input
            label="Name"
            id="name"
            placeholder="Enter your name"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
        )}
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="example@gmail.com"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="Enter your password"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
        <div className=" py-3">
          <Button
            type="button"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
          >
            {variant === "LOGIN" ? "Login" : "Register"}
          </Button>
        </div>
      </form>
      <div className="mt-4">
        <div className="relative">
          <div
            className="
                absolute inset-0
                flex items-center
              "
          >
            <div className="w-full border-t border-neutral-400" />
          </div>
          <div
            className="
                relative
                flex justify-center
                text-xs font-bold text-neutral-500
              "
          >
            <span className="bg-white px-2">Or continue with</span>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <AuthSocialButton
            disabled={isLoading}
            isLoading={isLoading}
            icon={RiGithubFill}
            onClick={() => socialAction("github")}
          />
          <AuthSocialButton
            disabled={isLoading}
            isLoading={isLoading}
            icon={FcGoogle}
            onClick={() => socialAction("google")}
          />
        </div>
        <div
          className="
          flex justify-center gap-2
          text-sm font-bold text-neutral-500
          mt-4
          px-2
        "
        >
          <div>
            {variant === "LOGIN"
              ? "New to Talktrek?"
              : "Already have an account?"}
          </div>
          <div
            onClick={toggleVariant}
            className="cursor-pointer text-blue-600 hover:text-blue-500 transition"
          >
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
