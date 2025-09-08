import { MINLENGTHPW} from "@/constants";

// const errorMessages = {
//   userName: {
//     minLength: `Your username should contains at least ${MINLENGTHUSERNAME} characters`,
//     unique: "This username exists already.",
//   },
//   password: {
//     minLength: `Your password should contain at least ${MINLENGTHPW} characters`,
//   },
//   email: {
//     format: "Enter a valid email",
//     unique: "This email exists already",
//   },
//   generalError: "Something went wrong, please try again!",
// };
export const isValidEmail = (email: string) => {
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regexEmail.test(email) 

};

export const isValidPw = (password: string) => {
  return password.trim().length >= MINLENGTHPW 
}