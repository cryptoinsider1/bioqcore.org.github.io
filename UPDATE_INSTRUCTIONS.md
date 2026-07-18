# BioQCore.org v1.0.0-rc — Sequential Update Instructions

## Goal

Update the current GitHub Pages site to the trust-first release without introducing backend complexity.

## Fast path

1. Download and unzip this release package.
2. Open your local repository:

```bash
git clone https://github.com/cryptoinsider1/bioqcore.org.github.io.git
cd bioqcore.org.github.io
git checkout -b site/release-foundation
```

3. Copy all files from this package into the repository root, replacing existing files.

4. Preview locally:

```bash
python3 -m http.server 8000
open http://localhost:8000
```

5. Check critical pages:

- /index.html
- /mission.html
- /trust-fabric.html
- /governance.html
- /roadmap.html
- /privacy.html
- /terms.html
- /security.html
- /partner.html

6. Commit and push:

```bash
git add .
git commit -m "Release BioQCore trust-first website foundation v1.0.0-rc"
git push -u origin site/release-foundation
```

7. Create Pull Request into `main`, review, then merge.

## No-risk fallback

If something goes wrong, revert the PR or switch GitHub Pages back to the previous main commit.

## Acceptance checklist

- No medical advice claims.
- No clinical product claims.
- No token sale / investment offer.
- No confirmed partner claims without signed agreement.
- No patient data intake.
- Mission, Governance, Trust Fabric, Roadmap, Privacy, Terms, Security pages exist.
- `CNAME` contains bioqcore.org.
