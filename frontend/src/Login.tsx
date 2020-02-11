import React, { useState } from "react";
import { LoginProps, useLogin } from "./helpers/useLogin";

type Props = {
  setLoggedIn: () => any;
};
export const Login = ({ setLoggedIn }: Props) => {
  let [state, setState] = useState<LoginProps>({});
  let { login, loading, data } = useLogin(setLoggedIn);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {data?.message ? (
        <p style={{ color: "red" }}>{data.message}</p>
      ) : (
        <>
          <p>Welcome to my cool website.</p>
          <p>Username: test</p>
          <p>Password: test</p>
        </>
      )}
      <form
        onSubmit={e => {
          e.preventDefault();
          login(state);
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={state.user || ""}
          onChange={e => setState({ ...state, user: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          value={state.password || ""}
          onChange={e => setState({ ...state, password: e.target.value })}
        />
        <button>Login</button>
      </form>
    </div>
  );
};
