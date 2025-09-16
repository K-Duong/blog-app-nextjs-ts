"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

import logo from "@/assets/logo.png";
import { PATHS } from "@/constants";
import LinkWrapper from "../link";
import {Button} from "../buttons";

import styles from "./styles.module.css";

export default function Navbar() {
  const { data: session } = useSession();
  // console.log("Navbar session:", session);

  return (
    <nav className={styles.nav}>
      <LinkWrapper href={PATHS.HOME.path}>
        <Image
          priority
          className={styles.logo}
          src={logo}
          alt="logo blog web"
        />
      </LinkWrapper>

      <div className={styles.links}>
        {!session ? (
          <Button type="button" onClick={() => signIn()}>
            {PATHS.LOGIN.name}
          </Button>
        ) : (
          <>
            <LinkWrapper href={PATHS.BLOGS.path}>
              {PATHS.BLOGS.name}
            </LinkWrapper>
            <LinkWrapper href={PATHS.NEWBLOG.path}>
              {PATHS.NEWBLOG.name}
            </LinkWrapper>
            <Button type="button" onClick={() => signOut()}>
              Log Out
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
