# Oppgave 6: Profileside

> **Tags**: [Action](https://remix.run/docs/en/1.14.0/route/action), [Route](https://remix.run/docs/en/1.14.0/file-conventions/routes-files), [Link](https://remix.run/docs/en/1.14.0/components/link#react-router-link), [Form](https://remix.run/docs/en/1.14.0/components/form), [Outlet](https://remix.run/docs/en/1.14.0/components/outlet)

Denne oppgaven skal vi jobbe med profilside og bli bedre kjent med Action, Route, Form og Outlet.

<br>

## Oppgave 6.1: Profile side

Under `/routes/profile/index.tsx`, oppdater linken slik at det navigere deg videre til `/profile/edit`

```js
<Link to="edit" className="btn-outline btn-primary btn">
  Edit profile
</Link>
```

Trykk på `Edit profile` knappen. Har du lagt merket til at innholdet til `index.tsx` ble erstattet med `edit.tsx` ? <br /> Dette er på grunn av `<Outlet/>` bytter ut innhold basert på **route** man er på. Er du på `/profile` får du det som ligger i `index.tsx` og `edit.tsx` når du er på `/profile/edit`

<br>

## Oppgave 6.2: Skjema for å oppdatere profil data

Legg til to `<TextInput/>` på `routes/profile/edit.tsx`, de skal vi bruke for å oppdatere `username` og `name`.

```js
<TextInput
  label="Username"
  name="username"
  ref={usernameRef}
  placeholder={user?.username}
/>
```

```js
<TextInput
  label="Name"
  name="name"
  ref={usernameRef}
  placeholder={user?.username}
/>
```

<br>

## Oppgave 6.3: Action

Nå skal vi lagre form data til databasen med `action` funksjon. Oppdater funksjonen med koden under.

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

<br>

## Oppgave 6.4: Validering

Prøv å oppdatere profil med tomt username, gikk det? **NEI!**, dette er fordi at vi har lagt til validerings regler på `action` funksjonen. <br/><br/>Legg til feilmelding på `<TextInput/>` både for `username` og `name`

```js
error={actionData?.errors.username}
```

```js
error={actionData?.errors.name}
```

Prøv igjen nå, mer tydelig å se hva som er feil ikke sant? ✨
