# Oppgave 5: Dynamic Route

> **Tags**: [Dynamic route](https://remix.run/docs/en/1.14.0/guides/routing#dynamic-segments), [Form](https://remix.run/docs/en/1.14.0/components/form), [Action](https://remix.run/docs/en/1.14.0/route/action), [Route](https://remix.run/docs/en/1.14.0/file-conventions/routes-files)

Denne oppgaven skal vi jobbe `dynamic route` og det skal vi bruke til å hente event detaljer basert på `eventId`.

La oss se på `/routes/events/$eventId`, her ligger to filer `index.tsx` og `new-icing.tsx`.

1. `index.tsx` tilsvarer en url `/events/[eventId]`. Den skal vi bruke både for å hente og vise event detaljer.
2. `newicing.tsx` tilsvarer en url `/events/[eventId]/new-icing`. Her skal vi bruke til å legge til icing på eventId.

Men la oss bare fokusere på `index.tsx`.

<br />

## Oppgave 5.1: Hent event detaljer med dynamic route og url params

På `/routes/events/$eventId/index.tsx`. Bytt ut eksisterende `loader` funksjon med en mer oppdatert loader for å hente event detaljer.

```js
export async function loader({ params, request }: LoaderArgs) {
  await requireUserId(request);
  invariant(params.eventId, "eventId not found");

  const event = await getEvent(params.eventId);

  if (!event) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ event });
}
```

Her henter vi eventId fra urlèn med `params.eventId` og bruke for å hente event detaljer `getEvent(params.eventId)`.

Dersom eventId er gyldig vil vi få tilbake event detaljer vi forventer. Men hvis eventId derimot ikke finnes, kaste en feil og blir håndtert av `ErrorBoundary` og `CatchBoundary`.

<br />
