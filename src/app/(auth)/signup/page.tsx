"use client";
import React from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Registered = {
  email: string;
  password: string;
};

const SignUp = () => {
  const form = useForm<Registered>();
  const { register, handleSubmit } = form;
  const router = useRouter()

  const onSubmit: SubmitHandler<Registered> = async (data) => {
    const { email, password } = data;
    const result = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const datas = await result.json();
    console.log(datas)
    if (result.status === 201) {
      toast.success("Account Created");
      router.push('/signin')
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-[450px] mx-auto flex flex-col gap-4 bg-white border border-gray-300 shadow-sm p-7 rounded-2xl">
        <span className="text-center font-bold text-lg text-slate-800">
          SignUp Form
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            type="email"
            label="Email"
            {...register("email", { required: "Email is required" })}
          />
          <Input
            type="text"
            label="Password"
            {...register("password", { required: "password is required" })}
          />
          <Button
            type="submit"
            color="primary"
            className="text-white"
            size="lg"
          >
            SignUp
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
