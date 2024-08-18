export type FormData = {
  name: string | undefined;
  age: number | string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  gender: string | undefined;
  terms?: boolean | undefined;
  picture: NonNullable<File | FileList | undefined> | undefined;
  pictureBase64?: string | ArrayBuffer | null;
  country: string | undefined;
  isNewAdded?: boolean;
};
