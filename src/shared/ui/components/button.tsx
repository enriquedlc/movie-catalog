import React, { PropsWithChildren } from "react";

import styles from "./button.module.css";
import Link from "next/link";

interface CustomButtonProps {
  onClick?: () => void;
  className?: string;
  color?: "primary" | "secondary" | "tertiary";
  type?: "button" | "link";
  href?: string;
  disabled?: boolean;
}

export function CustomButton({
  onClick,
  className = "",
  color = "primary",
  children,
  type = "button",
  href = "",
  disabled = false,
}: PropsWithChildren<CustomButtonProps>) {
  const typeClass = styles[color] || "";
  const buttonClass = `${styles.button} ${typeClass} ${className}`.trim();

  if (type === "link") {
    return (
      <Link href={href} className={buttonClass}>
        <button disabled={disabled} className={buttonClass}>
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button disabled={disabled} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}
