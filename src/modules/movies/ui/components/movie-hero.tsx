import Image from "next/image";
import styles from "./movie-hero.module.css";
import { Movie } from "@/modules/movies/domain/Movie";
import { CustomImage } from "@/shared/ui/components/image";

interface MovieHeroProps {
  movie: Movie;
  withDescription: boolean;
}

export function MovieHero({ movie, withDescription }: MovieHeroProps) {
  return (
    <>
      {withDescription ? (
        <section className={styles.hero}>
          <div className={styles.image}>
            <Image src={movie.poster} alt={movie.title} fill />
          </div>
          <CustomImage
            src={movie.poster}
            alt={movie.title}
            className={styles.image}
          />
          <div className={styles.overlay}>
            <h1 className={styles.title}>{movie.title.toUpperCase()}</h1>
            <p className={styles.description}>
              {movie.description || "Discover this story today."}
            </p>
            <button className={styles.button}>Discover</button>
          </div>
        </section>
      ) : (
        <section className={styles.hero}>
          <MovieHero movie={movie} withDescription={false} />

          <div className={styles.actions}>
            <button className={styles.trailer}>Trailer</button>
            <button className={styles.play}>Play</button>
          </div>
        </section>
      )}
    </>
  );
}
