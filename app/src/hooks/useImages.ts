import useSWR from "swr";
import api from "../lib/api";

const fetcher = ([url, query]: [string, string]) =>
  api.get(`${url}?search=${query}`).then((res) => res.data.reverse());

export function useImages(query: string) {
  return useSWR([`/images`, query], fetcher);
}
