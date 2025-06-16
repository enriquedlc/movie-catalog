"use client";

import { Genre } from "@/modules/movies/domain/Genre";
import { CustomButton } from "@/shared/ui/components/button";

import styles from "./category-selector.module.css";

interface CategorySelectorProps {
  genres: Genre[];
  selectedGenreId: string;
  handleGenreChange: (id: string) => void;
  isPending?: boolean;
}

export function CategorySelector({
  genres,
  selectedGenreId,
  handleGenreChange,
  isPending = false,
}: CategorySelectorProps) {
  return (
    <div className={styles.categorySelector}>
      <CustomButton
        color="tertiary"
        className={`${selectedGenreId === "" ? styles.selectedButton : ""}`}
        onClick={() => handleGenreChange("")}
        disabled={isPending}
      >
        All
      </CustomButton>

      {genres.map((genre) => (
        <CustomButton
          key={genre.id}
          color="tertiary"
          className={selectedGenreId === genre.id ? styles.selectedButton : ""}
          onClick={() => handleGenreChange(genre.id)}
          disabled={isPending}
        >
          {genre.name}
        </CustomButton>
      ))}
    </div>
  );
}
