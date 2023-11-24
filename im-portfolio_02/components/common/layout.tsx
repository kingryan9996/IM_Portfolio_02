import styles from "@/style/components/common/layout.module.scss";
import { BorderBox } from "./BorderBox";

interface SectionLayoutProps {
  labelLeft?: React.ReactNode;
  label: string;
  children: React.ReactNode | string;
}

export const SectionLayout = ({
  labelLeft,
  label,
  children,
}: SectionLayoutProps) => {
  return (
    <div className={styles.SectionLayout}>
      <h4>
        {labelLeft && labelLeft}
        {label}
      </h4>
      <BorderBox boxStyle="square">{children}</BorderBox>
    </div>
  );
};
