import styles from "./movie-hero.module.css";
import { Movie } from "@/modules/movies/domain/Movie";

interface Props {
  movie: Movie;
}

export function MovieHero({ movie }: Props) {
  return (
    <section className={styles.hero}>
      <img src={movie.thumbnail} alt={movie.title} className={styles.image} />
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
