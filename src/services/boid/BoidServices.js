import { publicRequest } from "../fetcher";

export async function getAllBoid() {
  const url = "boid/";
  const res = await publicRequest.get(url);
  return res.data;
}

export async function addBoid(boid) {
  const url = "boid/";
  const res = await publicRequest.post(url, boid);
  return res;
}

export async function deleteBoidService(id) {
  const url = `/boid/${id}`;
  const res = await publicRequest.delete(url);
  return res;
}

export async function updateBoidService(boid) {
  const url = `/boid/`;
  const res = await publicRequest.put(url, boid);
  return res;
}
