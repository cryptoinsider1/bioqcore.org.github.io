#!/usr/bin/env python3

from __future__ import annotations

import json
import re
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent

REQUIRED_FILES = [
    "index.html",
    "index.ru.html",
    "404.html",
    "_headers",
    "src/css/main.css",
    "src/js/site.js",
    "data/status.json",
    "data/roadmap.json",
    "data/changelog.json",
    "images/favicon.ico",
]

JSON_FILES = [
    "data/status.json",
    "data/roadmap.json",
    "data/changelog.json",
]

STALE_PUBLIC_CLAIMS = [
    "Delaware LLC is the current U.S. operational/legal belt",
    "current U.S. operational/legal belt",
    "Not a jurisdictional mash",
    "site becomes a public trust center",
    "partner statuses are not inflated",
]

WORD_JOIN_PATTERNS = [
    r"\bsitenow\b",
    r"\bandcontrolled\b",
    r"\bpartnerinquiry\b",
    r"\bemergencysupport\b",
    r"\bprivacypolicy\b",
    r"\bdeviceservices\b",
    r"\bpublicassets\b",
    r"\bheadersconfigured\b",
    r"\bunlessannounced\b",
    r"/PGP",
]

HTML_SKIP_LINK_SCHEMES = (
    "http:",
    "https:",
    "mailto:",
    "tel:",
    "data:",
    "javascript:",
)

errors: list[str] = []
warnings: list[str] = []


def fail(message: str) -> None:
    errors.append(message)


def warn(message: str) -> None:
    warnings.append(message)


class StructureChecker(HTMLParser):
    void = {
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
    }

    def __init__(self) -> None:
        super().__init__()
        self.stack: list[str] = []
        self.problems: list[str] = []

    def handle_starttag(self, tag, attrs):
        if tag not in self.void:
            self.stack.append(tag)

    def handle_startendtag(self, tag, attrs):
        pass

    def handle_endtag(self, tag):
        if tag in self.void:
            return

        if not self.stack:
            self.problems.append(f"unexpected </{tag}>")
            return

        expected = self.stack[-1]
        if expected != tag:
            self.problems.append(
                f"expected </{expected}>, got </{tag}>"
            )
            return

        self.stack.pop()


class LinkCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)

        if tag in {"a", "link"} and attrs.get("href"):
            self.links.append(attrs["href"])

        if tag in {"script", "img", "source"} and attrs.get("src"):
            self.links.append(attrs["src"])


def check_required_files() -> None:
    for rel in REQUIRED_FILES:
        if not (ROOT / rel).exists():
            fail(f"required file missing: {rel}")


def check_json() -> None:
    for rel in JSON_FILES:
        path = ROOT / rel

        if not path.exists():
            fail(f"JSON missing: {rel}")
            continue

        try:
            json.loads(path.read_text(encoding="utf-8"))
        except Exception as exc:
            fail(f"invalid JSON: {rel}: {exc}")


def check_status_contract() -> None:
    path = ROOT / "data/status.json"

    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return

    required = {
        "schema_version",
        "project",
        "site",
        "trust_center",
        "partner_intake",
        "security_policy",
        "grant_register",
        "clinical_product",
        "token_dao",
        "reviewed_at",
        "message",
    }

    missing = sorted(required - data.keys())

    if missing:
        fail(
            "status.json missing required fields: "
            + ", ".join(missing)
        )

    reviewed = data.get("reviewed_at")
    if reviewed and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", reviewed):
        fail("status.json reviewed_at must be YYYY-MM-DD")


def check_roadmap_contract() -> None:
    path = ROOT / "data/roadmap.json"

    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return

    if not isinstance(data, list):
        fail("roadmap.json must contain a top-level array")
        return

    horizons = {
        item.get("horizon")
        for item in data
        if isinstance(item, dict)
    }

    required_horizons = {
        "Completed / Maintained",
        "Current",
        "Next",
        "Long-term",
        "Conditional",
    }

    missing = sorted(required_horizons - horizons)

    if missing:
        fail(
            "roadmap.json missing horizons: "
            + ", ".join(missing)
        )


def check_html_structure() -> None:
    for path in sorted(ROOT.glob("*.html")):
        parser = StructureChecker()

        try:
            parser.feed(path.read_text(encoding="utf-8"))
            parser.close()
        except Exception as exc:
            fail(f"{path.name}: HTML parse error: {exc}")
            continue

        if parser.stack:
            parser.problems.append(
                "unclosed: " + ", ".join(parser.stack)
            )

        for problem in parser.problems:
            fail(f"{path.name}: {problem}")


