import * as yup from "yup";
export const schema = [
  {
    component: "TEXT_FIELD",
    name: "name",
    label: "Your Name",
    isRequired: true,
    type: "text",
    validate: yup.string().required("Name is Required"),
  },
  {
    component: "TEXT_FIELD",
    name: "email",
    label: "Your Email",
    isRequired: true,
    type: "email",
    validate: yup.string().email("Invalid email").required("Email is Required"),
  },
  {
    component: "TEXT_FIELD",
    name: "password",
    label: "Your Password",
    isRequired: true,
    type: "password",
    validate: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is Required"),
  },
  {
    component: "TEXT_FIELD",
    name: "confirmPassword",
    label: "Confirm Password",
    isRequired: true,
    type: "password",
    validate: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is Required"),
  },
  {
    component: "RADIO_BUTTON",
    name: "gender",
    label: "Gender",
    isRequired: true,
    options: ["Male", "Female", "Other"],
    validate: yup.string().required("Gender is Required"),
  },
  {
    component: "SLIDER",
    name: "rating",
    label: "Rating",
    isRequired: false,
    min: 1,
    max: 5,
    value: 1,
    validate: yup.number().min(1).max(5),
  },
  {
    component: "DATE_PICKER",
    name: "dateOfBirth",
    label: "Date of birth",
    isRequired: false,
    validate: yup.date(),
  },
  {
    component: "CHECKBOX",
    name: "acceptTerms",
    label: "I accept T&C",
    isRequired: true,
    validate: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("Accept Terms is Required"),
  },
];
