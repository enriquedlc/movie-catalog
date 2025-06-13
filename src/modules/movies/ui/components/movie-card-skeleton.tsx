import styles from "./movie-card.module.css";

interface MovieCardSkeletonProps {
  orientation?: "vertical" | "horizontal";
}

export function MovieCardSkeleton({
  orientation = "vertical",
}: MovieCardSkeletonProps) {
  const cardClassName = `${styles.card} ${
    orientation === "horizontal" ? styles.horizontal : styles.vertical
  } ${styles.skeleton}`;

  return (
    <div className={cardClassName}>
      <div className={styles.imagePlaceholder} />
    </div>
  );
}
