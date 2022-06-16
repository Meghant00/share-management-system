import { publicRequest } from "../fetcher";

export async function getAllCompany() {
  const url = "company/";
  const res = await publicRequest.get(url);
  return res.data;
}

export async function addCompany(company) {
  const url = "company/";
  const res = await publicRequest.post(url, company);

  return res;
}

export async function deleteCompanyService(id) {
  const url = `/company/${id}`;
  const res = await publicRequest.delete(url);
  return res;
}

export async function updateCompanyService(company) {
  const url = `/company/`;
  const res = await publicRequest.put(url, company);
  return res;
}
