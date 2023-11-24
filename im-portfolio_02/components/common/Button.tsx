import styles from "@/style/components/common/button.module.scss";
import { WrapperType } from "@/types";

interface ButtonType extends WrapperType {
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonType) {
  return (
    <button onClick={onClick} className={styles.Button}>
      {children}
    </button>
  );
}
