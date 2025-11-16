# BioQCore Trust Center API — Version 1.0  
### Formal Specification, Architecture & Protocol Design  
**BioQCore Research & Infrastructure Consortium — 2025**

---

## Abstract

This document defines the **BioQCore Trust Center API v1.0**, the core trust layer
enabling secure identity, certificate management, audit integrity, and
post-quantum–ready communication for the BioQCore ecosystem.

The specification integrates:

- GraphQL Trust API  
- REST fallback (OpenAPI 3.1)  
- PKI hierarchy (Root → Intermediate → Issuing)  
- DID Registry  
- Audit Merkle Log  
- PQC hybrid cryptography  
- iOS & web client integration  

The Trust Center is the canonical “source of trust” for the BioQCore
humanitarian-scientific ecosystem, supporting medicine, AI systems, research labs,
and resilient infrastructure.

---

## 1. Architecture Overview

The Trust Center is composed of four coordinated subsystems:

1. **PKI Layer**  
   Root CA (offline), Intermediate CA, and Issuing CA form a NIST-grade certificate chain.

2. **Identity Layer**  
   A DID registry implementing W3C DID Core, extended with BioQCore-specific metadata.

3. **API Layer**  
   A dual GraphQL/REST interface for certificate issuing, DID management, audit logging, and health monitoring.

4. **Audit Layer**  
   A Merkle-based append-only ledger ensuring immutable traceability.

Each subsystem is formally isolated but cryptographically linked.

---

## 2. PKI Specification

### 2.1 Root CA

- Stored on **Raspberry Pi 4**  
- Offline, encrypted SSD (LUKS2/AES-XTS)  
- Physical access required  
- Signing only Intermediate CA certificates  
- Validity: **10 years**  
- Algorithm: **ECDSA P-384** + optional **Dilithium-3 hybrid**

### 2.2 Intermediate CA

- Hosted on Trust Center  
- Signs issuing certificates  
- Maintains CRL/OCSP endpoints  
- Validity: **5 years**

### 2.3 Issuing CA

- Issues client/server/agent/mobile certificates  
- Validity: 1–2 years per profile  
- Supports PQC-hybrid certificates

---

## 3. API Design

### 3.1 GraphQL Schema

Defined in `schema.graphql`.

Main entrypoints:

- `health`
- `issueCertificate`
- `registerDID`
- `resolveDID`
- `auditAppend`

GraphQL is preferred for internal systems and the iOS agent.

---

## 4. REST API (OpenAPI 3.1)

Defined in `openapi.yaml`.

Endpoints:

| Endpoint | Method | Description |
|---------|--------|-------------|
| `/health` | GET | System liveness & PQC capabilities |
| `/pki/issue-cert` | POST | CSR → certificate |
| `/did/register` | POST | Create DID |
| `/did/resolve/{id}` | GET | Resolve DID document |
| `/audit/append` | POST | Append audit entry |

---

## 5. DID Registry

BioQCore uses:

- **Ed25519** keys by default  
- Optional PQ key material (Kyber/Dilithium)  
- DID syntax:  



Registry guarantees:

- atomic updates  
- cryptographic proofs via Merkle anchors  
- compatibility with future zk-based proofs

---

## 6. Audit Log

### 6.1 Structure

- Audit entries are canonical JSON objects:

```json
{
"actor": "system",
"action": "CERT_ISSUED",
"timestamp": "2025-01-09T10:00:00Z",
"target": "CN=bioqcore.test",
"details": {
  "serial": "01A9DF3299"
}
}
```

### 6.2 Merkle Structure
- Each entry hashed:

```ini
H = SHA-256( canonical_json(entry) )
```

Tree root published hourly.

---

## 7. Post-Quantum Cryptography
- Supported algorithms:

- Kyber-768 (KEM)

- Dilithium-2/3 (signatures)

- Hybrid ECDSA-P384 + Dilithium

- PQC metadata defined in:

```pgsql
schemas/pqc_metadata.schema.json
```

---

## 8. iOS Agent Integration
- The iOS BioQCore App uses:

- DID Wallet

- GraphQL Trust API

- Local secure enclave key material

- mTLS channels to Trust Center

- Mobile certificates use profile:


```bash
pki/profiles/mobile.json
```

## 9. Security Guarantees
- Zero-Trust design

- Immutable audit

- PQC-ready chain

- Isolation of Root CA

- Signed DID documents

- Strict JSON Schema validation

- All Trust Center actions are logged

## 10. Versioning
```ini
VERSION = 1.0.0
```

---

## 11. Future Work
- PQC-only certificates

- zk-SNARK proofs for DID updates

- Decentralized audit replication

- Formal proofs of API safety

---


## **12. Referenes**

- NIST SP 800-204A

- W3C DID Core

- RFC 5280 (X.509 PKI)

- NIST PQC Round-3 algorithms

- “Merkle Trees and Integrity Guarantees”, ACM, 2019

**BioQCore Trust Center API v1.0 — End of Specification**

---
