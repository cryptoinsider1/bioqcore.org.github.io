# Architecture Overview

Document status: Public architecture overview
Maturity: Design / prototype
Last reviewed: 2026-08-26

BioQCore Trust Fabric is modeled as a layered target architecture currently under design and prototype development.

## Target layers

1. **Root & Vault Layer** — intended to support offline root functions, encrypted storage, key governance and associated policies.
2. **Trust Center Layer** — target capabilities include intermediate/issuing CA functions, DID registry, audit logging, CRL/OCSP and API interfaces.
3. **Edge & Client Layer** — target capabilities include edge nodes, VPN/mTLS connectivity, web clients and a future iOS agent.

## Current boundary

These components describe the target architecture and should not be interpreted as a statement that all listed services are currently deployed, production-ready or operational.

No production certificates are issued to third parties unless explicitly documented.
