"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./profile-photo.module.css";
import { CustomButton } from "./button";

interface ProfilePhotoProps {
  onSignOut: () => void;
}

export function ProfilePhoto({ onSignOut }: ProfilePhotoProps) {
  const [showButton, setShowButton] = useState(false);

  const toggleButton = () => setShowButton((prev) => !prev);

  return (
    <div className={styles.container}>
      <Image
        src="/profile.svg"
        alt="Profile"
        width={46}
        height={46}
        className={styles.avatar}
        onClick={toggleButton}
        style={{ cursor: "pointer" }}
      />
      {showButton && (
        <CustomButton type="primary" onClick={onSignOut}>
          Sign out
        </CustomButton>
      )}
    </div>
  );
}
