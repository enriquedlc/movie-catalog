import React, { PropsWithChildren } from "react";

import styles from "./button.module.css";
import Link from "next/link";

interface CustomButtonProps {
  onClick?: () => void;
  className?: string;
  color?: "primary" | "secondary" | "tertiary";
  type?: "button" | "link";
  href?: string;
}

export function CustomButton({
  onClick,
  className = "",
  color = "primary",
  children,
  type = "button",
  href = "",
}: PropsWithChildren<CustomButtonProps>) {
  const typeClass = styles[color] || "";
  const buttonClass = `${styles.button} ${typeClass} ${className}`.trim();

  if (type === "link") {
    return (
      <Link href={href} className={buttonClass}>
        <button className={buttonClass}>{children}</button>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}
