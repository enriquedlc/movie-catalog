"use client";

import styles from "./movie-hero.module.css";
import { Movie } from "@/modules/movies/domain/Movie";
import { CustomImage } from "@/shared/ui/components/image";
import { useEffect, useState } from "react";

interface MovieHeroProps {
  movie: Movie;
  withDescription: boolean;
}

export function MovieHero({ movie, withDescription }: MovieHeroProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => {
      window.removeEventListener("resize", checkIsDesktop);
    };
  }, []);

  // TODO: refactor a otro componente
  const renderButtons = (
    <div className={styles.actions}>
      <button className={styles.trailer}>Trailer</button>
      <button className={styles.play}>Play</button>
    </div>
  );

  if (withDescription) {
    return (
      <section className={`${styles.hero} ${styles.heroPlain}`}>
        <CustomImage
          src={movie.poster}
          alt={movie.title}
          className={styles.image}
        />
        <div className={styles.overlay}>
          <h1 className={styles.title}>{movie.title.toUpperCase()}</h1>
          <p className={styles.description}>
            {movie.description || "Discover this story today."}
          </p>
          <button className={styles.button}>Discover</button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className={`${styles.hero} ${styles.heroPlain}`}>
        <CustomImage
          src={movie.poster}
          alt={movie.title}
          className={styles.image}
        />
        {isDesktop && renderButtons}
      </section>
      {!isDesktop && renderButtons}
    </>
  );
}
