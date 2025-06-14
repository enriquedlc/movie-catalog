"use client";

import { useState } from "react";
import { Footer } from "@/shared/ui/components/footer";
import { Movie } from "../../domain/Movie";
import styles from "./movie-detail.module.css";

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
      <section className={styles.hero}>
        <img
          className={styles.heroImage}
          src={movie.poster}
          alt={movie.title}
        />
        <div className={styles.actions}>
          <button className={styles.trailer}>Trailer</button>
          <button className={styles.play}>Play</button>
        </div>
      </section>

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
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.text}>{movie.description}</p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
