with open("page/categorie.html", "r") as f:
    html = f.read()

import re

# find breadcrumbs
bc_start = html.find('<section class="breadcrumbs-parent">')
bc_end = html.find('</section>', bc_start) + len('</section>')
bc_html = html[bc_start:bc_end]

# remove it from original location
html = html[:bc_start] + html[bc_end:]

# insert it before <h1 class="h1">Каталог</h1>
h1_start = html.find('<h1 class="h1">Каталог</h1>')
html = html[:h1_start] + bc_html + "\n            " + html[h1_start:]

with open("page/categorie.html", "w") as f:
    f.write(html)
