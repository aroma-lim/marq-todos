import { TODO } from "../type/types";

export async function callApiWithData({
  url,
  method,
  data,
}: {
  url: string;
  method: string;
  data: TODO;
}) {
  const res = await fetch(url, { method, body: JSON.stringify(data) });

  if (!res.ok) {
    throw {
      statusText: res.statusText,
    };
  }

  return res;
}

export async function callApiWithDatas({
  url,
  method,
  datas,
}: {
  url: string;
  method: string;
  datas: TODO[];
}) {
  const res = await fetch(url, { method, body: JSON.stringify(datas) });

  if (!res.ok) {
    throw {
      statusText: res.statusText,
    };
  }

  return res;
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
