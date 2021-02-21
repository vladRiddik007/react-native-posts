const headers = { "Content-Type": "application/json" };
const BASE_URL =
  "http://my-json-server.typicode.com/orlovskyalex/jellyfish-fake-rest-server/";

export const ApiGet = (url: string) => {
  return fetch(`${BASE_URL}${url}`, { headers });
};

export async function getID(url: string) {
  try {
    const res = await fetch(`${BASE_URL}${url}`, { headers });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("There was an error!", error);
  }
}
