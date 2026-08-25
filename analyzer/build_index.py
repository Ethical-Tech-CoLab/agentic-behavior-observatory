#!/usr/bin/env python3
"""Collect data/reports/*.json into docs/data/index.json for the dashboard."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REPORTS = ROOT / "data" / "reports"
OUT = ROOT / "docs" / "data"


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    reports = []
    for f in sorted(REPORTS.glob("*.json")):
        r = json.loads(f.read_text())
        reports.append(r)
        (OUT / f.name).write_text(json.dumps(r, separators=(",", ":")))
    index = [{k: r[k] for k in ("repo", "url", "description", "stars", "language",
                                "scores", "primary_axis", "relevance", "analysed_at")}
             | {"dimensions": list(r["dimensions"])[:12],
                "models": [m["model"] for m in r["models"][:8]],
                "file": r["repo"].replace("/", "__") + ".json"}
             for r in reports]
    index.sort(key=lambda r: -r["relevance"])
    (OUT / "index.json").write_text(json.dumps(index, indent=1) + "\n")
    print(f"indexed {len(index)} report(s) → docs/data/index.json")


if __name__ == "__main__":
    main()
