import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

import type { User } from "~/models/user.server";

import avatar0 from "~/images/avatars/avatar0.svg";
import avatar1 from "~/images/avatars/avatar1.svg";
import avatar2 from "~/images/avatars/avatar2.svg";
import avatar3 from "~/images/avatars/avatar3.svg";
import avatar4 from "~/images/avatars/avatar4.svg";
import avatar5 from "~/images/avatars/avatar5.svg";
import avatar6 from "~/images/avatars/avatar6.svg";
import avatar7 from "~/images/avatars/avatar7.svg";
import avatar8 from "~/images/avatars/avatar8.svg";
import avatar9 from "~/images/avatars/avatar9.svg";
import { format, parseISO } from "date-fns";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

function isUser(user: any): user is User {
  return user && typeof user === "object" && typeof user.email === "string";
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser(): User {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export function randomInt() {
  return Math.floor(Math.random() * 9);
}

export function formattedDate(date: string) {
  return format(parseISO(date), "dd MMM yy, HH:mm");
}

export function getAvatarById(avatarId: string) {
  switch (avatarId) {
    case "avatar0":
      return avatar0;
    case "avatar1":
      return avatar1;
    case "avatar2":
      return avatar2;
    case "avatar3":
      return avatar3;
    case "avatar4":
      return avatar4;
    case "avatar5":
      return avatar5;
    case "avatar6":
      return avatar6;
    case "avatar7":
      return avatar7;
    case "avatar8":
      return avatar8;
    default:
      return avatar9;
  }
}
