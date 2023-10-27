import AuthForm from "@/components/AuthForm";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div
      className="
        bg-[url('../public/images/Background.png')]
        bg-auto bg-no-repeat bg-center
        bg-gradient
        h-full
        flex items-center justify-center
        px-3
        transition-all
        overflow-auto
      "
    >
      <div
        className="
          w-full max-w-sm
          rounded-lg
          bg-white 
          py-6 px-6
          shadow-xl
          transition-all
          border border-neutral-400/20
          gap-y-2
          flex flex-col items-center
          animate-pop
        "
      >
        <Logo />
        <AuthForm />
      </div>
    </div>
  );
}
