import { MINLENGTHPW, MINLENGTHUSERNAME} from "@/constants";

export const isValidEmail = (email: string) => {
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regexEmail.test(email) 

};
export const isValidUsername = (username: string) => {
  return username.trim().length >= MINLENGTHUSERNAME; 
}

export const isValidPw = (password: string) => {
  return password.trim().length >= MINLENGTHPW 
}

export const waitForDebug = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}