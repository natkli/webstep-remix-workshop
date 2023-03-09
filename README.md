# Oppgave 6: Profileside

> **Tags**: [Action](https://remix.run/docs/en/1.14.0/route/action), [Route](https://remix.run/docs/en/1.14.0/file-conventions/routes-files), [Link](https://remix.run/docs/en/1.14.0/components/link#react-router-link), [Form](https://remix.run/docs/en/1.14.0/components/form), [Outlet](https://remix.run/docs/en/1.14.0/components/outlet), [Backend for frontend](https://remix.run/docs/en/1.14.0/guides/bff)

Denne oppgaven skal vi jobbe med profilside og bli bedre kjent med Action, Route, Form og Outlet.

<br>

## Oppgave 6.1: Link

Under `/routes/profile/index.tsx`, oppdater linken slik at det navigere deg videre til `/profile/edit`

```js
<Link to="edit" className="btn-outline btn-primary btn">
  Edit profile
</Link>
```

Trykk på **Edit profile** knappen. Har du lagt merket til at innholdet til **index.tsx** ble erstattet med **edit.tsx**? Dette er på grunn av `<Outlet/>` bytter ut innhold basert på **route** man er på. Er du på `/profile` får du det som ligger i **index.tsx** og **edit.tsx** når du er på `/profile/edit`

<br>

## Oppgave 6.2: Inputs

Legg til to `<TextInput/>` på `routes/profile/edit.tsx`, de skal vi bruke for å oppdatere **username** og **name**.

```js
<TextInput label="Username" name="username" />
```

```js
<TextInput label="Name" name="name" />
```

<br>

## Oppgave 6.3: Backend for fontend (BFF)

Nå har vi lagt inn to input felt for **username** og **name**, men vi mangler fortsatt backend biten. La oss fikse backend for det. Gå inn på `user.server.ts` og legge `updateUser()` funksjon som tar imot tre parameter, `userId`, `username` og `name`.

```js
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

<br>

## Oppgave 6.4: Action

Nå har vi fikset backend og klar for å lagre form data til databasen. Legg til `action` funksjon for å håndtere form submit.

```js
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

Prøv å oppdatere profil med tomt username, gikk det? **NEI!**, dette er fordi at vi har lagt til validerings regler på `action` funksjonen.

<br>

## Oppgave 6.4: Validering

Bruk `useActionData` for å hente ut valideringsmeldinger

```js
const actionData = useActionData<typeof action>();
```

Og legg til feilmeldinger på `<TextInput/>` både for **username** og **name**

```js
<TextInput
  label="Username"
  name="username"
  error={actionData?.errors.username}
/>
```

```js
<TextInput label="Name" name="name" error={actionData?.errors.name} />
```

Prøv igjen nå, lettere å se hva som er feil ikke sant? ✨
