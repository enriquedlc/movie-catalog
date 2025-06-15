"use client";

import { signOutAction } from "@/modules/auth/entrypoints/sign-out";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Movie } from "@/modules/movies/domain/Movie";
import { CustomButton } from "@/shared/ui/components/button";
import { ProfilePhoto } from "@/shared/ui/components/profile-photo";

import Image from "next/image";
import { MovieHeroButtons } from "./movie-hero-buttons";
import styles from "./movie-hero.module.css";

interface MovieHeroProps {
  movies: Movie[];
  withDescription: boolean;
}

export function MovieHero({ movies, withDescription }: MovieHeroProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const currentMovie = movies[currentIndex] ?? movies[0];

  useEffect(() => {
    if (!withDescription) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [withDescription, movies.length]);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const handleSignOut = async () => {
    await signOutAction();
    router.push("/login");
  };

  if (withDescription) {
    return (
      <section className={`${styles.hero} ${styles.heroPlain}`}>
        <ProfilePhoto onSignOut={handleSignOut} />
        <Image
          src={currentMovie.poster}
          alt={currentMovie.title}
          fill
          className={styles.image}
        />
        <div className={styles.overlay}>
          <p className={styles.title}>{currentMovie.title.toUpperCase()}</p>
          <p className={styles.description}>
            {currentMovie.description || "Discover this story today."}
          </p>
          <CustomButton
            type="link"
            href={`/movies/${currentMovie.id}`}
            color="primary"
          >
            Discover
          </CustomButton>
        </div>

        <div className={styles.dots}>
          {movies.map((_, i) => (
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

  return (
    <>
      <section className={`${styles.hero} ${styles.heroPlain}`}>
        <ProfilePhoto onSignOut={handleSignOut} />
        <Image
          src={currentMovie.poster}
          alt={currentMovie.title}
          fill
          className={styles.image}
        />
        {isDesktop && <MovieHeroButtons />}
      </section>
      {!isDesktop && <MovieHeroButtons />}
    </>
  );
}
