import styles from "@/style/components/common/modal.module.scss";
import Button from "./Button";
import { WrapperType } from "@/types";

const Dimmed = ({ children }: WrapperType) => {
  return <div className={styles.Dimmed}>{children}</div>;
};

interface ModalType extends WrapperType {
  label: string;
  closeModal: () => void;
  saveModal: () => void;
}
export default function Modal({
  label,
  children,
  closeModal,
  saveModal,
}: ModalType) {
  return (
    <Dimmed>
      <div className={styles.Modal}>
        <div className={styles.ModalHeader}>
          {label} <Button onClick={closeModal}>X</Button>
        </div>
        <div className={styles.ModalContent}>{children}</div>
        <div className={styles.ModalFooter}>
          <Button
            onClick={() => {
              saveModal();
              closeModal();
            }}
          >
            저장
          </Button>
        </div>
      </div>
    </Dimmed>
  );
}
