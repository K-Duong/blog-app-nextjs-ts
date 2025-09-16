"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

import {FormContainer, Button} from "@/components";

import { isValidEmail, isValidPw, isValidUsername } from "@/libs/utils";
import { ERRORMESSAGES, SIGNINFIELDS } from "@/constants";

import styles from "./page.module.css";



export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    console.log("payload", payload);
    const username = payload.username.trim();
    const email = payload.email.trim();
    const password = payload.password;

    // add validation: min length username, password, email format
    try {
      if (isValidUsername(username) === false) {
        throw new Error(ERRORMESSAGES.userName.minLength);
      }
      if (isValidPw(password) === false) {
        throw new Error(ERRORMESSAGES.password.minLength);
      }
      if (isValidEmail(email) === false) {
        throw new Error(ERRORMESSAGES.email.format);
      }
      // send payload to db function signIn()
      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      console.log("data new user", data, "res", res);

      // validation from db
      if (res.ok && res.status === 201) {
        setIsSubmitted(true);
        setErrorMessage("");
        form.reset();
      } else {
        throw new Error(data.error);
      }
    } catch (e: unknown) {
      setIsSubmitted(false);
      const message =
        e instanceof Error ? e.message : ERRORMESSAGES.generalError;
      setErrorMessage(message);
    }
  };

  const handleRedirect = () => {
    redirect("/new-blog");
  };
  return isSubmitted ? (
    <div className={styles.success}>
      <h1>Thank you</h1>
      <Button type="button" className={styles.cta} onClick={handleRedirect}>
        Create your blog
      </Button>
    </div>
  ) : (
    <FormContainer
      fields={SIGNINFIELDS}
      header={"Welcome to Daily Blog"}
      handleSubmit={handleSubmit}
      errorMessage={errorMessage}
    >
      <Button type="submit" className={styles.cta}>
        Create new account
      </Button>
    </FormContainer>
  );
}
