"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import checkIfIsMobile from "../../../utils/checkIfIsMobile";
import CloseIcon from "../icons/CloseIcon";
import ListIcon from "../icons/ListIcon";
import LogoIcon from "../icons/Logo";
import SidebarIcon from "../icons/SidebarIcon";
import Button from "../button";
import { doLogout } from "../../../utils/doLogout";

const navLinks: {
  name: string;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    name: "Todos Hábitos",
    href: "/dashboard",
    icon: <ListIcon />
  }
  // TODO: Implementar a página de estatísticas
  // {
  //   name: "Estatísticas",
  //   href: "/dashboard/statistics",
  //   icon: <StatisticsIcon />
  // }
];

export default function Sidebar({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(checkIfIsMobile());
  }, []);

  return (
    <div className="z-10">
      <div
        data-testid="sidebar"
        style={{
          visibility: (isOpen || !isMobile) && mounted ? "visible" : "hidden"
        }}
        className={`
        ${className ?? ""}
        fixed z-10 lg:z-0 lg:relative flex h-dvh
        w-dvw lg:w-[280px]
        lg:border-r-2
        flex-col bg-white p-4
    `}
      >
        <div className="flex items-center pr-8 relative">
          <Link href="/dashboard" className="flex items-center gap-4">
            <LogoIcon />
            <h1 className="font-montserrat font-semibold ">
              Owl Habit Tracker
            </h1>
          </Link>
          {isMobile && (
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-0"
              aria-label="Fechar sidebar"
            >
              <CloseIcon />
            </button>
          )}
        </div>
        <nav className="mt-8">
          <ul>
            {navLinks.map(link => (
              <li key={link.name} className="py-2">
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                      rounded-lg
                      flex items-center gap-4
                      font-montserrat
                      ${isMobile ? "text-2xl" : "text-lg"}
                      ${isMobile ? "p-4" : "p-2"}
                      hover:bg-gray-100
                    `}
                >
                  <span className="text-primary">{link.icon}</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button buttonType="SECONDARY" className="mt-auto" onClick={doLogout}>
          Sair
        </Button>
      </div>
      <button
        className={`
          ${isOpen ? "hidden" : ""}
          lg:hidden size-12 
          flex items-center justify-center
          bg-primary rounded-lg 
          fixed bottom-4 right-4
        `}
        onClick={() => setIsOpen(true)}
        aria-label="Abrir sidebar"
      >
        <SidebarIcon />
      </button>
    </div>
  );
}
