"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";


import FormContainer from "@/components/FormContainer";
import Button from "@/components/Button";
import { MINLENGTHPW, MINLENGTHUSERNAME, SIGNINFIELDS } from "@/constants";

import styles from "./page.module.css";

const errorMessages = {
  userName: {
    minLength: `Your username should contains at least ${MINLENGTHUSERNAME} characters`,
    unique: "This username exists already.",
  },
  password: {
    minLength: `Your password should contain at least ${MINLENGTHPW} characters`,
  },
  email: {
    format: "Enter a valid email",
    unique: "This email exists already",
  },
  generalError: "Something went wrong, please try again!",
};

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
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const username = payload.username.trim();
    const email = payload.email.trim();
    const password = payload.password;

    // add validation
    //1-username.minLength
    try {
      if (username.length < MINLENGTHUSERNAME) {
        throw new Error(errorMessages.userName.minLength);
      }
      //2-min length pw
      if (password.length < MINLENGTHPW) {
        throw new Error(errorMessages.password.minLength);
      }
      //3- invalid email
      if (!regexEmail.test(email)) {
        throw new Error(errorMessages.email.format);
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
      console.log("data new user", data, 'res', res);

      // validation from db
      if (res.ok && res.status === 201) {
        setIsSubmitted(true);
        setErrorMessage("");
        form.reset();
      } else {
        throw new Error(data.error)
      }
    } catch (e: unknown) {
      setIsSubmitted(false);
      const message = e instanceof Error ? e.message : errorMessages.generalError
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
