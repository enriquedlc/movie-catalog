"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/modules/auth/entrypoints/sign-out";

import { Movie } from "@/modules/movies/domain/Movie";
import { CustomImage } from "@/shared/ui/components/image";
import { ProfilePhoto } from "@/shared/ui/components/profile-photo";
import { CustomButton } from "@/shared/ui/components/button";

import styles from "./movie-hero.module.css";

interface MovieHeroProps {
  movie: Movie[];
  withDescription: boolean;
}

export function MovieHero({ movie, withDescription }: MovieHeroProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const currentMovie = movie[currentIndex] ?? movie[0];

  useEffect(() => {
    if (!withDescription) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movie.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [withDescription, movie.length]);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const renderButtons = (
    <div className={styles.actions}>
      <button className={styles.trailer}>Trailer</button>
      <button className={styles.play}>Play</button>
    </div>
  );

  const handleSignOut = async () => {
    await signOutAction();
    router.push("/login");
  };

  if (withDescription) {
    return (
      <section className={`${styles.hero} ${styles.heroPlain}`}>
        <ProfilePhoto onSignOut={handleSignOut} />

        <CustomImage
          src={currentMovie.poster}
          alt={currentMovie.title}
          className={styles.image}
        />

        <div className={styles.overlay}>
          <h1 className={styles.title}>{currentMovie.title.toUpperCase()}</h1>
          <p className={styles.description}>
            {currentMovie.description || "Discover this story today."}
          </p>
          <CustomButton type="primary">Discover</CustomButton>
        </div>

        <div className={styles.dots}>
          {movie.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${
                i === currentIndex ? styles.active : ""
              }`}
            />
          ))}
        </div>
      </section>
    );
  }

  // No withDescription: solo mostrar el primero
  return (
    <>
      <section className={`${styles.hero} ${styles.heroPlain}`}>
        <CustomImage
          src={movie[0].poster}
          alt={movie[0].title}
          className={styles.image}
        />
        {isDesktop && renderButtons}
      </section>
      {!isDesktop && renderButtons}
    </>
  );
}
