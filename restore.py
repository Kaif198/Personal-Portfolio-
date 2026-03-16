import re
import os

def clean_lines(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    cleaned = []
    for line in lines:
        match = re.search(r'^\d+:\s(.*)$', line)
        if match:
            cleaned.append(match.group(1) + '\n')
        else:
            cleaned.append(line)
    return ''.join(cleaned)

orig_css = clean_lines('.tmp_style.txt')
orig_js = clean_lines('.tmp_main.txt')

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('<div class="custom-cursor" aria-hidden="true"></div>\n', '')
html = html.replace('<div class="cursor-dot" aria-hidden="true"></div>\n', '')
html = html.replace('<div class="metadata-cursor" aria-hidden="true">[0.00, 0.00]</div>\n', '')

html = html.replace('<link rel="stylesheet" href="styles.css">', f'<style>\n{orig_css.strip()}\n  </style>')
html = html.replace('<script src="main.js" defer></script>', f'<script>\n{orig_js.strip()}\n</script>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

for f in ['.tmp_style.txt', '.tmp_main.txt', 'styles.css', 'main.js']:
    if os.path.exists(f):
        os.remove(f)

print("Restoration complete.")
