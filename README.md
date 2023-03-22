# Oppgave 2: Laste inn data

> **Tags**: [Loader](https://remix.run/docs/en/1.14.3/route/loader), [Route](https://remix.run/docs/en/1.14.3/guides/api-routes#routes-are-their-own-api)

Dersom du ikke har jobbet med server side rendered applikasjoner før er du kanskje vant til at du har et api backend som har egne API-router.
I Remix er denne koblingen en del tettere – de fleste routes i applikasjonen din vil være både UI-et ditt og apiet! På denne måten vet Remix-applikasjonen
i browseren hvordan den skal prate med seg selv på serveren. 

Vi har allerede satt opp en del routes i applikasjonen, og din oppgave blir å legge til en loader på TODO.

Heldigvis har Remix dette innebygd, og vi kan på hver route definere en `loader`-funksjon som gir data til routen når den rendres.

Et eksempel på en `loader`-funksjon kan se slik ut:

```ts
import { json } from "@remix-run/node";

export async function loader() {
  return json({ ok: true });
};
```

Slik applikasjonen er nå ser vi en kun en tom side, fordi vår index route ikke har noen data å vise. 
La oss ta en nærmere titt på index route `index.tsx` under `/app/routes`.
Her vil du se at det er fordi loader-funksjonen retunerer en tomt array:

```ts
export async function loader() {
  const eventList = [];

  return json({ eventList });
}
```

Dette må vi gjøre noe med!

## Oppgave 2.1: Hent Icing eventer ved hjelp av en loader-funksjon

Øverst i filen ligger det en ubrukt, importert funksjon; `getEventList()`. 
Dette er en funksjon som henter ut eventer fra databasen. 
Du må gjerne kikke inni funksjonen for å se hvordan vi bruker prisma for å fikse dette for oss.

Oppdatert så loader funksjonen til å bruke denne funksjonen til å hente laste en liste over Icing eventer:

```ts
export async function loader() {
  const eventList = await getEventList();

  if (!eventList) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ eventList });
}
```

Gå til localhost i nettleseren og refresh siden og verifiser at vi nå får lastet eventer (altså icinger).

Før vi gå videre til neste oppgave; Sjekk `Network` fanen i browser inspector og refresh igjen. 
Følg med på `fetch/XHR`. Ser du at det ikke går noe `fetch`-kall mot backend for å hente ut `getEventList()`? 
Dette er fordi `loader`-funksjonen kjøres _**Serverside**_ – klienten får bare ut rein html, 
og payloaden som må over nettverket blir betydelig mindre. Ganske stilig 🥂

Du kan nå bevege deg videre til [Oppgave 3](https://github.com/natkli/webstep-remix-workshop/tree/oppgave3#readme)
