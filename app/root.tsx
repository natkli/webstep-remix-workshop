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

import { Menu } from "./components/Menu";
import { getUser } from "./session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import indexStyleshettUrl from "./styles/index.css";
import { useOptionalUser } from "./utils";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: indexStyleshettUrl },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix - Icing",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body className="font-archivo">
        <main className="min-h-screen w-full max-w-lg">
          <div className="p-4">
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </div>
          {user && <Menu />}
        </main>
      </body>
    </html>
  );
}
