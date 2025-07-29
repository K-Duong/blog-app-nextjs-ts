"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";

import styles from "./linkWrapper.module.css";

export default function LinkWrapper({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <Link
      className={
        (path === href && path !== '/') ? `${styles.link} ${styles.linkActive}` : `${styles.link}`
      }
      href={href}
    >
      {" "}
      {children}{" "}
    </Link>
  );
}
