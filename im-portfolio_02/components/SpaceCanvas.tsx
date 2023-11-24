// "use client";
import styles from "@/style/components/spaceCanvas.module.scss";

export default function SpaceCanvas() {
  return (
    <div className={styles.SpaceCanvas}>
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />
    </div>
  );
}
