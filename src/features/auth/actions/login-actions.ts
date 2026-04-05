"use server";

import { cookies } from "next/headers";
import { LoginRequest, RegisterRequest } from "@/types/auth";
import { authService } from "../services";

async function setAuthCookies(token: string, auth: object) {
  const cookieStore = await cookies();
  cookieStore.set("token", token, { path: "/", sameSite: "lax" });
  cookieStore.set("auth", JSON.stringify(auth), { path: "/", sameSite: "lax" });
}

export async function loginAction(request: LoginRequest) {
  const data = await authService.login(request);
  await setAuthCookies(data.token, data);
  return data;
}

export async function registerAction(request: RegisterRequest) {
  const data = await authService.register(request);
  await setAuthCookies(data.token, data);
  return data;
}
