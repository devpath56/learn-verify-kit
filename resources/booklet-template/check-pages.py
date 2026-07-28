#!/usr/bin/env python3
"""Ink-based page check for a rendered booklet.

The text-extraction orphan check (decision I5) counts characters, so a page
carrying only ruled write-lines extracts as empty and a page carrying only a
heading extracts as fine. This renders every page and measures how far down
the page the ink actually reaches, which catches both.

Usage:  python3 check-pages.py BOOKLET.pdf [--dpi 40] [--floor 0.45]

Flags any page whose ink stops above `floor` of the page height, except the
last page of the document and any page listed with --allow (1-indexed).
"""
import argparse
import glob
import os
import subprocess
import sys
import tempfile

from PIL import Image


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('pdf')
    ap.add_argument('--dpi', type=int, default=40)
    ap.add_argument('--floor', type=float, default=0.45)
    ap.add_argument('--allow', default='', help='comma-separated page numbers to skip')
    a = ap.parse_args()
    allow = {int(x) for x in a.allow.split(',') if x.strip()}

    with tempfile.TemporaryDirectory() as td:
        subprocess.run(['pdftoppm', '-r', str(a.dpi), '-gray', '-png', a.pdf,
                        os.path.join(td, 'p')], check=True)
        pages = sorted(glob.glob(os.path.join(td, 'p-*.png')))
        bad = []
        for i, f in enumerate(pages, 1):
            im = Image.open(f).convert('L')
            w, h = im.size
            px = im.load()
            last = 0
            for y in range(h):
                for x in range(w):
                    if px[x, y] < 200:
                        last = y
                        break
            frac = last / h
            if frac < a.floor and i not in allow and i != len(pages):
                bad.append((i, round(frac, 2)))
        for i, frac in bad:
            print('page %d: ink stops at %.0f%% of the page' % (i, frac * 100))
        print('%d page(s) flagged of %d' % (len(bad), len(pages)))
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main())
