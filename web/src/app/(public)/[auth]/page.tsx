"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import LoginForm from "./_components/loginForm";

export default function LoginPage() {
  const params = useParams();
  const isLogin = params.auth === "entrar";
  const currentPage = isLogin ? "Entrar" : "Registrar";
  
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
      >
        {isLogin
          ? "Para criar uma conta clique aqui."
          : "Para entrar com uma conta existente clique aqui."}
      </Link>
    </section>
  );
}
