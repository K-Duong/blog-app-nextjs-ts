import { FieldType } from "@/types";

export const LIMITSIZE = 5; // 5MB
export const MAXLENGTHTEXT = 300; // 300 characters for text fields
export const PAGINATION = {
  LIMIT: 10, // default limit for pagination  
};

export const MINLENGTHUSERNAME = 3;
export const MINLENGTHPW = 6;

export const PATHS = {
  HOME: {
    path: '/',
    name: 'Home'
  },
  BLOGS: {
    path: '/blogs',
    name: 'Blogs'
  },
  NEWBLOG: {
    path: '/new-blog',
    name: 'New blog'
  },
  LOGIN: {
    path: '/login',
    name: 'Login'
  },
  SIGNUP: {
    path: '/sign-up',
    name: 'Sign Up'
  },
}

export const FIELDS: Record<string, FieldType> = {
  title: {
    id: "title",
    label: "Title",
    type: "text",
    name: "title",
    validationRules: {
      required: true,
    },
  },
  image: {
    id: "image",
    label: "Image",
    type: "file",
    name: "image",
    validationRules: {
      required: true,
      maxSize: LIMITSIZE, // 1MB
    },
  },
  content: {
    id: "content",
    label: "Content",
    type: "text",
    name: "content",
    validationRules: {
      required: true,
    },
  },
};

export const LOGINFIELDS: Record<string, FieldType> = {
  email: {
    id: "email",
    label: "Email",
    type: "email",
    name: "email",
    validationRules: {
      required: true,
    },
  },
  password: {
    id: "password",
    label: "Password",
    type: "password",
    name: "password",
    validationRules: {
      required: true,
    },
  }
}

export const SIGNINFIELDS : Record<string, FieldType>= {
  username: {
    id: "username",
    label: "Username",
    type: "text",
    name: "username",
    validationRules: {
      required: true,
      minLength: MINLENGTHUSERNAME,
    },
  },
  email: {
    id: "email",
    label: "Email",
    type: "email",
    name: "email",
    validationRules: {
      required: true,
    },
  },
  password: {
    id: "password",
    label: "Password",
    type: "password",
    name: "password",
    validationRules: {
      required: true,
      minLength: MINLENGTHPW
    },
  }
}

export const ERRORMESSAGES = {
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
  notValidCredentials: "Your email or your password is incorrect"
};