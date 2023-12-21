import type { LoaderFunctionArgs } from "react-router-dom";
import SigninForm from "../components/auth/SigninForm/SigninForm";

export const loader = (args: LoaderFunctionArgs) => {
  console.log("auth signin");
  console.log(args);
  return null;
};

export const routesId = "_auth.signin";

export default function Routes() {
  return (
    <>
      <SigninForm />
    </>
  );
}
