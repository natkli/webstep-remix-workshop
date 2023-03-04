# Oppgave 6: Profileside

Denne oppgaven skal vi jobbe med profilside. Oppgaven er litt større enn tidligere oppgaver og består av fire deloppgaver.

> **Tags**: [Action](https://remix.run/docs/en/1.14.0/route/action), [Route](https://remix.run/docs/en/1.14.0/file-conventions/routes-files), [Link](https://remix.run/docs/en/1.14.0/components/link#react-router-link), [Form](https://remix.run/docs/en/1.14.0/components/form), [Outlet](https://remix.run/docs/en/1.14.0/components/outlet)

<br>

## Oppgave 6.1: Link, Route og Outlet

Under `/routes/profile/index.tsx`, oppdater linken slik at det navigere deg videre til `/profile/edit`

```js
<Link to="edit" className="btn-outline btn-primary btn">
  Edit profile
</Link>
```

Trykk på `Edit profile` knappen. Har du lagt merket til at innholdet til `index.tsx` ble erstattet med `edit.tsx` ? <br /> Dette er på grunn av `<Outlet/>` komponenten på `profile.tsx` som bytter ut innhold basert på **route**.

<br>

## Oppgave 6.2: Form

Legg til to text input på `routes/profile/edit.tsx` vi skal bruke for å oppdatere `username` og `name`.

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

Nå skal vi lagre form data med `action` funksjon. Bytt ut eksisterende `action` med koden under

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

Prøv å oppdatere profil med tomt username, gikk det? **NEI!**, dette er fordi at vi har lagt til validerings regler på `action` funksjonen. <br/><br/>Legg til feilmelding på `<TextInput/>` for `username` og `name`

```js
error={actionData?.errors.username}
error={actionData?.errors.name}
```
