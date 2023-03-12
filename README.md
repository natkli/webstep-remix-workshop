# Oppgave 5: Dynamic route params

> **Tags**: [Dynamic segments](https://remix.run/docs/en/1.14.0/guides/routing#dynamic-segments), [Form](https://remix.run/docs/en/1.14.0/components/form), [Action](https://remix.run/docs/en/1.14.0/route/action), [Route](https://remix.run/docs/en/1.14.0/file-conventions/routes-files)

I denne oppgaven skal vi bruke en `dynamic route` for å håndtere uthenting av event-detaljer basert på `eventId` i url-en.
Konvensjon for navngiving av Dynamic routes er at de prefikses med `$`.

## Oppgave 5.1: Hent eventId

Gå til `routes/events/$eventId/index.tsx`. Hent `eventId` fra url-parameter og `console.log()` det du finner:

```ts
export async function loader({ params, request }: LoaderArgs) {
  console.log("Event ID:", params.eventId);

  return json({ event });
}
```

Skriv inn f.eks `http://localhost:3000/events/1234567` i nettleseren. Fikk du `1234567` i consolen?

## Oppgave 5.2: Hent event-detaljer med eventId

Oppdater `loader` funksjonen med `getEvent(params.eventId)` for å hente eventdetaljer og returnere det som json.

```ts
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

Om `eventId` er gyldig og finnes vil vi få tilbake data slik vi forventer.
Men, om `eventId` er ugyldig vil vi kaste en feil og håndtere feilen med `ErrorBoundary` og `CatchBoundary`.

## Oppgave 5.3: Vis frem eventdetaljer

Selv om du har fått eventdetaljer fra `loader` funksjonen er siden fortsatt helt blank. Det skal vi fikse nå.

Oppdater `EventDetailsPage`-komponenten til å bruke `useOptionalUser` og `useLoaderData`:

```ts
export default function EventDetailsPage() {
  const data = useLoaderData<typeof loader>();

  const { id, title, location, owner, createdAt, icings } = data.event;
}
```

Legg deretter til følgende i return blokken. Voilà ✨:

```tsx
return (
  <div className="w-full">
    <div className="mb-4 flex justify-between">
      <a
        className="link-primary link flex items-center gap-1 text-xl font-bold no-underline"
        href="/events"
      >
        <TbArrowLeft size={16} /> Events
      </a>
    </div>

    <div className="card bg-primary-content mb-[10rem] px-4 py-8 shadow-lg">
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
