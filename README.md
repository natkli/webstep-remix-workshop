# Oppgave 4: Action

> **Tags**: [Form](https://remix.run/docs/en/1.14.0/components/form), [Action](https://remix.run/docs/en/1.14.0/route/action)

Nå skal vi se på hvordan vi kan opprette ny icing **event**. Her skal vi bruke remix sitt `action` funksjon for å håndtere formData og lagrer det i databasen.

<br />

Først, la oss se på `new-event.tsx`. Der ligger en tomt **action** funksjon

```js
export async function action({ request }: ActionArgs) {
  return json({});
}
```

Ligger også en `<Form />` komponent med to `<TextInput />`, en for event **title** og en for **location**.

<br />

## Oppgave 4.1: Hent formData

Bruk `request.formData()` for å hente formData.

```js
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  const location = formData.get("location");

  return json({});
}
```

Du kan ta `console.log(formData)` og trykk på **Create** knappen og se om du fikk hente formData.

<br />

## Oppgave 4.2: FormData validering

Nå har vi klart å hente formData. Før vi gå videre trenger vi å legge inn validering, siden backend funksjonen `createEvent()` har tre påkrevd parameter `userId`, `title` og `location`.

Først hent ut `userId`

```js
const userId = await requireUserId(request);
```

Og legg til validering for `title` og `location`

```js
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

<br />

## Oppgave 4.2: Lagre formData

Bruk `createEvent()` funksjonen for å lagre formData, og sett redirect til eventsside du opprettet.

```js
const event = await createEvent(userId, title, location);
return redirect(`/events/${event.id}`);
```

Fullstende `action` funksjonen ser slik ut

```js
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

Nå, prøv å opprette ny event! ✨🍾

Funker?, Klar for neste?
