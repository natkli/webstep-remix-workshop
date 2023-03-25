# Oppgave 6: Profileside

> **Tags**: [Action](https://remix.run/docs/en/1.14.0/route/action), [Route](https://remix.run/docs/en/1.14.0/file-conventions/routes-files), [Link](https://remix.run/docs/en/1.14.0/components/link#react-router-link), [Form](https://remix.run/docs/en/1.14.0/components/form), [Outlet](https://remix.run/docs/en/1.14.0/components/outlet), [Backend for frontend](https://remix.run/docs/en/1.14.0/guides/bff)

I denne oppgaven skal vi jobbe med profilsiden og bli bedre kjent med konseptene Action, Route, Form og Outlet.

## Oppgave 6.1: Link

Gå til `/routes/profile/index.tsx` og oppdater linken slik at den navigerer deg videre til `/profile/edit`:

```tsx
<Link to="edit" className="btn-outline btn-primary btn">
  Edit profile
</Link>
```

I nettleseren, trykk på **Edit profile** knappen.
Ser du at innholdet fra **index.tsx** ble erstattet med innholdet i **edit.tsx**?
Dette skyldes at `<Outlet/>` bytter ut innhold basert på hvilken **route** man er på.
Er du på `/profile` får du det som ligger i **index.tsx** og **edit.tsx** når du er på `/profile/edit`

## Oppgave 6.2: Inputs

Under `routes/profile/edit.tsx`. Legg til to `<TextInput/>` på `ProfileEditPage`-komponenten. Disse skal vi bruke for å oppdatere **username** og **name**.

```tsx
<TextInput label="Username" name="username" />
```

```tsx
<TextInput label="Name" name="name" />
```

## Oppgave 6.3: Backend for frontend (BFF)

Nå har vi lagt inn to input felt for **username** og **name**, men vi mangler fortsatt å koble disse til backend.
Så la oss gjøre nettop det! Gå inn i `user.server.ts` og legg inn en funksjon `updateUser` som tar imot tre parametere: `userId`, `username` og `name`.

```ts
export function updateUser(
  userId: User["id"],
  username: User["username"],
  name: User["email"]
) {
  return prisma.user.update({
    data: {
      name,
      username,
    },
    where: { id: userId },
  });
}
```

## Oppgave 6.4: Action

Nå som vi har opprettet en funksjon for å oppdatere brukeren backend er vi klar for å lagre form dataen til databasen. Tilbake til`routes/profile/edit.tsx`. Legg til en `action` funksjon for å håndtere form submit:

```tsx
export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const username = formData.get("username");
  const name = formData.get("name");

  if (typeof username !== "string" || username.length === 0) {
    return json(
      { errors: { username: "Username is required", name: null } },
      { status: 400 }
    );
  }

  if (typeof username !== "string" || username.length !== 4) {
    return json(
      {
        errors: {
          username: "Username must be 4 characters",
          name: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof name !== "string" || name.length === 0) {
    return json(
      { errors: { username: null, name: "Name is required" } },
      { status: 400 }
    );
  }

  await updateUser(userId, username, name);

  return redirect(`/profile`);
}
```

Prøv å oppdatere profilen med tomt username. Funket det? **NIKS!**. Dette er fordi vi har lagt til valideringer av formData.

## Oppgave 6.4: Validering

Bruk nå `useActionData` for å hente ut valideringsmeldingene:

```ts
const actionData = useActionData<typeof action>();
```

Videre ønsker vi å knytte feilmeldingene opp mot `<TextInput />` både for **username** og **name**:

```tsx
<TextInput
  label="Username"
  name="username"
  error={actionData?.errors.username}
/>
```

```tsx
<TextInput label="Name" name="name" error={actionData?.errors.name} />
```

Prøv igjen nå. Litt lettere å se hva som er feil, ikke sant? ✨
