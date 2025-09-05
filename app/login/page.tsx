"use client";

import { LOGINFIELDS, PATHS } from "@/constants";

import LinkWrapper from "@/components/LinkWrapper";
import Button from "@/components/Button";
import FormContainer from "@/components/FormContainer";

import styles from "./page.module.css";

const errorMessages = {
  invalidEmail : 'Enter a valid email',
  invalidPw: 'Email or password is wrong. Please try again!',
  generalError: 'Something went wrong, please try again!'
}

export default function Login() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    console.log("payload", payload);
    // validation front:
      // 1- invalid email "Enter a valid email"

    // send payload to db ()
    // add validation message
      // 2- invalid password "Email or password is wrong. Please try again"
      // 3- disconnect or error from db: "Something went wront, please try again"
    // redirect to blogs
    };
  return (
    <FormContainer
      fields={LOGINFIELDS}
      header={"Login"}
      handleSubmit={handleSubmit}
      errorMessage=""//FIXME: errorMessage state
    
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
