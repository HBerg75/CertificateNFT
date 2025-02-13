import { readContract } from "@wagmi/core";
import { academicCertificateNftAbi } from "../generated";
import { config } from "./wagmi-conf";

const academicCertificateNftAddress = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

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

export const getDefaultAdminRole = async () => {
  const result = await readContract(config, {
    abi: academicCertificateNftAbi,
    address: academicCertificateNftAddress,
    functionName: "DEFAULT_ADMIN_ROLE",
  });
  return result;
};

export const isAdmin = async (address: `0x${string}`) => {
  const result = await readContract(config, {
    abi: academicCertificateNftAbi,
    address: academicCertificateNftAddress,
    functionName: "hasRole",
    args: [await getDefaultAdminRole(), address],
  });
  return result;
};

export const getCertificateIssuerRole = async () => {
  const result = await readContract(config, {
    abi: academicCertificateNftAbi,
    address: academicCertificateNftAddress,
    functionName: "CERTIFICATE_ISSUER",
  });
  return result;
};

export const isCertIssuer = async (address: `0x${string}`) => {
  const result = await readContract(config, {
    abi: academicCertificateNftAbi,
    address: academicCertificateNftAddress,
    functionName: "hasRole",
    args: [await getCertificateIssuerRole(), address],
  });
  return result;
};
