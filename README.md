# Oppgave 5: Dynamic route params

> **Tags**: [Dynamic segments](https://remix.run/docs/en/1.14.0/guides/routing#dynamic-segments), [Form](https://remix.run/docs/en/1.14.0/components/form), [Action](https://remix.run/docs/en/1.14.0/route/action), [Route](https://remix.run/docs/en/1.14.0/file-conventions/routes-files)

Denne oppgaven skal bruke `dynamic route` for å håndtere uthenting av event detaljer basert på eventId i urlèn. Naming konvensjon for Dynamic routes prefikser med `$`.

<br />

## Oppgave 5.1: Hent eventId

På `routes/events/$eventId/index.tsx`. Hent `eventId` fra url parameter og ta en console.log().

```js
export async function loader({ params, request }: LoaderArgs) {
  console.log(params.eventId);

  return json({ event });
}
```

Skriv inn f.eks `http://localhost:3000/events/1234567` i nettleser. Fikk du `1234567` i consolen?

<br />

## Oppgave 5.2: Hent event detaljer med eventId

Oppdater `loader` funksjoner med `getEvent(params.eventId)` for å hente event detaljer og returnere det som json.

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

Om eventId er gyldig vil vi få tilbake data vi forventer. Men om eventId er ugyldig, kaste vi en feil og håndtere feilen med `ErrorBoundary` og `CatchBoundary`.

<br />

## Oppgave 5.3: Vis frem event detaljer

Nå skal du har fått event detaljer fra `loader` funksjonen, men siden er fortsatt helt blank. <br />

Oppdater `EventDetailsPage` komponenten med `useOptionalUser` og `useLoaderData`

```js
export default function EventDetailsPage() {
  const user = useOptionalUser();
  const data = useLoaderData<typeof loader>();

  const { id, title, location, owner, createdAt, icings } = data.event;

```

Og legg til disse i return blokken. Voilà ✨

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

Prøv igjen nå, lettere å se hva som er feil ikke sant? ✨
