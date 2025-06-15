"use client";

import { Genre } from "@/modules/movies/domain/Genre";
import { CustomButton } from "@/shared/ui/components/button";
import styles from "./category-selector.module.css";

interface CategorySelectorProps {
  genres: Genre[];
  selectedGenreId: string;
  setSelectedGenreId: (id: string) => void;
}

export function CategorySelector({
  genres,
  selectedGenreId,
  setSelectedGenreId,
}: CategorySelectorProps) {
  return (
    <div className={styles.categorySelector}>
      <CustomButton
        color="tertiary"
        className={selectedGenreId === "" ? styles.selectedButton : ""}
        onClick={() => setSelectedGenreId("")}
      >
        All
      </CustomButton>

      {genres.map((genre) => (
        <CustomButton
          key={genre.id}
          color="tertiary"
          className={selectedGenreId === genre.id ? styles.selectedButton : ""}
          onClick={() => setSelectedGenreId(genre.id)}
        >
          {genre.name}
        </CustomButton>
      ))}
    </div>
  );
}
