"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import LinkWrapper from "@/components/LinkWrapper";
import Button from "@/components/Button";
import FormContainer from "@/components/FormContainer";
import { LOGINFIELDS, PATHS } from "@/constants";

import styles from "./page.module.css";
import { isValidEmail, isValidPw } from "@/libs/utils";
import { redirect } from "next/navigation";

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
      setErrorMessage("Invalid credentials.");
      return;
    }

    // send payload to db ()
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
