import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import SigninForm from "../components/auth/SigninForm/SigninForm";

export const loader = (args: LoaderFunctionArgs) => {
  console.log("auth signin");
  console.log(args);
  return null;
};

export const action = (args: ActionFunctionArgs) => {
  console.log("auth signin", args);
  return null
}

export const routesId = "_auth.signin";

export type RoutesLoaderData = ReturnType<typeof loader>;

export default function Routes() {
  return <SigninForm />;
}
