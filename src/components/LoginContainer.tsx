"use client";

import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function LoginContainer() {
  const router = useRouter();

  const loginForm = z.object({
    email: z.email("E-mail inválido"),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  });

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginForm),
    mode: "all",
  });

  const [userList, setUserList] = useState([]);

  async function verifyUserList() {
    const currentUserList = (await api.get("http://localhost:3000/users")) as {
      data: unknown[];
    };

    console.log("currentUserList", currentUserList);

    setUserList(currentUserList.data);
  }

  useEffect(() => {
    verifyUserList().then();
  }, []);

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

      <Button
        onClick={() => {
          handleSubmit((data) => {
            const userResult = userList.find(
              (currentUser) => currentUser.email === data.email
            );

            if (userResult !== undefined) {
              alert(
                "LOGIN REALIZADO COM SUCESSO. VOCE ESTÁ SENDO REDIRECIONADO"
              );

              router.push("/dashboard");
              return;
            }

            alert("o usuario não foi encontrado");
          })();
        }}
      >
        Entrar
      </Button>
    </div>
  );
}
