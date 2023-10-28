import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface DesktopItemProps {
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
  label: string;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  icon: Icon,
  onClick,
  href,
  active,
  label,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li
      onClick={handleClick}
      className="relative flex items-center justify-center animate-pop"
    >
      <Link
        href={href}
        className={clsx(
          `
          group
          flex gap-x-3 justify-center
          rounded-2xl
          p-3
          text-sm leading-6 font-bold
          text-neutral-300
          hover:text-neutral-100
          bg-neutral-800 hover:bg-neutral-700
          hover:rounded-md
          transition-all
        `,
          active && " bg-blue-800 hover:bg-blue-700 rounded-md text-neutral-100"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
