# Oppgave 5: Dynamic Route

> **Tags**: [Dynamic route](https://remix.run/docs/en/1.14.0/guides/routing#dynamic-segments), [Form](https://remix.run/docs/en/1.14.0/components/form), [Action](https://remix.run/docs/en/1.14.0/route/action), [Route](https://remix.run/docs/en/1.14.0/file-conventions/routes-files)

Denne oppgaven skal vi jobbe med `dynamic route` og det skal vi bruke for å hente event detaljer basert på `eventId` i urlèn.

Først la oss se på `/routes/events/$eventId`. Her ligger to filer `index.tsx` og `new-icing.tsx`.

1. `index.tsx` tilsvarer url `/events/[eventId]`. Denne skal vi bruke både for å hente og vise event detaljer.
2. `new-icing.tsx` tilsvarer url `/events/[eventId]/new-icing`. Her skal vi bruke til å legge til icing på eventId.

La oss fokusere bare på `index.tsx` filen.

<br />

## Oppgave 5.1: Hent eventId fra url

Ta en rask sjekk om vi klare å hente `eventId` fra urlèn. Sett en enkelt `console.log()` i loader funksjon.

<br />

`/routes/events/$eventId/index.tsx.`

```js
export async function loader({ params, request }: LoaderArgs) {
  console.log(params.eventId);

  return json({ event });
}
```

I nettleseren sett inn eks. `http://localhost:3000/events/1234567`. Fikk du `1234567` i consolen?

<br />

## Oppgave 5.2: Hent event detaljer med dynamic route og url params

Oppdater `loader` funksjoner med `getEvent(params.eventId)` for å hente event detaljer og returnere data som json.

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

## Oppgave 5.3: Vis frem event detaljer

Nå skal du har fått event detaljer med fra `loader` funksjonen, men siden ser fortsatt litt tomt ut. <br />

Oppdater `EventDetailsPage` komponenten med `useOptionalUser` og `useLoaderData` å hente data.

```js
export default function EventDetailsPage() {
  const user = useOptionalUser();
  const data = useLoaderData<typeof loader>();

  const { id, title, location, owner, createdAt, icings } = data.event;

```

Legg til disse i return blokken og voilà ✨

```js
return (
  <div className="w-full">
    <div className="mb-4 flex justify-between">
      <a
        className="link-primary link flex items-center gap-1 text-xl font-bold no-underline"
        href="/events"
      >
        <TbArrowLeft size={16} /> Events
      </a>
      <Form method="post">
        {owner.id === user?.id && (
          <button
            type="submit"
            className="btn-warning btn-ghost btn-sm btn flex gap-1 text-icing-orange"
          >
            <TbTrash size={20} />
          </button>
        )}
      </Form>
    </div>

    <div className="card mb-[10rem] bg-primary-content px-4 py-8 shadow-lg">
      <div className="flex flex-col">
        <EventDetails
          title={title}
          location={location}
          owner={owner}
          createdAt={createdAt}
        />

        <EventIcingList icings={icings} />
      </div>
    </div>

    <StickyButton url={`/events/${id}/new-icing`} color="red" />
  </div>
);
```
