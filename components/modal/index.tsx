"use client";

import { useRouter } from "next/navigation";

import styles from "./styles.module.css";

export default function Modal({
  children,
  isOpen,
  setIsOpenedModal,
  actions,
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpenedModal?: React.Dispatch<React.SetStateAction<boolean>>;
  actions?: React.ReactNode;
}) {
  const router = useRouter();
  if (isOpen === false) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={(e) => {
        e.stopPropagation();
        if (
          typeof isOpen === "boolean" &&
          typeof setIsOpenedModal === "function"
        ) {
          setIsOpenedModal(false);
        } else {
          router.back();
        }
      }}
    >
      <div
        className={styles.modalContent}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
        <div className={styles.modalActions}>{actions}</div>
      </div>
    </div>
  );
}
