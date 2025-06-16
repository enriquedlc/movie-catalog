"use client";

import { Genre } from "@/modules/movies/domain/Genre";
import { CustomButton } from "@/shared/ui/components/button";

import styles from "./category-selector.module.css";

interface CategorySelectorProps {
  genres: Genre[];
  selectedGenreId: string;
  handleGenreChange: (id: string) => void;
}

export function CategorySelector({
  genres,
  selectedGenreId,
  handleGenreChange,
}: CategorySelectorProps) {
  const isSelected = (id: string) => selectedGenreId === id;

  return (
    <div className={styles.categorySelector}>
      <CustomButton
        color="tertiary"
        className={isSelected("") ? styles.selectedButton : ""}
        onClick={() => handleGenreChange("")}
      >
        All
      </CustomButton>

      {genres.map((genre) => (
        <CustomButton
          key={genre.id}
          color="tertiary"
          className={isSelected(genre.id) ? styles.selectedButton : ""}
          onClick={() => handleGenreChange(genre.id)}
        >
          {genre.name}
        </CustomButton>
      ))}
    </div>
  );
}
