"use client";

import { Footer } from "@/shared/ui/components/footer";
import { useState } from "react";
import { Movie } from "../../domain/Movie";
import styles from "./movie-detail.module.css";
import { MovieHero } from "./movie-hero";

interface MovieDetailProps {
  movie: Movie;
}

export function MovieDetail({ movie }: MovieDetailProps) {
  const [inList, setInList] = useState(false);

  const toggleList = () => setInList((prev) => !prev);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={styles.star}>
        {i < rating ? "★" : "☆"}
      </span>
    ));
  };

  return (
    <main className={styles.container}>
      {/* Hero */}
      <MovieHero movies={[movie]} carrousel={false} />
      <div className={styles.section}>
        {/* My List Button */}
        <div className={styles.myList}>
          <button onClick={toggleList} className={styles.listButton}>
            <span className={styles.icon}>{inList ? "★" : "+"}</span>
            <span className={styles.text}>
              {inList ? "Remove from my list" : "Add to my list"}
            </span>
          </button>
        </div>

        <div className={styles.meta}>
          <p className={styles.metaStars}>
            <strong>Rating:</strong> {renderStars(movie.rating)}
          </p>
          <p>
            <strong>Cast:</strong> {movie.cast}
          </p>
          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>
        </div>

        <section className={styles.description}>
          <h1 className={styles.title}>{movie.title.toLocaleUpperCase()}</h1>
          <p className={styles.text}>{movie.description}</p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
