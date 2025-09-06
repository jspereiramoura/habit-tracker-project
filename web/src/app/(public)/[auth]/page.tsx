"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import LoginForm from "./_components/loginForm";
import { useRef } from "react";
import useTrackUserInteraction from "@/hooks/useTrackUserInteraction";

export default function LoginPage() {
  const params = useParams();
  const isLogin = params.auth === "entrar";
  const currentPage = isLogin ? "Entrar" : "Registrar";
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
   useTrackUserInteraction("click", (event) => {
    if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
      console.log(`${isLogin ? "Login" : "Register"} button clicked!`);
    }
  });

  return (
    <section
      aria-label={`Sessão de ${isLogin ? "Login" : "Registro"}`}
      className="flex flex-col mx-auto w-full max-w-[300px] md:max-w-[400px] text-center"
    >
      <h1 className="text-xl font-bold font-montserrat mb-4">{currentPage}</h1>
      <LoginForm isLogin={isLogin} />
      <Link
        href={isLogin ? "/registrar" : "/entrar"}
        className="w-full mt-1 text-sm text-gray-800 hover:underline"
        ref={buttonRef}
      >
        {isLogin
          ? "Para criar uma conta clique aqui."
          : "Para entrar com uma conta existente clique aqui."}
      </Link>
    </section>
  );
}
