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

export async function updateTransactionService(transaction) {
  const url = `/transaction/`;
  const res = await publicRequest.put(url, transaction);

  return res;
}

export async function deleteTransactionService(transactionId) {
  const url = `/transaction/${transactionId}`;

  const res = await publicRequest.delete(url);

  return res;
}

export async function getAllShareCompanywise() {
  const url = `/transaction/companywise-transaction`;

  const res = await publicRequest.get(url);

  return res.data;
}
