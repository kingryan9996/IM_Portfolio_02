import styles from "@/style/components/common/input.module.scss";

interface InputType {
  autoFocus?: boolean;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}
export default function Input({
  autoFocus,
  value,
  placeholder,
  onChange,
}: InputType) {
  return (
    <input
      autoFocus={autoFocus}
      value={value}
      placeholder={placeholder}
      className={styles.Input}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}
