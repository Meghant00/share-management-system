import { publicRequest } from "../fetcher";

export async function getAllBoid() {
  const url = "boid/";
  const res = await publicRequest.get(url);
  return res.data;
}
