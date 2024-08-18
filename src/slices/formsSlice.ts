import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData } from "../type/form.ts";

interface FormState {
  uncontrolledForms: FormData[];
  hookForms: FormData[];
}

const initialState: FormState = {
  uncontrolledForms: [],
  hookForms: [],
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setUncontrolledFormData(state, action: PayloadAction<FormData>) {
      state.uncontrolledForms.push(action.payload);
    },
    setHookFormData(state, action: PayloadAction<FormData>) {
      state.hookForms.push(action.payload);
    },
  },
});

export const { setUncontrolledFormData, setHookFormData } = formsSlice.actions;
export default formsSlice.reducer;
