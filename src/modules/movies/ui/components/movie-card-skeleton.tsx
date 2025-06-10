import styles from "./movie-card.module.css";

interface Props {
  orientation?: "vertical" | "horizontal";
}

export function MovieCardSkeleton({ orientation = "vertical" }: Props) {
  const cardClassName = `${styles.card} ${
    orientation === "horizontal" ? styles.horizontal : styles.vertical
  } ${styles.skeleton}`;

  return <div className={cardClassName}></div>;
}
