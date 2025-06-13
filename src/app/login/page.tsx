"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./login-page.module.css";
import { signInAction } from "@/modules/auth/entrypoints/sign-in";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signInAction(email, password);
    console.log({ result });
    if (!result.success) {
      alert(result.message);
      return;
    }
    router.push("/movies");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formBox}>
        <input
          className={styles.input}
          type="email"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}
