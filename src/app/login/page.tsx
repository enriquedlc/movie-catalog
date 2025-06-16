"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { signInAction } from "@/modules/auth/entrypoints/sign-in";
import { showToastLib } from "@/shared/ui/utils/toast";

import styles from "./login-page.module.css";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signInAction(email, password);

      if (!result.success) {
        showToastLib.error("Invalid credentials.", {
          duration: 4000,
          position: "top-center",
          transition: "bounceIn",
        });
        return;
      }

      router.push("/movies");
    } catch (error) {
      showToastLib.error(`${(error as Error).message}`, {
        duration: 4000,
        position: "top-center",
        transition: "bounceIn",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formBox}>
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
