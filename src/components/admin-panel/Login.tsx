import React from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";

type SignIn = {
  email: string;
  password: string;
};

const Login = () => {
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

  const onSubmit: SubmitHandler<SignIn> = (data: SignIn) => {
    console.log(data);
  };

  return (
    <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-[450px] mx-auto flex flex-col gap-4 bg-white border border-gray-300 shadow-sm p-7 rounded-2xl">
        <span className="text-center font-bold text-lg text-slate-800">
          SignIn Form
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Input
            type="email"
            label="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors && (
            <p className="text-rose-500 text-xs">{errors?.email?.message}</p>
          )}
          <Input
            type="text"
            label="Password"
            {...register("password", { required: "password is required" })}
          />
          {errors && (
            <p className="text-rose-500 text-xs">{errors?.password?.message}</p>
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
      </div>
    </div>
  );
};

export default Login;
