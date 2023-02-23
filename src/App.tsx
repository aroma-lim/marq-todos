import React, { useState } from "react";
import "./App.css";

async function callApi<T = any>({
  url,
  method,
}: {
  url: string;
  method: string;
}) {
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

function App() {
  const [fetchResult, setFetchResult] = useState<string[]>([]);

  return (
    <>
      <button
        className="button-with-margin"
        onClick={async () => {
          try {
            const json = await callApi<{ messages: string }>({
              url: "/test",
              method: "post",
            });

            setFetchResult([...fetchResult, JSON.stringify(json.messages)]);
          } catch (e) {
            console.log("e", e);
          }
        }}
      >
        Add Todo
      </button>

      {fetchResult?.length > 0 && (
        <ul className="fetch-result">
          {[...fetchResult].reverse().map((v, i) => (
            <li key={`${v}-${i}`}>{v}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
