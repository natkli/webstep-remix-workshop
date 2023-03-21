# Oppgave 2: Loader

> **Tags**: [Loader](https://remix.run/docs/en/1.14.3/route/loader)

På hvert route i Remix kan vi definere en `loader`-funksjon som gir data til routèn når det rendres.

Eksempel på `loader`-funksjonen ser slik ut:

```ts
import { json } from "@remix-run/node";

export async function loader {
  return json({ ok: true });
};
```

Akkurat nå ser vi en tomt side fordi index route har ingen data å vise. La oss se nærmere på index route `index.tsx` under `/app/routes`.
Vi ser ingenting fordi loader funksjonen retunerer en tomt array:

```ts
export async function loader() {
  const eventList = [];

  return json({ eventList });
}
```

## Oppgave 2.1: Hent Icing eventer med loader funksjon

Oppdatert loader funksjonen med `getEventList()` for å hente lister over Icing eventer:

```ts
export async function loader() {
  const eventList = await getEventList();

  if (!eventList) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ eventList });
}
```

Ta en refresh på nettleseren og se om vi får opp Icing eventer.

Før vi gå videre. Sjekk `Network` fanen i browser inspector og ta en ny refesh. Følg med på `fetch/XHR`. Har du lagt merket til at det er ingen `fetch` mot backend funksjonen `getEventList()`? Dette er fordi `loader`-funksjonen kjøres _**Serverside**_.
