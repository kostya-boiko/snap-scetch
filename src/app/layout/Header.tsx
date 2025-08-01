import BurgerMenu from "@/components/BurgerMenu/BurgerMenu";
import Navigation from "@/components/Navigation";
import MainButton from "@/components/ui/Buttons/MainButton";
import Logo from "@/components/ui/Logo";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useState } from "react";
import { COMMON_ROUTES_NAMES } from "../router/commonRoutesNames";
import { menu } from "./menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authSession = useAuthStore((state) => state.authSession);

  return (
    <header className="relative z-50">
      <div className="wrapper">
        <div className="flex flex-row justify-between items-center text-lg font-semibold h-[100px]">
          <Logo />
          <Navigation data={menu} className="hidden md:flex" />
          <MainButton
            content={authSession ? "Dashboard" : "Get Started"}
            to={COMMON_ROUTES_NAMES.Auth}
            className="hidden md:block"
          />
          <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} data={menu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
