"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function LoginContainer() {
  const loginForm = z.object({
    email: z.email(),
    password: z.string().min(8),
  });

  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  console.log(watch());

  return (
    <div className="w-[25rem] h-[34.375rem]  flex flex-col gap-[1rem] p-9 justify-center">
      <Input
        id="email"
        title="E-mail"
        placeholder="E-mail"
        {...register("email")}
      />

      <Input
        id="password"
        title="Senha"
        placeholder="Senha"
        type="password"
        {...register("password")}
      />

      <Button>Entrar</Button>
    </div>
  );
}
