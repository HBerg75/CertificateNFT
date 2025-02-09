// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/CertificateNFT.sol";

contract DeployCertificateNFT is Script {
    function run() external {
        vm.startBroadcast();
        new AcademicCertificateNFT();
        vm.stopBroadcast();
    }
}
