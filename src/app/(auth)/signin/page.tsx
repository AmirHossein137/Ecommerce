"use client"

import React from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

type SignIn = {
  email: string;
  password: string;
};

const SignInPage = () => {

  const router = useRouter();
  const form = useForm<SignIn>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<SignIn> = async (data: SignIn) => {
    const { email, password } = data;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.ok) {
      toast.success("SignIn Success");
      router.push("/admin/dashboard");
    } else {
      console.log(result?.error);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-[450px] mx-auto flex flex-col gap-4 bg-white border border-gray-300 shadow-sm p-7 rounded-2xl">
        <span className="text-center font-bold text-lg text-slate-800">
          SignIn Form
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <Input
            type="email"
            label="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors && (
            <p className="text-rose-500 text-xs pt-2 mb-4">
              {errors?.email?.message}
            </p>
          )}
          <Input
            type="text"
            label="Password"
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 4,
                message: "Must be more than 4 characters",
              },
              maxLength: {
                value: 10,
                message: "It should be between 4 and 10 characters",
              },
            })}
          />
          {errors && (
            <p className="text-rose-500 text-xs pt-2 mb-4">
              {errors?.password?.message}
            </p>
          )}
          <Button
            type="submit"
            color="primary"
            className="text-white"
            size="lg"
          >
            SignIn
          </Button>
        </form>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            If you do not have an account?
          </span>
          <Link href="/signup" className="underline font-bold text-slate-700">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

