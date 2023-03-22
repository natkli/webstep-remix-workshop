import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { StickyMenu } from "./components/StickyMenu";
import { getUser } from "./session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import indexStylesheetUrl from "./styles/index.css";
import { useOptionalUser } from "./utils";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  const user = useOptionalUser();

  return (
    <html lang="en" className="h-full" data-theme="lofi">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100 font-archivo">
        <main className="min-h-screen w-full max-w-lg">
          <div className="p-4">
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </div>
          {user && <StickyMenu />}
        </main>
      </body>
    </html>
  );
}
