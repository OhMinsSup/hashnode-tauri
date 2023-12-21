import React from "react";
import { Outlet } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";

export const loader = (args: LoaderFunctionArgs) => {
  console.log("auth");
  console.log(args);
  return null;
};

export const routesId = "_auth";

export default function Routes() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
