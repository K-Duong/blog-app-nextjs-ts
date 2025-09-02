"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";

import styles from "./linkWrapper.module.css";

export default function LinkWrapper({
  href,
  children,
  classStyle,
}: {
  href: string;
  children: React.ReactNode;
  classStyle?: string
}) {
  const path = usePathname();
// console.log(classStyle)
  return (
    <Link
      className={ classStyle && classStyle.length > 0 && classStyle ||
       ( (path === href && path !== '/') ? `${styles.link} ${styles.linkActive}` : `${styles.link}`)
      }
      href={href}
    >
      {" "}
      {children}{" "}
    </Link>
  );
}
