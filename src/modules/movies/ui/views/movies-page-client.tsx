"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import { Genre } from "@/modules/movies/domain/Genre";
import { Movie } from "@/modules/movies/domain/Movie";
import { MovieHero } from "@/modules/movies/ui/components/movie-hero";
import { MovieList } from "@/modules/movies/ui/components/movie-list";
import { Footer } from "@/shared/ui/components/footer";
import { CategorySelector } from "../components/category-selector";

import styles from "./movies-page.module.css";
import { handleAppError } from "@/shared/utils/handle-app-error";

interface MoviesPageClientProps {
  genres: Genre[];
  movies: Movie[];
}

export function MoviesPageClient({ genres, movies }: MoviesPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedGenreId, setSelectedGenreId] = useState(
    searchParams.get("genre") ?? ""
  );

  const [moviesByGenre, setMoviesByGenre] = useState<Record<string, Movie[]>>(
    {}
  );
  const [loadingGenre, setLoadingGenre] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [userMovies, setUserMovies] = useState<Movie[]>([]);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const paramFromUrl = searchParams.get("genre") ?? "";
    setSelectedGenreId(paramFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const response = await axios.get<string[]>("/api/films/user/list");
        const movieIds = response.data;
        const filtered = movies.filter((movie) => movieIds.includes(movie.id));
        setUserMovies(filtered);
      } catch (error) {
        handleAppError(error);
      }
    };

    fetchUserFavorites();
  }, [movies]);

  useEffect(() => {
    if (!selectedGenreId || moviesByGenre[selectedGenreId]) return;

    setInitialLoading(false);
    setLoadingGenre(true);

    fetch(`/api/films/genres/${selectedGenreId}/movies`)
      .then((res) => res.json())
      .then((data: Movie[]) =>
        setMoviesByGenre((prev) => ({
          ...prev,
          [selectedGenreId]: data,
        }))
      )
      .finally(() => setLoadingGenre(false));
  }, [selectedGenreId, moviesByGenre]);

  const handleGenreChange = (genreId: string) => {
    setSelectedGenreId(genreId);

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (genreId) {
        params.set("genre", genreId);
      } else {
        params.delete("genre");
      }

      router.replace(`/movies?${params.toString()}`, { scroll: false });
    });
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
      <MovieHero movies={highlightedMovies} carrousel />
      <section className={styles.container}>
        <CategorySelector
          genres={genres}
          selectedGenreId={selectedGenreId}
          handleGenreChange={handleGenreChange}
        />

        {selectedGenreId ? (
          <MovieList
            title={
              genres.find((g) => g.id === selectedGenreId)?.name || "Unknown"
            }
            movies={moviesByGenre[selectedGenreId] || []}
            isLoading={loadingGenre}
          />
        ) : (
          genres.map((genre) => (
            <MovieList
              key={genre.id}
              title={genre.name}
              movies={moviesGroupedByGenre[genre.id] || []}
              isLoading={initialLoading}
            />
          ))
        )}

        <MovieList
          title="Coming Soon"
          movies={movies}
          orientation="horizontal"
          isLoading={initialLoading}
        />

        <MovieList
          title="My List"
          movies={userMovies}
          orientation="vertical"
          isLoading={initialLoading}
        />
      </section>
      <Footer />
    </>
  );
}
