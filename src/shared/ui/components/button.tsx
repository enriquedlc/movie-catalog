import React, { PropsWithChildren } from "react";

import styles from "./button.module.css";

interface CustomButtonProps {
  onClick?: () => void;
  className?: string;
  type?: "primary" | "secondary" | "tertiary";
}

export function CustomButton({
  onClick,
  className = "",
  type = "primary",
  children,
}: PropsWithChildren<CustomButtonProps>) {
  const typeClass = styles[type] || "";
  const buttonClass = `${styles.button} ${typeClass} ${className}`.trim();

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}
