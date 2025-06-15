"use client";

import Link from "next/link";

import { CustomImage } from "@/shared/ui/components/image";
import { Movie } from "../../domain/Movie";

import styles from "./movie-card.module.css";

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
      <CustomImage src={src} alt={movie.title} className={styles.image} />
    </Link>
  );
}
