type Props = {
  path: string;
  body?: any;
  method: string;
};

export const request = async ({ body, path, method }: Props) => {
  try {
    let headers: any = {};
    if (body) {
      headers["Content-type"] = "application/json";
    }

    let response = await fetch(`http://localhost:4000/${path}`, {
      credentials: "include",
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers
    });

    let data = await response.json();
    return { data };
  } catch (error) {
    return { error };
  }
};
