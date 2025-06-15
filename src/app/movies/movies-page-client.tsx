"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Genre } from "@/modules/movies/domain/Genre";
import { Movie } from "@/modules/movies/domain/Movie";
import { MovieList } from "@/modules/movies/ui/components/movie-list";
import { MovieHero } from "@/modules/movies/ui/components/movie-hero";
import styles from "./movies-page.module.css";
import { Footer } from "@/shared/ui/components/footer";
import { CategorySelector } from "@/shared/ui/components/category-selector";

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

  const highlightedMovies = movies.filter((movie) => movie.highlighted);

  return (
    <>
      {/* HERO */}
      <MovieHero movies={highlightedMovies} carrousel />
      <section className={styles.container}>
        {/* CATEGORY SELECTOR */}
        <CategorySelector
          genres={genres}
          selectedGenreId={selectedGenreId}
          setSelectedGenreId={setSelectedGenreId}
        />

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
      </section>
      <Footer />
    </>
  );
}
