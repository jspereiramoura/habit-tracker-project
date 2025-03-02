"use client";
import { usePathname } from "next/navigation";
import Button from "./_components/button";
import NotFoundIcon from "./_components/icons/NotFoundIcon";
import Sidebar from "./_components/sidebar";

export default function NotFound() {
  const isDashboard = usePathname().startsWith("/dashboard");

  return (
    <section className="flex">
      { isDashboard && <Sidebar />}
      <div className="flex flex-grow flex-col items-center justify-center gap-4 h-dvh">
        <h1 className="text-2xl font-montserrat font-bold">
          Página não encontrada
        </h1>
        <NotFoundIcon className="max-w-[600]" />
        <Button
          as="a"
          content="Pagína Inicial"
          href={isDashboard ? "/dashboard" : "/"}
          className="max-w-[400] w-full mt-8"
        />
      </div>
    </section>
  );
}
