import { publicRequest } from "../fetcher.js";

export async function getAllTransactions() {
  const url = `/transaction/`;

  const res = await publicRequest.get(url);
  return res.data;
}

export async function getShareTypes() {
  const url = `/transaction/share-types/`;
  const res = await publicRequest.get(url);
  return res.data;
}

export async function addTransaction(transaction) {
  const url = "/transaction/";
  const res = await publicRequest.post(url, transaction);

  return res;
}
