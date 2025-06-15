"use client";

import { useState } from "react";
import { Movie } from "../../domain/Movie";
import styles from "./movie-info.module.css";
import { Rating } from "./rating";

interface MovieInfoProps {
  movie: Movie;
}

export function MovieInfo({ movie }: MovieInfoProps) {
  const [inList, setInList] = useState(false);

  const toggleList = () => setInList((prev) => !prev);

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
        <Rating rating={movie.rating} />
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
