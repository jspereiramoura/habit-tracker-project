"use client";

import { ComponentProps, useEffect, useState } from "react";
import Button from "../button";
import LogoIcon from "../icons/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname()
  const [mustShowRegisterLinks, setMustShowRegisterLinks] = useState(false);


  const navLinks: ComponentProps<typeof Button>[] = [
    { as: "a", content: "Entrar", href: "/entrar" },
    {
      as: "a",
      content: "Registrar",
      href: "/registrar",
      buttonType: "SECONDARY"
    }
  ];

  useEffect(() => {
    setMustShowRegisterLinks(pathname === "/");
  }, [pathname]);

  return (
    <header className="sticky top-0 border-b-1 border-primary">
      <div className="flex flex-wrap gap-4 py-4 px-5 container items-center justify-between">
        <Link className="flex items-center space-x-4" href="/">
          <LogoIcon />
          <h1 className="font-montserrat font-semibold ">Owl Habit Tracker</h1>
        </Link>
        {mustShowRegisterLinks && (
          <nav aria-label="Links de Autenticação" className="max-[550]:w-full">
            <ul className="flex gap-4">
              {navLinks.map((link, index) => (
                <li key={index} className="flex-1">
                  <Button
                    {...link}
                    className="w-full"
                    aria-label={`Navegar para tela de ${link.content}`}
                  />
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
