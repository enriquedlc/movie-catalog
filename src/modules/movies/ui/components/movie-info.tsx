"use client";

import { useState } from "react";
import { Movie } from "../../domain/Movie";
import styles from "./movie-info.module.css";

interface MovieInfoProps {
  movie: Movie;
}

export function MovieInfo({ movie }: MovieInfoProps) {
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
    <>
      <section className={styles.myList}>
        <button onClick={toggleList} className={styles.listButton}>
          <span className={styles.icon}>{inList ? "★" : "+"}</span>
          <span className={styles.text}>
            {inList ? "Remove from my list" : "Add to my list"}
          </span>
        </button>
      </section>

      <section className={styles.meta}>
        <p className={styles.metaStars}>
          <strong>Rating:</strong> {renderStars(movie.rating)}
        </p>
        <p>
          <strong>Cast:</strong> {movie.cast}
        </p>
        <p>
          <strong>Genre:</strong> {movie.genre}
        </p>
      </section>

      <section className={styles.description}>
        <h1 className={styles.title}>{movie.title.toLocaleUpperCase()}</h1>
        <p className={styles.textDescription}>{movie.description}</p>
      </section>
    </>
  );
}
