// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title AcademicPerformanceNFT
 * @dev Ce contrat gère les performances académiques annuelles des étudiants en tant que NFTs.
 * Il fonctionne avec CertificateNFT pour représenter chaque année d'étude.
 */
contract AcademicPerformanceNFT is ERC721URIStorage, AccessControl {
    /// @notice Rôle pour les utilisateurs autorisés à créer des NFTs de performance
    bytes32 public constant PERFORMANCE_ISSUER = keccak256("PERFORMANCE_ISSUER");

    /// @dev Compteur interne pour l'attribution des IDs de NFTs
    uint256 private _tokenCounter;

    struct PerformanceInfo {
        uint256 studentId;        // ID unique de l'étudiant
        string studentName;       // Nom de l'étudiant
        string year;              // Année académique
        string[] courses;         // Liste des cours suivis
        string[] grades;          // Notes obtenues
        string[] results;         // Résultats (ex: 18/20, 15/20...)
        string comments;          // Commentaires généraux
        string status;            // Statut académique (SUCCESS, FAILED, REVOKED)
        string ipfsCID;           // CID IPFS contenant les métadonnées du certificat
    }

    /// @dev Associe chaque token ID à ses informations de performance
    mapping(uint256 => PerformanceInfo) private _performanceRecords;

    /// @dev Stocke les NFTs de performance liés à un étudiant (via son ID)
    mapping(uint256 => uint256[]) private _studentPerformances;

    /// @notice Événements pour suivre les actions sur les performances
    event PerformanceMinted(uint256 indexed tokenId, uint256 indexed studentId, string year, uint256 issuedAt);
    event PerformanceUpdated(uint256 indexed tokenId, string newMetadataUri, uint256 updatedAt);
    event PerformanceNFTRevoked(uint256 indexed tokenId, uint256 revokedAt, string justification);
    
    /**
     * @dev Constructeur du contrat.
     * Définit le propriétaire comme administrateur et émetteur de NFTs de performance.
     */
    constructor() ERC721("Academic Performance NFT", "PERFNFT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PERFORMANCE_ISSUER, msg.sender);
    }

    /**
     * @notice Émet un NFT de performance annuelle.
     * @param recipient Adresse Ethereum du détenteur du NFT
     * @param studentId ID unique attribué à l'étudiant
     * @param studentName Nom complet de l'étudiant
     * @param year Année académique (ex: "3rd Year")
     * @param courses Liste des cours
     * @param grades Liste des notes obtenues
     * @param results Résultats des examens
     * @param comments Commentaire général
     * @param status Statut académique (SUCCESS, FAILED, REVOKED)
     * @param metadataUri URI du certificat (ex: IPFS)
     * @return uint256 L'ID du NFT de performance
     */
    function mintPerformanceNFT(
        address recipient,
        uint256 studentId,
        string memory studentName,
        string memory year,
        string[] memory courses,
        string[] memory grades,
        string[] memory results,
        string memory comments,
        string memory status,
        string memory metadataUri,
        string memory ipfsCID
    ) public onlyRole(PERFORMANCE_ISSUER) returns (uint256) {
        uint256 tokenId = _tokenCounter++;

        _performanceRecords[tokenId] = PerformanceInfo({
            studentId: studentId,
            studentName: studentName,
            year: year,
            courses: courses,
            grades: grades,
            results: results,
            comments: comments,
            status: status,
            ipfsCID: ipfsCID
        });

        _studentPerformances[studentId].push(tokenId);

        _mint(recipient, tokenId);
        _setTokenURI(tokenId, metadataUri);

        emit PerformanceMinted(tokenId, studentId, year, block.timestamp);
        return tokenId;
    }

    /**
     * @notice Met à jour les métadonnées d'un NFT de performance.
     * @param tokenId L'ID du NFT à modifier
     * @param newMetadataUri Nouvelle URI contenant les données mises à jour
     */
    function updatePerformanceMetadata(uint256 tokenId, string memory newMetadataUri) public onlyRole(PERFORMANCE_ISSUER) {
        require(_ownerOf(tokenId) != address(0), "NFT introuvable");
        _setTokenURI(tokenId, newMetadataUri);
        emit PerformanceUpdated(tokenId, newMetadataUri, block.timestamp);
    }

    /**
     * @notice Récupère les informations détaillées d'un NFT de performance.
     * @param tokenId L'ID du NFT recherché
     * @return PerformanceInfo Structure contenant toutes les données du NFT
     */
    function getPerformanceDetails(uint256 tokenId) public view returns (PerformanceInfo memory) {
        require(_ownerOf(tokenId) != address(0), "NFT introuvable");
        return _performanceRecords[tokenId];
    }

        /**
    * @notice Révoque un NFT de performance.
    * @dev Seul un administrateur peut révoquer un NFT. Il devient invalide mais n'est pas supprimé.
    * @param tokenId L'ID du NFT à invalider
    * @param justification Motif de la révocation
    */
function revokePerformanceNFT(uint256 tokenId, string memory justification) 
    public virtual onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(_ownerOf(tokenId) != address(0), "NFT introuvable");

        // Mise à jour du statut du NFT
        _performanceRecords[tokenId].status = "REVOKED";
        _performanceRecords[tokenId].comments = justification;

        emit PerformanceNFTRevoked(tokenId, block.timestamp, justification);
    }



    /**
     * @notice Récupère tous les NFTs de performance associés à un étudiant donné.
     * @param studentId L'ID de l'étudiant concerné
     * @return uint256[] Liste des IDs des NFTs appartenant à l'étudiant
     */
    function getPerformancesByStudent(uint256 studentId) public view returns (uint256[] memory) {
        return _studentPerformances[studentId];
    }

    /**
     * @dev Implémente la compatibilité avec ERC721 et AccessControl.
     */
    function supportsInterface(bytes4 interfaceId) public view override(ERC721URIStorage, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
