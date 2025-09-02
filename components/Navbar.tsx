import Image from "next/image";

import logo from "../assets/logo.png";
import styles from "./navbar.module.css";
import { PATHS } from "@/constants";
import LinkWrapper from "./LinkWrapper";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <LinkWrapper href={PATHS.HOME.path}>
        <Image priority className={styles.logo} src={logo} alt="logo blog web" />
      </LinkWrapper>
    {/* TODO: add protected Route */}

      <div className={styles.links}>
        <LinkWrapper href={PATHS.BLOGS.path}>{PATHS.BLOGS.name}</LinkWrapper>
        <LinkWrapper href={PATHS.NEWBLOG.path}>
          {PATHS.NEWBLOG.name}
        </LinkWrapper>
        <LinkWrapper href={PATHS.LOGIN.path}>{PATHS.LOGIN.name}</LinkWrapper>
      </div>
    </nav>
  );
}
