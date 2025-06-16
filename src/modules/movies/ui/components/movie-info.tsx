"use client";

import axios from "axios";
import { useState, useTransition } from "react";

import { handleAppError } from "@/shared/errors/handle-app-error";
import { showToastLib } from "@/shared/ui/utils/toast";
import { Movie } from "../../domain/Movie";
import { Rating } from "./rating";

import styles from "./movie-info.module.css";

interface MovieInfoProps {
  movie: Movie;
  isInUserList: boolean;
}

export function MovieInfo({ movie, isInUserList }: MovieInfoProps) {
  const [inList, setInList] = useState(isInUserList);
  const [isPending, startTransition] = useTransition();

  const toggleList = () => {
    startTransition(async () => {
      try {
        if (inList) {
          await axios.delete(`/api/films/user/list/${movie.id}`, {
            method: "DELETE",
          });
          setInList(false);
          showToastLib.success(`Removed ${movie.title} from your list`, {
            duration: 3000,
            position: "top-center",
            transition: "bounceIn",
          });
        } else {
          await axios.post(`/api/films/user/list`);
          setInList(true);
          showToastLib.success(`Added ${movie.title} to your list`, {
            duration: 3000,
            position: "top-center",
            transition: "bounceIn",
          });
        }
      } catch (error) {
        showToastLib.error("Something went wrong. Try again later", {
          duration: 4000,
          position: "top-center",
        });
        handleAppError(error);
      }
    });
  };

  return (
    <section className={styles.section}>
      <section className={styles.myList}>
        <button
          onClick={toggleList}
          className={styles.listButton}
          disabled={isPending}
        >
          <span className={styles.icon}>{inList ? "★" : "+"}</span>
          <span className={styles.text}>
            {inList ? "Remove from my list" : "Add to my list"}
          </span>
        </button>
      </section>

      <section className={styles.meta}>
        <Rating rating={movie.rating} />
        <p>
          <strong>Cast:</strong> {movie.cast}
        </p>
        <p>
          <strong>Genre:</strong> {movie.genre}
        </p>
      </section>

      <section className={styles.description}>
        <h1 className={styles.title}>{movie.title.toLocaleUpperCase()}</h1>
        <p className={styles.textDescription}>{movie.description}</p>
      </section>
    </section>
  );
}
