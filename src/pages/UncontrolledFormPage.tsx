import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUncontrolledFormData } from "../slices/formsSlice";
import { validationSchema } from "../validation/schema.ts";
import * as Yup from "yup";
import { RootState } from "../store.ts";
import { useNavigate } from "react-router-dom";
import { FormData } from "../type/form.ts";
import { Country } from "../type/country.ts";

const UncontrolledFormPage: React.FC = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (countryRef.current !== null) countryRef.current.value = inputValue;

    if (inputValue.length > 0) {
      const filtered = countries.filter((country) =>
        country.name.toLowerCase().startsWith(inputValue.toLowerCase()),
      );
      setFilteredCountries(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelectCountry = (country: Country) => {
    if (countryRef.current !== null) countryRef.current.value = country.name;
    setShowDropdown(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData: FormData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      terms: termsRef.current?.checked,
      picture: pictureRef.current?.files?.[0],
      country: countryRef.current?.value,
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      if (!(formData.picture instanceof File)) {
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(formData.picture);
      reader.onload = () => {
        formData.picture = undefined;
        formData.pictureBase64 = reader.result;
        formData.isNewAdded = true;
        dispatch(setUncontrolledFormData({ ...formData }));
        navigate("/");
      };
    } catch (validationErrors) {
      if (validationErrors instanceof Yup.ValidationError) {
        const errorMessages: { [key: string]: string } = {};
        validationErrors.inner.forEach((error) => {
          if (error.path) {
            errorMessages[error.path] = error.message;
          }
        });
        setErrors(errorMessages);
      }
    }
  };

  return (
    <div>
      <h1>Uncontrolled Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" ref={nameRef} />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input id="age" type="number" ref={ageRef} />
          {errors.age && <span>{errors.age}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" ref={emailRef} />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" ref={passwordRef} />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            ref={confirmPasswordRef}
          />
          {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" ref={genderRef}>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <span>{errors.gender}</span>}
        </div>
        <div>
          <label htmlFor="terms">Accept Terms & Conditions:</label>
          <input id="terms" type="checkbox" ref={termsRef} />
          {errors.terms && <span>{errors.terms}</span>}
        </div>
        <div>
          <label htmlFor="picture">Upload Picture:</label>
          <input
            id="picture"
            type="file"
            accept="image/png, image/jpeg"
            ref={pictureRef}
          />
          {errors.picture && <span>{errors.picture}</span>}
        </div>
        <div className="countries">
          <label htmlFor="country">Country:</label>
          <input
            id="country"
            ref={countryRef}
            onChange={handleCountryChange}
            autoComplete="on"
          />
          {showDropdown && filteredCountries.length > 0 && (
            <ul
              style={{
                border: "1px solid #ccc",
                padding: 0,
                listStyleType: "none",
              }}
            >
              {filteredCountries.map((country, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectCountry(country)}
                  style={{
                    padding: "5px",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                  }}
                >
                  {country.name}
                </li>
              ))}
            </ul>
          )}
          {errors.country && <span>{errors.country}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrolledFormPage;
