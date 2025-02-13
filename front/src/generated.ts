import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AcademicCertificateNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const academicCertificateNftAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'CERTIFICATE_ISSUER',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'certificateId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getCertificateDetails',
    outputs: [
      {
        name: '',
        internalType: 'struct AcademicCertificateNFT.CertificateInfo',
        type: 'tuple',
        components: [
          { name: 'studentFullName', internalType: 'string', type: 'string' },
          { name: 'studentId', internalType: 'uint256', type: 'uint256' },
          { name: 'diplomaTitle', internalType: 'string', type: 'string' },
          { name: 'graduationYear', internalType: 'uint256', type: 'uint256' },
          { name: 'academicGrade', internalType: 'string', type: 'string' },
          { name: 'isActive', internalType: 'bool', type: 'bool' },
          { name: 'issuedAt', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'studentId', internalType: 'uint256', type: 'uint256' }],
    name: 'getCertificatesByStudent',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTotalCertificates',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'studentFullName', internalType: 'string', type: 'string' },
      { name: 'studentId', internalType: 'uint256', type: 'uint256' },
      { name: 'diplomaTitle', internalType: 'string', type: 'string' },
      { name: 'academicGrade', internalType: 'string', type: 'string' },
      { name: 'metadataUri', internalType: 'string', type: 'string' },
    ],
    name: 'mintCertificate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'certificateId', internalType: 'uint256', type: 'uint256' },
      { name: 'justification', internalType: 'string', type: 'string' },
    ],
    name: 'revokeCertificate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'certificateId', internalType: 'uint256', type: 'uint256' },
      { name: 'newMetadataUri', internalType: 'string', type: 'string' },
    ],
    name: 'updateCertificateMetadata',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'certificateId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'newMetadataUri',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'updatedAt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'CertificateMetadataUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'certificateId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'studentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'diplomaTitle',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'issuedAt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'CertificateMinted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'certificateId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'revokedAt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'justification',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'CertificateRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link academicCertificateNftAbi}__
 */
