import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const TITLES: Record<string, string> = {
  "/": "Descobrir",
  "/matches": "Meus Matches",
  "/cadastrar": "Cadastrar pet",
  "/login": "Entrar",
  "/criar-conta": "Criar conta",
  "/redefinir-senha": "Redefinir senha",
};

export default function RouteFocus() {
  const { pathname } = useLocation();
  const last = useRef<string | null>(null);

  useEffect(() => {
    const title = TITLES[pathname];
    document.title = title ? `${title} | Match Pet` : "Match Pet";

    if (last.current === null || last.current === pathname) {
      last.current = pathname;
      return;
    }
    last.current = pathname;

    const heading = document.querySelector<HTMLElement>("main h1");
    const target = heading ?? document.getElementById("conteudo");
    if (!target) return;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus();
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
}
