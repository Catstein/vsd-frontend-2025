"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function LoginContainer() {
  const loginForm = z.object({
    email: z.email("E-mail inválido"),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  });

  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginForm),
    mode: "all",
  });

  console.log("watch", watch());

  console.log("erro no email:", errors.email?.message);

  console.log("erro no password:", errors.password?.message);

  return (
    <div className="w-[25rem] h-[34.375rem]  flex flex-col gap-[1rem] p-9 justify-center">
      <Input
        id="email"
        title="E-mail"
        placeholder="E-mail"
        errorMessage={errors.email?.message}
        {...register("email")}
      />

      <Input
        id="password"
        title="Senha"
        placeholder="Senha"
        type="password"
        errorMessage={errors.password?.message}
        {...register("password")}
      />

      <Button>Entrar</Button>
    </div>
  );
}
