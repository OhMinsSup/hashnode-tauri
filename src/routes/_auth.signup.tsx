import { useLoaderData, type LoaderFunctionArgs, ActionFunctionArgs } from "react-router-dom";
import SigninForm from "../components/auth/SigninForm/SigninForm";

export const loader = (args: LoaderFunctionArgs) => {
  const url = new URL(args.request.url);
  const email = url.searchParams.get("email") ?? undefined;
  return {
    email,
  };
};

export const action = (args: ActionFunctionArgs) => {
  console.log("action", args);
  return null
}

export const routesId = "_auth.signup";

export type RoutesLoaderData = ReturnType<typeof loader>;

export default function Routes() {
  const { email } = useLoaderData() as RoutesLoaderData;
  return <SigninForm.Register email={email} />;
}
