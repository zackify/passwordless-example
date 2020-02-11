## Passwordless 2FA Example

This is an example Node server and client following the [Integrated Account](https://passwordless.app/docs/integrated/account) and [Integrated Login](https://passwordless.app/docs/integrated/login) guides. I hope you find this useful and easy to do on your own.

I recommend viewing the code commit by commit.

## Setup

1. Register an account on [Passwordless](http://passwordless.app)
2. Create an app
3. Clone this repo
4. cd server && yarn
5. cd web && yarn
6. cp frontend/.env.example frontend/.env
7. cp server/.env.example server/.env
8. Copy / Paste your client key and server key into the .env files we just made

## Start it up

In two different terminal windows:

```
cd server
yarn start

cd web
yarn start
```

## Play around

- Try logging in with failed creds.
- Login correctly, notice the 2FA screen doesn't show up
- Add a hardware key or OTP
- login again and see the screen comes up and cant be bypassed
- Revoke your 2FA methods and login again
