# Security Policy

Version: 1.0.2-rc.1
Last reviewed: 2026-08-26

BioQCore.org is currently a public static research and infrastructure website in research/design/prototype phase.

## Reporting a vulnerability

Report suspected vulnerabilities to:

`contact@bioqcore.org`

Use the subject:

`Security Disclosure`

Please provide enough information to reproduce and assess the issue without including unnecessary personal, medical, confidential or sensitive data.

## Allowed

Good-faith, non-destructive reports may include:

- Public static-site security issues.
- Security-header or browser-security-policy issues.
- Accidental exposure of secrets or sensitive configuration.
- Broken access or trust-boundary assumptions visible from public interfaces.
- Other vulnerabilities that can be demonstrated without destructive testing, persistence, data access or service disruption.

## Not allowed

Do not perform:

- Denial-of-service or load testing.
- Social engineering or phishing.
- Malware deployment.
- Persistence or unauthorized modification.
- Data exfiltration.
- Credential attacks.
- Attempts to access private accounts.
- Attempts to obtain patient, medical or other non-public personal data.
- Testing that could impair availability or affect third parties.

## Public-site security boundary

The current public website is static-first.

Repository security configuration, including `_headers`, describes the intended deployment policy. It must not be interpreted as evidence that every listed HTTP security header is currently enforced by the production hosting platform.

Production controls must be verified against actual deployed HTTP responses.

The current GitHub Pages deployment does not apply repository-defined `_headers` rules as production response headers. A supporting deployment or edge layer is required if those policies are to be enforced at runtime.

## Sensitive information

Do not submit through public channels:

- Medical records or diagnostic data.
- Patient-identifiable information.
- Genomic data.
- Authentication credentials.
- Private keys.
- Confidential contracts or internal documents.
- Other sensitive information not required to describe the vulnerability.

If sensitive information appears to be publicly exposed, report its location without copying, downloading or redistributing more data than necessary to identify the issue.

## Disclosure and response

BioQCore may acknowledge, investigate and remediate valid reports according to severity and available project resources.

Submission of a report does not create a contractual relationship, entitlement to compensation or authorization for testing beyond the boundaries described above.

## Bug bounty

No bug bounty or paid vulnerability-reward program is active unless explicitly announced by BioQCore.
