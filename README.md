# Oppgave 3: Remix Routing

> **Tags**: [Routing](https://remix.run/docs/en/1.14.3/guides/routing), [Action](https://remix.run/docs/en/1.14.0/route/action)

I denne oppgaven skal vi jobbe med **Routing**. 
Routing er trolig det viktikgste konseptet å forstå i Remix. 
I likhet med Next.js bruker Remix såkalt **File System based routing**. En slik filbasert routing
lar oss bygge komplekse layoutstrukturer på en enkel og effektivt måte. 
I tillegg har det ytterligere fordeler i at det gjør
at en hver Remix applikasjon ser "lik" ut, og gjør at ved å lese hvordan filene ligger vil utviklere få innsikt i hvordan appen
og logikken er bygd opp. I tillegg slipper man diskusjoner om hvor filer burde ligge og hva som er "riktig" filstruktur. 
Mindre bikeshedding og mer tid til å skape verdi og faktisk utvikle.

Om du kikker på hovedmenyen kan du se at vi har to routes. En index route `/` som lister ut icing eventer på 
forsiden, samen en profil-route, `/profile`. 
Det vi ønsker å gjøre nå er å legge til en tredje route, `/ranking`. Denne routen skal vi bruke til å vise en global rangering over icinger.

## Oppgave 3.1: Legge til ny route

Start med å opprett en ny route fil `ranking.tsx` under `/app/routes`. Deretter kan du 
legge til koden under. Det denne gjør er å hente ut detaljert rankinginformasjon fra databasen, og deretter rendre det ut på siden:

```tsx
import { useLoaderData } from "@remix-run/react";
import {
  json,
  type LoaderArgs,
  type MetaFunction,
} from "@remix-run/server-runtime";
import { useEffect, useState } from "react";
import { RankedIcing } from "~/components/icings/RankedIcing";

import { getUsersRank } from "~/models/user.server";
import { requireUserId } from "~/session.server";

export const meta: MetaFunction = () => {
  return {
    title: "Icing | Ranking",
  };
};

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);

  const users = await getUsersRank();

  if (!users) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ users });
}

type SortMethod = "name" | "wins" | "loses";

export default function RankingPage() {
  const data = useLoaderData<typeof loader>();

  const [sortMethod, setSortMethod] = useState<SortMethod>("wins");
  const [rankingList, setRankingList] = useState(data.users);

  useEffect(() => {
    if (sortMethod === "wins") {
      const sortedByWins = [...rankingList].sort(
        (a, b) => b.icingWins.length - a.icingWins.length
      );

      setRankingList(sortedByWins);
      return;
    }

    if (sortMethod === "loses") {
      const sortedByLoses = [...rankingList].sort(
        (a, b) => b.icingLoses.length - a.icingLoses.length
      );

      setRankingList(sortedByLoses);
      return;
    }

    if (sortMethod === "name") {
      const sortedByName = [...rankingList].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setRankingList(sortedByName);
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMethod]);

  return (
    <div className="w-full">
      <h1 className="my-4 text-center text-2xl font-bold">Ranking</h1>
      <div className="flex w-full justify-center">
        <div>
          <label className="label">
            <span className="label-text w-full text-center">Sort by</span>
          </label>
          <select
            className="select-bordered select select-md w-full"
            onChange={(event) => {
              const value = event.target.value as SortMethod;
              setSortMethod(value);
            }}
            defaultValue="wins"
          >
            <option value="wins">Wins</option>
            <option value="loses">Loses</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div className="card mt-4 mb-[10rem] bg-primary-content py-6 px-4 shadow-lg">
        {rankingList.map(
          ({ name, username, avatarId, icingWins, icingLoses }, index) => {
            return (
              <RankedIcing
                key={index}
                rank={index + 1}
                name={name}
                avatarId={avatarId}
                username={username}
                icingWins={icingWins.length}
                icingLoses={icingLoses.length}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
```

Koden har også litt diverse snacks som sortering basert på diverse kriterier, samt styling.

Om du har lagt til filen på riktig plass skal `/ranking`-routen være klar. 
Gå til `http://localhost:3000/ranking` i nettleseren og verfiser at du får siden opp. Ser det riktig ut? Så bra 👏

## Oppgave 3.2: Legg til ranking i hovedmeny

Nå som vi har lagt til routen i applikasjonen vår, ønsker vi å gjøre det litt lettere å navigere til den.
Lenker til de forsjellige routsene i applikajsonen ligger i en komponent kalt `StikyMenu`. 
Denne finner du i filen `app/components/StickyMenu.tsx`. 
Legg til følgende i listen over meny-elementer (`menuList`):

```tsx
{
  link: "/ranking",
  icon: <TbFlame size={24} />,
},
```

Om du kikker i render-funksjonen i koden vil du se at listen ittereres over og rendres som `Link`-komponenter. 
`Link` er en komponent som lett lar deg rendre navigering i applikasjonen din,
og virker nok kjent dersom du har brukt React-Router tidligere.

Da sier vi oss ferdig med routing for nå! Bra jobba! ✨

Vi beveger oss nå videre til [Oppgave 4](https://github.com/natkli/webstep-remix-workshop/tree/oppgave4#readme).
