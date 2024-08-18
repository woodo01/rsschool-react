import { createSlice } from "@reduxjs/toolkit";
import { Country } from "../type/country.ts";
import { countries } from "../data/countries.ts";

const initialState: Country[] = countries;

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
