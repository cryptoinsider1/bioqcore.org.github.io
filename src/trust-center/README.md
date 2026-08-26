# BioQCore Trust Center — Reference Architecture

Status: Design / Prototype
Public classification: Reference specification
Operational status: Not deployed as a production Trust Center

This directory contains architecture, API contracts, schemas, PKI profiles,
configuration examples, audit structures and diagrams for the planned
BioQCore Trust Center.

## Important boundary

The contents of this directory are design and reference artifacts.

They MUST NOT be interpreted as evidence that:

- a production BioQCore Trust Center is currently deployed;
- the documented API endpoints are operational;
- a production PKI or certificate authority is active;
- production certificates are being issued;
- published configuration examples are production configuration;
- example DIDs, certificate requests, identities or audit records represent
  real persons, systems, certificates or operational infrastructure.

Example values are synthetic unless explicitly documented otherwise.

## Security

No production private keys, credentials, authentication tokens, recovery
material or operational secrets may be committed to this directory.

Paths such as:

`private/root.key`

or similar values appearing in example PKI configuration files describe
expected filesystem structure only. They do not represent committed key
material.

## Deployment

Any future production deployment requires a separate security review,
secret-management boundary, runtime configuration, infrastructure controls
and operational approval.

See the public BioQCore security policy and architecture documentation for
current project boundaries.
