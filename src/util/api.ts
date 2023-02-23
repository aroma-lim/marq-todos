import { TODO } from "../type/types";

export async function callApiWithData<T = any>({
  url,
  method,
  data,
}: {
  url: string;
  method: string;
  data: TODO;
}): Promise<T> {
  const res = await fetch(url, { method, body: JSON.stringify(data) });
  const json = await res?.json();

  if (!res.ok) {
    throw {
      statusText: res.statusText,
      json,
    };
  }

  return json as T;
}

export async function callApi<T = any>({
  url,
  method,
}: {
  url: string;
  method: string;
}): Promise<T> {
  const res = await fetch(url, { method });
  const json = await res?.json();

  if (!res.ok) {
    throw {
      statusText: res.statusText,
      json,
    };
  }

  return json as T;
}
