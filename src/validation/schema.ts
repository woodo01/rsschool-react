import * as Yup from "yup";
import { countries } from "../data/countries.ts";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Z]/, "Name must start with an uppercase letter"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .matches(/(?=.*[0-9])/, "Password must contain at least one number")
    .matches(
      /(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter",
    )
    .matches(
      /(?=.*[a-z])/,
      "Password must contain at least one lowercase letter",
    )
    .matches(
      /(?=.*[!@#$%^&*])/,
      "Password must contain at least one special character",
    )
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  gender: Yup.string().required("Gender is required"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions",
  ),
  picture: Yup.mixed<File | FileList>()
    .required("A picture is required")
    .test("required", "A picture is required", (value: File | FileList) => {
      if (value instanceof FileList) {
        return value.length > 0;
      }
      return value !== null;
    })
    .test("fileSize", "File size is too large", (value: File | FileList) => {
      if (value instanceof FileList) {
        value = value[0];
      }
      return value && value.size <= 1024 * 1024;
    })
    .test("fileType", "Unsupported file format", (value: File | FileList) => {
      if (value instanceof FileList) {
        value = value[0];
      }
      return value && ["image/jpeg", "image/png"].includes(value.type);
    }),
  country: Yup.string()
    .required("Country is required")
    .test(
      "inList",
      "Country should be from the country list",
      (value: string) => {
        return (
          countries.filter(
            (country) => country.name.toLowerCase() === value.toLowerCase(),
          ).length > 0
        );
      },
    ),
});
