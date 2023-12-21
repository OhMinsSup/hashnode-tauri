import { Outlet } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";
import { invoke } from "@tauri-apps/api/tauri";

export const loader = async (_: LoaderFunctionArgs) => {
  const data = await invoke("onboard");
  return data as FetchSchema.Hashnodeonboard;
};

export const routesId = "_auth";

export type RoutesLoader = FetchSchema.Hashnodeonboard;

export default function Routes() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
