## Quick Start

```bash
git clone https://github.com/HBerg75/CertificateNFT.git
cd CertificateNFT
```

Test the contract

```bash
forge install
forge test -vv
forge coverage
forge coverage --report debug > report.log
```

Deploy the contract on the Ethereum network

```bash
source .env
forge wallet unlock --private-key PRIVATE_KEY
forge script --chain-id 43113 script/DeployCertificateNFT.s.sol:DeployCertificateNFT --rpc-url $RPC_URL -vvv --broadcast --sender $PUBLIC_WALLET_ADDRESS --private-key PRIVATE_KEY
```

You can delete --broadcast if you just want to see if the deployment script is correct
