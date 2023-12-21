import type { LoaderFunctionArgs } from "react-router-dom";

export const loader = (args: LoaderFunctionArgs) => {
  console.log("auth signup");
  console.log(args);
  return null;
};

export const routesId = "_auth.signup";

export default function Routes() {
  return <>aith</>;
}
