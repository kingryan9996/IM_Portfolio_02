import styles from "@/style/components/common/borderBox.module.scss";

interface BorderBoxProps {
  children: any;
  boxStyle: "square" | "circle";
  active?: boolean;
  propsClassName?: string;
  onClick?: () => void;
}
export const BorderBox = ({
  children,
  boxStyle,
  active,
  propsClassName,
  onClick,
}: BorderBoxProps) => {
  return (
    <div
      className={`${styles.BorderBox} ${styles[boxStyle]} ${
        propsClassName && propsClassName
      }
      } ${active && styles.active}`}
      onClick={typeof window !== "undefined" ? onClick : undefined}
    >
      {children}
    </div>
  );
};
