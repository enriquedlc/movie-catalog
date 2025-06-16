"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Genre } from "@/modules/movies/domain/Genre";
import { Movie } from "@/modules/movies/domain/Movie";
import { MovieHero } from "@/modules/movies/ui/components/movie-hero";
import { MovieList } from "@/modules/movies/ui/components/movie-list";
import { Footer } from "@/shared/ui/components/footer";
import { CategorySelector } from "../components/category-selector";

import styles from "./movies-page.module.css";

interface MoviesPageClientProps {
  genres: Genre[];
  movies: Movie[];
}

export function MoviesPageClient({ genres, movies }: MoviesPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const genreIdFromUrl = searchParams.get("genre") ?? "";

  const [moviesByGenre, setMoviesByGenre] = useState<Record<string, Movie[]>>(
    {}
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!genreIdFromUrl || moviesByGenre[genreIdFromUrl]) return;

    setLoading(true);
    axios
      .get(`/api/films/genres/${genreIdFromUrl}/movies`)
      .then((res) =>
        setMoviesByGenre((prev) => ({
          ...prev,
          [genreIdFromUrl]: res.data,
        }))
      )
      .finally(() => setLoading(false));
  }, [genreIdFromUrl, moviesByGenre]);

  const handleGenreChange = (genreId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (genreId) {
      params.set("genre", genreId);
    } else {
      params.delete("genre");
    }

    router.replace(`/movies?${params.toString()}`);
  };

  const moviesGroupedByGenre = useMemo(
    () =>
      genres.reduce<Record<string, Movie[]>>((acc, genre) => {
        acc[genre.id] = movies.filter((movie) => movie.genre === genre.id);
        return acc;
      }, {}),
    [genres, movies]
  );

  const highlightedMovies = useMemo(
    () => movies.filter((movie) => movie.highlighted),
    [movies]
  );

  return (
    <>
      {/* HERO */}
      <MovieHero movies={highlightedMovies} carrousel />
      <section className={styles.container}>
        {/* CATEGORY SELECTOR */}
        <CategorySelector
          genres={genres}
          selectedGenreId={genreIdFromUrl}
          handleGenreChange={handleGenreChange}
        />

        {/* MOVIES */}
        {genreIdFromUrl ? (
          <MovieList
            title={
              genres.find((g) => g.id === genreIdFromUrl)?.name || "Unknown"
            }
            movies={moviesByGenre[genreIdFromUrl] || []}
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
