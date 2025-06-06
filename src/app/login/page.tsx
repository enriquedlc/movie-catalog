"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signInAction } from "@/modules/auth/actions/signInAction";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signInAction(email, password);
    if (result.success) {
      router.push("/movies");
    } else {
      // TODO: add a proper toast and error handling
      alert(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
