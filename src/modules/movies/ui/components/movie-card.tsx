"use client";

import { Movie } from "../../domain/Movie";
import styles from "./movie-card.module.css";
import Link from "next/link";

interface MovieCardProps {
  movie: Movie;
  orientation?: "vertical" | "horizontal";
}

export function MovieCard({ movie, orientation = "vertical" }: MovieCardProps) {
  const cardClassName = `${styles.card} ${
    orientation === "horizontal" ? styles.horizontal : styles.vertical
  }`;

  const src = orientation === "horizontal" ? movie.poster : movie.thumbnail;

  return (
    <Link href={`/movies/${movie.id}`} className={cardClassName}>
      <img src={src} alt={movie.title} className={styles.image} />
    </Link>
  );
}
