"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { RiGithubFill } from "react-icons/ri";
import AuthSocialButton from "./AuthSocialButton";
import Button from "./Button";
import Input from "./Input";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingModal from "./LoadingModal";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/users");
    }
  }, [session.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      // Axios Register
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false));
    } else if (variant === "LOGIN") {
      //Next Auth SignIn
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          } else if (callback?.ok && !callback.error) {
            toast.success(`Welcome`);
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    // Next Auth Social Signin
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        } else if (callback?.ok && !callback?.error) {
          toast.success("Welcome");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && <LoadingModal />}
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
              type="submit"
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
    </>
  );
};

export default AuthForm;
