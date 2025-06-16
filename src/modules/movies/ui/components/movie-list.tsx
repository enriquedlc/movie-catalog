import { Movie } from "../../domain/Movie";
import { MovieCard } from "./movie-card";
import { MovieCardSkeleton } from "./movie-card-skeleton";
import styles from "./movie-list.module.css";

interface MovieListProps {
  title: string;
  movies: Movie[];
  isLoading: boolean;
  orientation?: "vertical" | "horizontal";
}

export function MovieList({
  title,
  movies,
  isLoading,
  orientation = "vertical",
}: MovieListProps) {
  const shouldShowSkeletons = isLoading && movies.length === 0;

  return (
    <section className={styles.section}>
      <p className={styles.genreTitle}>{title}</p>
      <div className={styles.horizontalScroll}>
        {shouldShowSkeletons
          ? Array.from({ length: 20 }).map((_, i) => (
              <MovieCardSkeleton key={i} orientation={orientation} />
            ))
          : movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                orientation={orientation}
              />
            ))}
      </div>
    </section>
  );
}
