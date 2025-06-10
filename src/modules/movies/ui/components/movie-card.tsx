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

  return (
    <div className={cardClassName}>
      <img src={movie.thumbnail} alt={movie.title} className={styles.image} />
    </div>
  );
}
