export default function SkipLink() {
  return (
    <a
      href="#conteudo"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("conteudo")?.focus();
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-semibold focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white"
    >
      Pular para o conteúdo
    </a>
  );
}
