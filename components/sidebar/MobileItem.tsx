"use client";

import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface MobileItemProps {
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
  label: string;
}

const MobileItem: React.FC<MobileItemProps> = ({
  icon: Icon,
  active,
  href,
  label,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `
        group
        flex gap-x-3 justify-center
        p-3
        w-full
        text-sm leading-6 font-bold
        text-neutral-300
        hover:text-neutral-100
        bg-neutral-900 hover:bg-neutral-700
        transition-all
      `,
        active && " bg-blue-800 hover:bg-blue-700 text-neutral-100"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
