import styles from "./rating.module.css";

export function Rating({ rating }: { rating: number }) {
  return (
    <p className={styles.metaStars}>
      <strong>Rating:</strong>{" "}
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={styles.star}>
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </p>
  );
}
