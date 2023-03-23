# Oppgave 4: Action

> **Tags**: [Form](https://remix.run/docs/en/1.14.0/components/form), [Action](https://remix.run/docs/en/1.14.0/route/action)

Vi skal nå se hvordan vi kan opprette ett nytt icing **event**.
For å gjøre dette skal vi bruke Remix sin `action` funksjon for å håndtere formData og lagre det i databasen.

Først, la oss se på `new-event.tsx`. Der ligger en tom **action** funksjon:

```ts
export async function action({ request }: ActionArgs) {
  return json({});
}
```

Legg merke til at det også ligger en `<Form />`-komponent med to `<TextInput />`s; En for event **title** og en for **location**.

## Oppgave 4.1: Hent formData

Utvid funksjonen til å bruke `request.formData()` for å hente ut formData:

```ts
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  const location = formData.get("location");

  return json({});
}
```

Hvis du har lyst kan du å kjøre `console.log(title)` for å se om du klarer hente formData. Trykk på "+" knappen på forsiden for å oprettet ny icing event, fyll ut **title** og **location** og deretter trykke på **Create** knappen. Du skal da se dataen du har mottatt i konsollen.

## Oppgave 4.2: Validering av FormData

Nå har vi klart å hente ut formData.
Før vi går videre trenger vi å legge inn validering, siden backend funksjonen `createEvent()` har tre påkrevde parametere; `userId`, `title` og `location`.

Start med å hente ut `userId`:

```ts
const userId = await requireUserId(request);
```

Legg deretter til validering for `title` og `location`:

```ts
if (typeof title !== "string" || title.length === 0) {
  return json(
    { errors: { title: "Event title is required", location: null } },
    { status: 400 }
  );
}

if (typeof location !== "string" || location.length === 0) {
  return json(
    { errors: { title: null, location: "Location is required" } },
    { status: 400 }
  );
}
```

## Oppgave 4.3: Lagre formData

Vi skal nå ta i bruk `createEvent()` funksjonen for å lagre formData, og tilslutt redirecte til events-siden vi har opprettet:

```tsx
const event = await createEvent(userId, title, location);
return redirect(`/events/${event.id}`);
```

Fullstending versjon av `action`-funksjonen vil se ut som noe slikt:

```tsx
export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const location = formData.get("location");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { title: "Event title is required", location: null } },
      { status: 400 }
    );
  }

  if (typeof location !== "string" || location.length === 0) {
    return json(
      { errors: { title: null, location: "Location is required" } },
      { status: 400 }
    );
  }

  const event = await createEvent(userId, title, location);

  return redirect(`/events/${event.id}`);
}
```

I tillegg, legg tilbake linjene som er kommentert ut under `NewEventPage()` komponent:

```ts
// const actionData = useActionData<typeof action>();
// const titleRef = useRef<HTMLInputElement>(null);
// const locationRef = useRef<HTMLInputElement>(null);

// useEffect(() => {
//   if (actionData?.errors?.title) {
//     titleRef.current?.focus();
//   } else if (actionData?.errors?.location) {
//     locationRef.current?.focus();
//   }
// }, [actionData]);
```

og litt igjen på `<TextInput />` komponent lenger ned. Nå skal alt være på plass. Men før teste, gå til nettleseren. Sjekk Network fanen i browser inspector og følg med på fetch/XHR.

Nå, prøv å opprette ett nytt event! ✨🤞

Fikk du - Status Code: 🟢 200 OK? Klar for neste del? [Oppgave 5](https://github.com/natkli/webstep-remix-workshop/tree/oppgave5#readme)
