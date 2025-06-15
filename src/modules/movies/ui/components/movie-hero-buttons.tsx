import { CustomButton } from "@/shared/ui/components/button";

import styles from "./movie-hero-buttons.module.css";

export function MovieHeroButtons() {
  return (
    <div className={styles.actions}>
      <CustomButton color="secondary" className={styles.trailer}>
        Trailer
      </CustomButton>
      <CustomButton color="primary" className={styles.play}>
        Play
      </CustomButton>
    </div>
  );
}
