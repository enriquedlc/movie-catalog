import { Movie } from "@/modules/movies/domain/Movie";
import { createMovieRepositoryApi } from "@/modules/movies/infrastructure/movie-repository-api";
import { createTokenRepositoryCookies } from "@/shared/token/infrastructure/token-repository-cookies";
import styles from "./movies-page.module.css";

export default async function MoviesPage() {
  const tokenRepository = createTokenRepositoryCookies();
  const movieRepository = createMovieRepositoryApi(tokenRepository);

  const movies: Movie[] = await movieRepository.get();

  const moviesByGenre = movies.reduce<Record<string, Movie[]>>((acc, movie) => {
    const genre = movie.genre || "Otros";
    acc[genre] = acc[genre] || [];
    acc[genre].push(movie);
    return acc;
  }, {});

  return (
    <main className={styles.container}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>THE LAST OF US</h1>
          <p className={styles.heroDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            viverra lacus quam, in molestie dolor.
          </p>
          <button className={styles.heroButton}>Discover</button>
        </div>
      </section>

      {/* CATEGORY SELECTOR (placeholder) */}
      <div className={styles.categorySelector}>
        <button>Comedy</button>
        <button>Drama</button>
        <button>Thrillers</button>
      </div>

      {/* MOVIES BY GENRE */}
      {Object.entries(moviesByGenre).map(([genre, movies]) => (
        <section key={genre} className={styles.genreSection}>
          <h2 className={styles.genreTitle}>{genre}</h2>
          <div className={styles.horizontalScroll}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {/* use Image from nextjs */}
        <img src={movie.thumbnail} alt={movie.title} className={styles.image} />
      </div>
      <div className={styles.cardTitle}>{movie.title}</div>
    </div>
  );
}
