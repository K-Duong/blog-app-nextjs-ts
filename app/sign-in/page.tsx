'use client'

import { MINLENGTHPW, MINLENGTHUSERNAME, SIGNINFIELDS } from "@/constants";

import FormContainer from "@/components/FormContainer";
import Button from "@/components/Button";

import styles from "./page.module.css";

const errorMessages = {
  userName: {
    minLength: `Your username should contain at least ${MINLENGTHUSERNAME} character`,
    unique: 'This username exists already.'
  },
  password: `Your password should contain at least ${MINLENGTHPW} character`,
  email: {
    format: 'Enter a valid email',
    unique: 'This email exists already'
  },
  generalError: 'Something went wrong, please try again!'
}

export default function SignIn() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    console.log('payload', payload);
    // add validation 
      //1-username.minLength
      //2-min length pw
      //3- invalid email

    // send payload to db function signIn()

    // validation from db
      // 1-unique username
      // 2-unique email
    
    // display thank you message
  }
  return (
    <FormContainer
      fields={SIGNINFIELDS}
      header={"Welcome to Daily Blog"}
      handleSubmit={handleSubmit}
       >
        <Button type="submit" className={styles.cta}>Create new account</Button>
        </FormContainer>
  );
}