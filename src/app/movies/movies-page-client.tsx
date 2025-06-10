"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Genre } from "@/modules/movies/domain/Genre";
import { Movie } from "@/modules/movies/domain/Movie";
import { MovieList } from "@/modules/movies/ui/components/movie-list";
import styles from "./movies-page.module.css";

interface MoviesPageClientProps {
  genres: Genre[];
  movies: Movie[];
}

export default function MoviesPageClient({
  genres,
  movies,
}: MoviesPageClientProps) {
  const [selectedGenreId, setSelectedGenreId] = useState<string>("");
  const [moviesByGenre, setMoviesByGenre] = useState<Record<string, Movie[]>>(
    {}
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedGenreId) return;

    setLoading(true);
    axios
      .get(`/api/films/genres/${selectedGenreId}/movies`)
      .then((res) => {
        setMoviesByGenre((prev) => ({ ...prev, [selectedGenreId]: res.data }));
      })
      .finally(() => setLoading(false));
  }, [selectedGenreId]);

  const moviesGroupedByGenre = genres.reduce<Record<string, Movie[]>>(
    (acc, genre) => {
      acc[genre.id] = movies.filter((movie) => movie.genre === genre.id);
      return acc;
    },
    {}
  );

  return (
    <main className={styles.container}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>THE LAST OF US</h1>
          <p className={styles.heroDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button className={styles.heroButton}>Discover</button>
        </div>
      </section>

      {/* CATEGORY SELECTOR */}
      <div className={styles.categorySelector}>
        <button
          onClick={() => setSelectedGenreId("")}
          className={selectedGenreId === "" ? styles.selectedButton : undefined}
        >
          Todas
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenreId(genre.id)}
            className={
              selectedGenreId === genre.id ? styles.selectedButton : undefined
            }
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* MOVIES */}
      {selectedGenreId ? (
        <MovieList
          title={
            genres.find((g) => g.id === selectedGenreId)?.name || "Unknown"
          }
          movies={moviesByGenre[selectedGenreId] || []}
          isLoading={loading}
        />
      ) : (
        genres.map((genre) => (
          <MovieList
            key={genre.id}
            title={genre.name}
            movies={moviesGroupedByGenre[genre.id] || []}
            isLoading={false}
          />
        ))
      )}

      {/* COMING SOON */}
      <MovieList
        title="Coming Soon"
        movies={movies}
        orientation="horizontal"
        isLoading={false}
      />
    </main>
  );
}
