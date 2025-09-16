"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

import {LinkWrapper, Button, FormContainer} from "@/components";

import { ERRORMESSAGES, LOGINFIELDS, PATHS } from "@/constants";
import { isValidEmail, isValidPw } from "@/libs/utils";

import styles from "./page.module.css";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    // validation:
    if (!isValidEmail(payload.email) || !isValidPw(payload.password)) {
      setErrorMessage(ERRORMESSAGES.notValidCredentials);
      return;
    }

    // send payload to db 
    const result = await signIn("credentials", {
      redirect: false,
      email: payload.email,
      password: payload.password,
    });
    if (result?.error) {
      setErrorMessage(result.error);
      return;
    }

    // redirect to blogs
    redirect("/blogs");
  };
  return (
    <FormContainer
      fields={LOGINFIELDS}
      header={"Login"}
      handleSubmit={handleSubmit}
      errorMessage={errorMessage}
    >
      <LinkWrapper classStyle={styles.linkTo} href={PATHS.SIGNUP.path}>
        Create a new account
      </LinkWrapper>
      <Button type="submit" className={styles.cta}>
        Login
      </Button>
    </FormContainer>
  );
}
