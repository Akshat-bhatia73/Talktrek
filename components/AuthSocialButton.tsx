import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
  isLoading,
  disabled,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex justify-center
        w-full
        rounded-2xl
        bg-white
        px-4 py-2 
        text-neutral-900 
        border-2
        hover:rounded-md hover:bg-neutral-300/20
        transition-all
      "
    >
      {isLoading ? "Loading..." : <Icon size={25} />}
    </button>
  );
};

export default AuthSocialButton;
