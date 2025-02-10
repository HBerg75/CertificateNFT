import { readContract } from "@wagmi/core";
import {
  academicCertificateNftAbi,
  academicCertificateNftAddress,
} from "../generated";
import { config } from "./wagmi-conf";

export const getTotalCerts = async () => {
  const result = await readContract(config, {
    abi: academicCertificateNftAbi,
    address: academicCertificateNftAddress,
    functionName: "getTotalCertificates",
  });
  return Number(result);
};

export const getCertsById = async (id: number) => {
  const result = await readContract(config, {
    abi: academicCertificateNftAbi,
    address: academicCertificateNftAddress,
    functionName: "getCertificateDetails",
    args: [BigInt(id)],
  });
  return result;
};

export const getCertsPage = async (page: number, pageSize: number) => {
  const certs = [];
  for (let i = page * pageSize; i < (page + 1) * pageSize; i++) {
    const result = await getCertsById(i);
    certs.push(result);
  }
  return certs;
};
