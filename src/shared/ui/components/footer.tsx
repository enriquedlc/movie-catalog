import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <ul className={styles.list}>
          <li className={styles.item}>Link 1</li>
          <li className={styles.item}>Link 2</li>
          <li className={styles.item}>Link 3</li>
          <li className={styles.item}>Link 4</li>
        </ul>
        <ul className={styles.list}>
          <li className={styles.item}>Link 5</li>
          <li className={styles.item}>Link 6</li>
        </ul>
        <ul className={styles.list}>
          <li className={styles.item}>Link 7</li>
        </ul>
        <ul className={styles.list}>
          <li className={styles.item}>Link 8</li>
        </ul>
      </div>
    </footer>
  );
}
