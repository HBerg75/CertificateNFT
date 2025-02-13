// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/AcademicPerformanceNFT.sol";

contract AcademicPerformanceNFTTest is Test {
    event PerformanceNFTMinted(uint256 indexed certId, uint256 indexed studentId, string year, uint256 timestamp);
    event PerformanceNFTRevoked(uint256 indexed certId, uint256 revokedAt, string reason);

    AcademicPerformanceNFT performanceNFT;
    address admin = address(this);
    address user = address(1);
    address unauthorizedUser = address(2);

    function setUp() public {
        performanceNFT = new AcademicPerformanceNFT();
        performanceNFT.grantRole(performanceNFT.DEFAULT_ADMIN_ROLE(), admin);
        performanceNFT.grantRole(performanceNFT.PERFORMANCE_ISSUER(), admin);
    }

    function testMintPerformanceNFT() public {
        string[] memory courses = new string[](2);
        courses[0] = "Blockchain Fundamentals";
        courses[1] = "Smart Contracts";

        string[] memory grades = new string[](2);
        grades[0] = "A";
        grades[1] = "B+";

        string[] memory results = new string[](2);
        results[0] = "18/20";
        results[1] = "16/20";

        vm.prank(admin);
        uint256 certId = performanceNFT.mintPerformanceNFT(
            user, 
            2025001, 
            "Alice Dupont", 
            "3rd Year",
            courses,
            grades,
            results,
            "Good student",
            "ACTIVE",
            "https://ipfs.io/ipfs/hash_du_certificat",
            "ipfs://QmCertCID"
        );

        uint256[] memory certs = performanceNFT.getPerformancesByStudent(2025001);
        assertEq(certs.length, 1);
    }

    function testRevokePerformanceNFT() public {
        string[] memory courses = new string[](2);
        courses[0] = "Blockchain Fundamentals";
        courses[1] = "Smart Contracts";

        string[] memory grades = new string[](2);
        grades[0] = "A";
        grades[1] = "B+";

        string[] memory results = new string[](2);
        results[0] = "18/20";
        results[1] = "16/20";

        vm.prank(admin);
        uint256 certId = performanceNFT.mintPerformanceNFT(
            user, 
            2025001, 
            "Alice Dupont", 
            "3rd Year",
            courses,
            grades,
            results,
            "Good student",
            "ACTIVE",
            "https://ipfs.io/ipfs/hash_du_certificat",
            "ipfs://QmCertCID"
        );

        vm.expectEmit(true, true, true, true);
        emit PerformanceNFTRevoked(certId, block.timestamp, "Administrative error");

        vm.prank(admin);
        performanceNFT.revokePerformanceNFT(certId, "Administrative error");

        AcademicPerformanceNFT.PerformanceInfo memory certInfo = performanceNFT.getPerformanceDetails(certId);
        assertEq(keccak256(bytes(certInfo.status)), keccak256(bytes("REVOKED")), "The certificate should be revoked");
    }

    function testUnauthorizedAccess() public {
        string[] memory courses = new string[](2);
        courses[0] = "Blockchain Fundamentals";
        courses[1] = "Smart Contracts";

        string[] memory grades = new string[](2);
        grades[0] = "A";
        grades[1] = "B+";

        string[] memory results = new string[](2);
        results[0] = "18/20";
        results[1] = "16/20";

        vm.prank(admin);
        uint256 certId = performanceNFT.mintPerformanceNFT(
            user, 
            2025001, 
            "Alice Dupont", 
            "3rd Year",
            courses,
            grades,
            results,
            "Good student",
            "ACTIVE",
            "https://ipfs.io/ipfs/hash_du_certificat",
            "ipfs://QmCertCID"
        );

        vm.prank(unauthorizedUser);
        vm.expectRevert();
        performanceNFT.revokePerformanceNFT(certId, "Unauthorized attempt");
    }

    function testGetPerformancesByStudent() public {
        string[] memory courses = new string[](2);
        courses[0] = "Blockchain Fundamentals";
        courses[1] = "Smart Contracts";

        string[] memory grades = new string[](2);
        grades[0] = "A";
        grades[1] = "B+";

        string[] memory results = new string[](2);
        results[0] = "18/20";
        results[1] = "16/20";

        vm.prank(admin);
        performanceNFT.mintPerformanceNFT(
            user, 
            2025001, 
            "Alice Dupont", 
            "3rd Year",
            courses,
            grades,
            results,
            "Good student",
            "ACTIVE",
            "https://ipfs.io/ipfs/hash_du_certificat",
            "ipfs://QmCertCID1"
        );

        vm.prank(admin);
        performanceNFT.mintPerformanceNFT(
            user, 
            2025001, 
            "Alice Dupont", 
            "4th Year",
            courses,
            grades,
            results,
            "Excellent performance",
            "ACTIVE",
            "https://ipfs.io/ipfs/hash_du_certificat_2",
            "ipfs://QmCertCID2"
        );

        uint256[] memory certs = performanceNFT.getPerformancesByStudent(2025001);
        assertEq(certs.length, 2);
    }

    // function testEventEmissionOnMint() public {
    //     string[] memory courses = new string[](2);
    //     courses[0] = "Blockchain Fundamentals";
    //     courses[1] = "Smart Contracts";

    //     string[] memory grades = new string[](2);
    //     grades[0] = "A";
    //     grades[1] = "B+";

    //     string[] memory results = new string[](2);
    //     results[0] = "18/20";
    //     results[1] = "16/20";

    //     vm.expectEmit(true, true, true, true);
    //     emit PerformanceNFTMinted(0, 2025001, "3rd Year", block.timestamp);
        
    //     vm.prank(admin);
    //     performanceNFT.mintPerformanceNFT(
    //         user, 
    //         2025001, 
    //         "Alice Dupont", 
    //         "3rd Year",
    //         courses,
    //         grades,
    //         results,
    //         "Good student",
    //         "ACTIVE",
    //         "https://ipfs.io/ipfs/hash_du_certificat",
    //         "ipfs://QmCertCID"
    //     );
    // }

        function testUpdateMetadata() public {
        string[] memory courses = new string[](2);
        courses[0] = "Blockchain";
        courses[1] = "Solidity";

        string[] memory grades = new string[](2);
        grades[0] = "A";
        grades[1] = "B+";

        string[] memory results = new string[](2);
        results[0] = "18/20";
        results[1] = "16/20";

        uint256 certId = performanceNFT.mintPerformanceNFT(
            user, 
            2025001, 
            "Alice Dupont", 
            "3rd Year",
            courses,
            grades,
            results,
            "Good student",
            "ACTIVE",
            "https://ipfs.io/ipfs/hash_du_certificat",
            "ipfs://QmCertCID"

        );

        performanceNFT.updatePerformanceMetadata(certId, "https://ipfs.io/ipfs/new_metadata");

        AcademicPerformanceNFT.PerformanceInfo memory certInfo = performanceNFT.getPerformanceDetails(certId);
        assertEq(keccak256(bytes(certInfo.status)), keccak256(bytes("ACTIVE")));
    }

    function testEventEmissionOnRevoke() public {
        string[] memory courses = new string[](2);
        courses[0] = "Blockchain Fundamentals";
        courses[1] = "Smart Contracts";

        string[] memory grades = new string[](2);
        grades[0] = "A";
        grades[1] = "B+";

        string[] memory results = new string[](2);
        results[0] = "18/20";
        results[1] = "16/20";

        vm.prank(admin);
        uint256 certId = performanceNFT.mintPerformanceNFT(
            user, 
            2025001, 
            "Alice Dupont", 
            "3rd Year",
            courses,
            grades,
            results,
            "Good student",
            "ACTIVE",
            "https://ipfs.io/ipfs/hash_du_certificat",
            "ipfs://QmCertCID"
        );

        vm.expectEmit(true, true, true, true);
        emit PerformanceNFTRevoked(certId, block.timestamp, "Administrative error");

        vm.prank(admin);
        performanceNFT.revokePerformanceNFT(certId, "Administrative error");
    }
}
