"use client";

import { Footer } from "@/shared/ui/components/footer";
import { Movie } from "../../domain/Movie";
import { MovieHero } from "./movie-hero";
import { MovieInfo } from "./movie-info";

import styles from "./movie-detail.module.css";

interface MovieDetailProps {
  movie: Movie;
  isInUserList: boolean;
}

export function MovieDetail({ movie, isInUserList }: MovieDetailProps) {
  return (
    <main className={styles.container}>
      <MovieHero movies={[movie]} carrousel={false} />
      <MovieInfo movie={movie} isInUserList={isInUserList} />
      <Footer />
    </main>
  );
}
