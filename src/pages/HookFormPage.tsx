import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { setHookFormData } from "../slices/formsSlice.ts";
import { RootState } from "../store.ts";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "../validation/schema.ts";
import { FormData } from "../type/form.ts";
import { Country } from "../type/country.ts";

const HookFormPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.countries);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue("country", inputValue);
    trigger("country");

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
    setValue("country", country.name);
    setShowDropdown(false);
  };

  const onSubmit = (data: FormData) => {
    if (!(data.picture instanceof FileList)) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(data.picture[0]);
    reader.onload = () => {
      data.picture = undefined;
      data.pictureBase64 = reader.result;
      data.isNewAdded = true;
      dispatch(setHookFormData({ ...data }));
      navigate("/");
    };
  };

  return (
    <div>
      <h1>React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input id="age" type="number" {...register("age")} />
          {errors.age && <span>{errors.age.message}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" {...register("gender")}>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <span>{errors.gender.message}</span>}
        </div>
        <div>
          <label htmlFor="terms">Accept Terms & Conditions:</label>
          <input id="terms" type="checkbox" {...register("terms")} />
          {errors.terms && <span>{errors.terms.message}</span>}
        </div>
        <div>
          <label htmlFor="picture">Upload Picture:</label>
          <input
            id="picture"
            type="file"
            accept="image/png, image/jpeg"
            {...register("picture")}
          />
          {errors.picture && <span>{errors.picture.message}</span>}
        </div>
        <div className="countries">
          <label htmlFor="country">Country:</label>
          <input
            id="country"
            {...register("country")}
            onChange={handleCountryChange}
            autoComplete="off"
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
          {errors.country && <span>{errors.country.message}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HookFormPage;
