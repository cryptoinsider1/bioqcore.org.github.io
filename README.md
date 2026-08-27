# BioQCore.org v1.0.2-rc.1

Trust-first public website for BioQCore.

Current release stage: public-site hardening and release-candidate validation.

## Local preview

Run the local server on loopback only:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8000/
```

## Deployment

The public website is currently deployed as a static GitHub Pages site.

`CNAME` maps the repository deployment to:

```text
bioqcore.org
```

The repository contains an `_headers` file describing the intended HTTP security and cache policy.

Important: GitHub Pages does not currently apply these repository-defined custom header rules to the production responses. Runtime security headers and custom cache controls therefore require a deployment or edge layer that explicitly supports and enforces them.

The `_headers` file should be treated as a target deployment policy, not as evidence that those headers are active in production.

## Release scope

- Home
- Mission
- Trust Fabric
- Research
- Governance
- Transparency
- Roadmap
- Docs
- Partner
- Contact
- Privacy
- Terms
- Security
- Machine-readable public status
- Machine-readable roadmap
- Public documentation corpus
- Release validator

## Release validation

Run:

```bash
python3 validate_release.py
git diff --check
```

The validator checks core release invariants including:

- required files;
- JSON validity and contracts;
- basic HTML structure;
- internal local references;
- Git tracking of public referenced files;
- language and canonical-page invariants;
- 404 indexing boundary;
- known stale public claims;
- JavaScript syntax;
- target security-header policy.

A successful validator result does not by itself prove production HTTP-header enforcement. Runtime deployment controls must be verified against the deployed site.

## Legal and public-status boundaries

BioQCore is currently a research and infrastructure initiative in research/design/prototype phase.

The public website does not provide medical advice, diagnosis, treatment, emergency support, clinical services, investment products, token sales or financial advice.

Do not submit patient-identifiable information, medical records, scans, genomic data, private keys or confidential documents through public channels.

A public inquiry does not establish a confirmed partnership or other formal relationship unless separately documented.
