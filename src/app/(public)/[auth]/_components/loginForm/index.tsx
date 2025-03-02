"use client";

import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useState } from "react";
import { z } from "zod";
import {
  useLoginMutation,
  useRegisterMutation
} from "../../../../../redux/services/auth";
import { openModal } from "../../../../../redux/slices/modalSlice";
import Button from "../../../../_components/button";
import Input from "../../../../_components/input";
import { errorModalTexts, loginErrorMessages } from "./errorMessages";
import { useAppDispatch } from "../../../../../redux/storeHooks";

const loginSchema = z.object({
  username: z.string().nonempty(loginErrorMessages.EMPTY_USER),
  password: z.string().nonempty(loginErrorMessages.EMPTY_PASS)
});

const registrationSchema = z.object({
  email: z.string().email(loginErrorMessages.INVALID_EMAIL),
  username: z.string().min(3, loginErrorMessages.INVALID_USER),
  password: z.string().min(6, loginErrorMessages.INVALID_PASS)
});

export default function LoginForm({ isLogin }: { isLogin: boolean }) {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentPage = isLogin ? "Entrar" : "Registrar";

  const openErrorModal = (isUnauthorized: boolean) => {
    dispatch(
      openModal({
        ...(isUnauthorized
          ? errorModalTexts.UNAUTHORIZED
          : errorModalTexts.GENERIC)
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    let response;
    try {
      if (isLogin) {
        loginSchema.parse({ username, password });
        response = await login({ username, password });
      } else {
        registrationSchema.parse({ email, username, password });
        response = await register({ username, password, email });
      }

      if (!response.data?.access_token) {
        openErrorModal((response.error as { status: number })?.status === 401);
        return;
      }
      setCookie(null, "token", response.data.access_token);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(
          error.errors.reduce(
            (acc, err) => ({ ...acc, [err.path.join(".")]: err.message }),
            {}
          )
        );
      }
    }
  };

  return (
    <form role="form" onSubmit={handleSubmit} className="flex flex-col gap-4">
      {!isLogin ? (
        <Input
          type="text"
          placeholder="Seu melhor email"
          value={email}
          errorMessage={errors.email}
          onChange={e => setEmail(e.target.value)}
        />
      ) : null}
      <Input
        type="text"
        value={username}
        placeholder="Nome de usuário"
        errorMessage={errors.username}
        onChange={e => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Digite sua senha"
        value={password}
        errorMessage={errors.password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button type="submit" content={currentPage} className="w-full" />
    </form>
  );
}
