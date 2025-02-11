// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title AcademicCertificateNFT
 * @dev Ce contrat permet de gérer les diplômes sous forme de NFT pour une institution académique.
 * Il utilise AccessControl pour gérer les permissions d'émission et de révocation.
 */
contract AcademicCertificateNFT is ERC721URIStorage, AccessControl {
    /// @notice Rôle pour les utilisateurs autorisés à créer des certificats
    bytes32 public constant CERTIFICATE_ISSUER =
        keccak256("CERTIFICATE_ISSUER");

    /// @dev Compteur interne pour l'attribution des IDs de certificats
    uint256 private _tokenCounter;

    /**
     * @dev Structure contenant les informations d'un certificat académique.
     */
    struct CertificateInfo {
        string studentFullName; // Nom complet de l'étudiant
        uint256 studentId; // ID unique de l'étudiant
        string diplomaTitle; // Nom du diplôme obtenu
        uint256 graduationYear; // Année d'obtention du diplôme
        string academicGrade; // Mention ou note obtenue
        bool isActive; // Indique si le certificat est valide
        uint256 issuedAt; // Timestamp de l'émission
    }

    /// @dev Associe chaque token ID à ses informations de certificat
    mapping(uint256 => CertificateInfo) private _certificateRecords;

    /// @dev Stocke les certificats liés à un étudiant (via son ID)
    mapping(uint256 => uint256[]) private _studentCertificates;

    /// @notice Événements pour suivre les actions sur les certificats
    event CertificateMinted(
        uint256 indexed certificateId,
        uint256 indexed studentId,
        string diplomaTitle,
        uint256 issuedAt
    );
    event CertificateRevoked(
        uint256 indexed certificateId,
        uint256 revokedAt,
        string justification
    );
    event CertificateMetadataUpdated(
        uint256 indexed certificateId,
        string newMetadataUri,
        uint256 updatedAt
    );

    /**
     * @dev Constructeur du contrat.
     * Définit le propriétaire comme administrateur et émetteur par défaut des certificats.
     */
    constructor() ERC721("Academic Diploma NFT", "DIPLOMA") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); // Le créateur du contrat devient l'admin
        _grantRole(CERTIFICATE_ISSUER, msg.sender); // L'admin est aussi un émetteur de certificats
    }

    /**
     * @notice Émet un nouveau certificat en NFT.
     * @dev Seul un compte ayant le rôle CERTIFICATE_ISSUER peut exécuter cette fonction.
     * @param recipient Adresse Ethereum du détenteur du certificat
     * @param studentFullName Nom complet de l'étudiant
     * @param studentId ID unique attribué à l'étudiant
     * @param diplomaTitle Titre du diplôme obtenu
     * @param academicGrade Mention ou note obtenue
     * @param metadataUri URI du certificat (ex: lien vers un PDF sur IPFS)
     * @return uint256 L'ID du certificat NFT
     */
    function mintCertificate(
        address recipient,
        string memory studentFullName,
        uint256 studentId,
        string memory diplomaTitle,
        string memory academicGrade,
        string memory metadataUri
    ) public onlyRole(CERTIFICATE_ISSUER) returns (uint256) {
        uint256 certificateId = _tokenCounter++;

        // Stocke les données du certificat
        _certificateRecords[certificateId] = CertificateInfo({
            studentFullName: studentFullName,
            studentId: studentId,
            diplomaTitle: diplomaTitle,
            graduationYear: block.timestamp / 365 days + 1970, // Convertit en année
            academicGrade: academicGrade,
            isActive: true,
            issuedAt: block.timestamp
        });

        // Associe le certificat à l'étudiant
        _studentCertificates[studentId].push(certificateId);

        // Effectue le mint du NFT
        _mint(recipient, certificateId);
        _setTokenURI(certificateId, metadataUri);

        // Émet un événement pour signaler la création du certificat
        emit CertificateMinted(
            certificateId,
            studentId,
            diplomaTitle,
            block.timestamp
        );

        return certificateId;
    }

    /**
     * @notice Révoque un certificat.
     * @dev Seul un administrateur peut révoquer un certificat. Il devient invalide mais n'est pas supprimé.
     * @param certificateId L'ID du certificat à invalider
     * @param justification Motif de la révocation
     */
    function revokeCertificate(
        uint256 certificateId,
        string memory justification
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(
            _ownerOf(certificateId) != address(0),
            "Certificat introuvable"
        );
        require(
            _certificateRecords[certificateId].isActive,
            "Certificat deja revoquer"
        );

        _certificateRecords[certificateId].isActive = false;
        emit CertificateRevoked(certificateId, block.timestamp, justification);
    }

    /**
     * @notice Met à jour les métadonnées d'un certificat.
     * @dev Seul un émetteur de certificat peut modifier les informations d'un NFT existant.
     * @param certificateId L'ID du certificat à modifier
     * @param newMetadataUri Nouvelle URI contenant les données du certificat
     */
    function updateCertificateMetadata(
        uint256 certificateId,
        string memory newMetadataUri
    ) public onlyRole(CERTIFICATE_ISSUER) {
        require(
            _ownerOf(certificateId) != address(0),
            "Certificat introuvable"
        );
        require(
            _certificateRecords[certificateId].isActive,
            "Ce certificat est revoquer"
        );

        _setTokenURI(certificateId, newMetadataUri);
        emit CertificateMetadataUpdated(
            certificateId,
            newMetadataUri,
            block.timestamp
        );
    }

    /**
     * @notice Récupère tous les certificats associés à un étudiant donné.
     * @param studentId L'ID de l'étudiant concerné
     * @return uint256[] Liste des IDs des certificats appartenant à l'étudiant
     */
    function getCertificatesByStudent(
        uint256 studentId
    ) public view returns (uint256[] memory) {
        return _studentCertificates[studentId];
    }

    /**
     * @notice Récupère les informations détaillées d'un certificat.
     * @param certificateId L'ID du certificat recherché
     * @return CertificateInfo Structure contenant toutes les données du certificat
     */
    function getCertificateDetails(
        uint256 certificateId
    ) public view returns (CertificateInfo memory) {
        require(
            _ownerOf(certificateId) != address(0),
            "Certificat introuvable"
        );
        return _certificateRecords[certificateId];
    }

    /**
     * @dev Implémente la compatibilité avec ERC721 et AccessControl.
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721URIStorage, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @notice Récupère le nombre total de certificats émis.
     * @return uint256 Le nombre total de certificats
     */
    function getTotalCertificates() public view returns (uint256) {
        return _tokenCounter;
    }
}
