import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import SigninForm from "../components/auth/SigninForm/SigninForm";

export const loader = (args: LoaderFunctionArgs) => {
  const url = new URL(args.request.url);
  const email = url.searchParams.get("email") ?? undefined;
  return {
    email,
  };
};

export const routesId = "_auth.signup";

export type RoutesLoader = ReturnType<typeof loader>;

export default function Routes() {
  const { email } = useLoaderData() as RoutesLoader;
  return <SigninForm.Register email={email} />;
}
