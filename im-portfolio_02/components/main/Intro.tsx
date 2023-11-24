import { ScrollTopType } from "@/types";
import styles from "@/style/components/main/intro.module.scss";

export default function Intro({ scrollTop }: ScrollTopType) {
  return (
    <section className={`${styles.intro} ${!scrollTop && styles.scrollDrag}`}>
      <div>
        <svg>
          <text x="50%" y="80%" textAnchor="middle">
            frontend
          </text>
        </svg>
        <svg>
          <text x="50%" y="80%" textAnchor="middle">
            im.sh
          </text>
        </svg>
      </div>
    </section>
  );
}