def resolve_local_reference(source: Path, ref: str) -> Path | None:
    ref = ref.strip()

    if not ref or ref.startswith("#"):
        return None

    if ref.startswith(HTML_SKIP_LINK_SCHEMES):
        return None

    parsed = urlparse(ref)

    if parsed.scheme or parsed.netloc:
        return None

    clean = parsed.path

    if not clean:
        return None

    if clean.startswith("/"):
        return ROOT / clean.lstrip("/")

    return source.parent / clean


def check_local_references() -> None:
    for path in sorted(ROOT.glob("*.html")):
        parser = LinkCollector()
        parser.feed(path.read_text(encoding="utf-8"))
        parser.close()

        for ref in parser.links:
            target = resolve_local_reference(path, ref)

            if target is None:
                continue

            if not target.exists():
                fail(
                    f"{path.name}: broken local reference "
                    f"{ref!r}"
                )


def check_page_invariants() -> None:
    index = (ROOT / "index.html").read_text(encoding="utf-8")
    index_ru = (ROOT / "index.ru.html").read_text(encoding="utf-8")
    not_found = (ROOT / "404.html").read_text(encoding="utf-8")

    if '<html lang="en">' not in index:
        fail("index.html must declare lang=en")

    if '<html lang="ru">' not in index_ru:
        fail("index.ru.html must declare lang=ru")

    if (
        '<link rel="canonical" href="https://bioqcore.org/">'
        not in index
    ):
        fail("index.html canonical must be https://bioqcore.org/")

    if 'hreflang="en"' not in index:
        fail("index.html missing EN hreflang")

    if 'hreflang="ru"' not in index:
        fail("index.html missing RU hreflang")

    if 'hreflang="en"' not in index_ru:
        fail("index.ru.html missing EN hreflang")

    if 'hreflang="ru"' not in index_ru:
        fail("index.ru.html missing RU hreflang")

    if 'name="robots" content="noindex,follow"' not in not_found:
        fail("404.html must declare noindex,follow")


def check_stale_claims() -> None:
    public_targets = list(ROOT.glob("*.html")) + [
        ROOT / "docs/Governance_Summary.md"
    ]

    for path in public_targets:
        if not path.exists():
            continue

        text = path.read_text(encoding="utf-8")

        for claim in STALE_PUBLIC_CLAIMS:
            if claim.lower() in text.lower():
                fail(
                    f"{path.relative_to(ROOT)} contains stale claim: "
                    f"{claim!r}"
                )


def check_word_joins() -> None:
    targets = list(ROOT.glob("*.html"))

    for path in targets:
        text = path.read_text(encoding="utf-8")

        for pattern in WORD_JOIN_PATTERNS:
            if re.search(pattern, text, flags=re.IGNORECASE):
                fail(
                    f"{path.name}: suspicious word join matches "
                    f"{pattern!r}"
                )


def check_javascript() -> None:
    site_js = ROOT / "src/js/site.js"

    try:
        result = subprocess.run(
            ["node", "--check", str(site_js)],
            capture_output=True,
            text=True,
            check=False,
        )
    except FileNotFoundError:
        warn("node not installed; JS syntax check skipped")
        return

    if result.returncode != 0:
        fail(
            "src/js/site.js syntax check failed:\n"
            + result.stderr.strip()
        )


def check_headers_policy() -> None:
    path = ROOT / "_headers"

    if not path.exists():
        return

    text = path.read_text(encoding="utf-8")

    if "script-src 'self'" not in text:
        fail("_headers missing restrictive script-src")

    if "style-src 'self';" not in text:
        fail("_headers style-src is not restricted to self")

    if "'unsafe-inline'" in text:
        fail("_headers still contains unsafe-inline")

    if "/data/*" not in text or "no-store" not in text:
        fail("_headers must disable caching for public state data")


def main() -> int:
    check_required_files()
    check_json()
    check_status_contract()
    check_roadmap_contract()
    check_html_structure()
    check_local_references()
    check_page_invariants()
    check_stale_claims()
    check_word_joins()
    check_javascript()
    check_headers_policy()

    print("BioQCore Release Validator")
    print("=" * 32)

    for message in warnings:
        print(f"WARNING: {message}")

    for message in errors:
        print(f"FAIL: {message}")

    if errors:
        print()
        print(f"RESULT: FAIL ({len(errors)} issue(s))")
        return 1

    print()
    print("RESULT: PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())