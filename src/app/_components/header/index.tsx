import { ComponentProps } from "react";
import Button from "../button";
import LogoIcon from "../icons/Logo";

const Header = () => {
  const navLinks: ComponentProps<typeof Button>[] = [
    { as: "a", content: "Entrar", href: "/login" },
    {
      as: "a",
      content: "Registrar",
      href: "/register",
      buttonType: "SECONDARY"
    }
  ];

  return (
    <header className="sticky top-0 border-b-1 border-primary">
      <div className="flex flex-wrap gap-4 py-4 px-5 container items-center justify-between">
        <div className="flex items-center space-x-4">
          <LogoIcon />
          <h1 className="font-montserrat font-semibold ">Owl Habit Tracker</h1>
        </div>
        <nav className="max-[550]:w-full">
          <ul className="flex gap-4">
            {navLinks.map((link, index) => (
                <li key={index} className="flex-1">
                <Button {...link} className="w-full" />
                </li>
            ))}
          </ul>
        </nav>
      </div>{" "}
    </header>
  );
};

export default Header;