export const useReadAcademicCertificateNft =
  /*#__PURE__*/ createUseReadContract({ abi: academicCertificateNftAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"CERTIFICATE_ISSUER"`
 */
export const useReadAcademicCertificateNftCertificateIssuer =
  /*#__PURE__*/ createUseReadContract({
    abi: academicCertificateNftAbi,
    functionName: 'CERTIFICATE_ISSUER',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadAcademicCertificateNftDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: academicCertificateNftAbi,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadAcademicCertificateNftBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: academicCertificateNftAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadAcademicCertificateNftGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: academicCertificateNftAbi,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"getCertificateDetails"`
 */
export const useReadAcademicCertificateNftGetCertificateDetails =
  /*#__PURE__*/ createUseReadContract({
    abi: academicCertificateNftAbi,
    functionName: 'getCertificateDetails',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"getCertificatesByStudent"`
 */
export const useReadAcademicCertificateNftGetCertificatesByStudent =
  /*#__PURE__*/ createUseReadContract({
    abi: academicCertificateNftAbi,
    functionName: 'getCertificatesByStudent',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadAcademicCertificateNftGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: academicCertificateNftAbi,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"getTotalCertificates"`
 */
export const useReadAcademicCertificateNftGetTotalCertificates =
  /*#__PURE__*/ createUseReadContract({
    abi: academicCertificateNftAbi,
    functionName: 'getTotalCertificates',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadAcademicCertificateNftHasRole =
  /*#__PURE__*/ createUseReadContract({
    abi: academicCertificateNftAbi,
    functionName: 'hasRole',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadAcademicCertificateNftIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: academicCertificateNftAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"name"`
 */
export const useReadAcademicCertificateNftName =
  /*#__PURE__*/ createUseReadContract({
    abi: academicCertificateNftAbi,
    functionName: 'name',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadAcademicCertificateNftOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: academicCertificateNftAbi,
    functionName: 'ownerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadAcademicCertificateNftSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: academicCertificateNftAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadAcademicCertificateNftSymbol =
  /*#__PURE__*/ createUseReadContract({
    abi: academicCertificateNftAbi,
    functionName: 'symbol',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadAcademicCertificateNftTokenUri =
  /*#__PURE__*/ createUseReadContract({
    abi: academicCertificateNftAbi,
    functionName: 'tokenURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link academicCertificateNftAbi}__
 */
export const useWriteAcademicCertificateNft =
  /*#__PURE__*/ createUseWriteContract({ abi: academicCertificateNftAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteAcademicCertificateNftApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: academicCertificateNftAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteAcademicCertificateNftGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: academicCertificateNftAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"mintCertificate"`
 */
export const useWriteAcademicCertificateNftMintCertificate =
  /*#__PURE__*/ createUseWriteContract({
    abi: academicCertificateNftAbi,
    functionName: 'mintCertificate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteAcademicCertificateNftRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: academicCertificateNftAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"revokeCertificate"`
 */
export const useWriteAcademicCertificateNftRevokeCertificate =
  /*#__PURE__*/ createUseWriteContract({
    abi: academicCertificateNftAbi,
    functionName: 'revokeCertificate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteAcademicCertificateNftRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: academicCertificateNftAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteAcademicCertificateNftSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: academicCertificateNftAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteAcademicCertificateNftSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: academicCertificateNftAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteAcademicCertificateNftTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: academicCertificateNftAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"updateCertificateMetadata"`
 */
export const useWriteAcademicCertificateNftUpdateCertificateMetadata =
  /*#__PURE__*/ createUseWriteContract({
    abi: academicCertificateNftAbi,
    functionName: 'updateCertificateMetadata',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link academicCertificateNftAbi}__
 */
export const useSimulateAcademicCertificateNft =
  /*#__PURE__*/ createUseSimulateContract({ abi: academicCertificateNftAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateAcademicCertificateNftApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: academicCertificateNftAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateAcademicCertificateNftGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: academicCertificateNftAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"mintCertificate"`
 */
export const useSimulateAcademicCertificateNftMintCertificate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: academicCertificateNftAbi,
    functionName: 'mintCertificate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateAcademicCertificateNftRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: academicCertificateNftAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"revokeCertificate"`
 */
export const useSimulateAcademicCertificateNftRevokeCertificate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: academicCertificateNftAbi,
    functionName: 'revokeCertificate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateAcademicCertificateNftRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: academicCertificateNftAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateAcademicCertificateNftSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: academicCertificateNftAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateAcademicCertificateNftSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: academicCertificateNftAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateAcademicCertificateNftTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: academicCertificateNftAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `functionName` set to `"updateCertificateMetadata"`
 */
export const useSimulateAcademicCertificateNftUpdateCertificateMetadata =
  /*#__PURE__*/ createUseSimulateContract({
    abi: academicCertificateNftAbi,
    functionName: 'updateCertificateMetadata',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link academicCertificateNftAbi}__
 */
export const useWatchAcademicCertificateNftEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: academicCertificateNftAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchAcademicCertificateNftApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: academicCertificateNftAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchAcademicCertificateNftApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: academicCertificateNftAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 */
export const useWatchAcademicCertificateNftBatchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: academicCertificateNftAbi,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `eventName` set to `"CertificateMetadataUpdated"`
 */
export const useWatchAcademicCertificateNftCertificateMetadataUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: academicCertificateNftAbi,
    eventName: 'CertificateMetadataUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `eventName` set to `"CertificateMinted"`
 */
export const useWatchAcademicCertificateNftCertificateMintedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: academicCertificateNftAbi,
    eventName: 'CertificateMinted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `eventName` set to `"CertificateRevoked"`
 */
export const useWatchAcademicCertificateNftCertificateRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: academicCertificateNftAbi,
    eventName: 'CertificateRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `eventName` set to `"MetadataUpdate"`
 */
export const useWatchAcademicCertificateNftMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: academicCertificateNftAbi,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchAcademicCertificateNftRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: academicCertificateNftAbi,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchAcademicCertificateNftRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: academicCertificateNftAbi,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchAcademicCertificateNftRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: academicCertificateNftAbi,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link academicCertificateNftAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchAcademicCertificateNftTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: academicCertificateNftAbi,
    eventName: 'Transfer',
  })
