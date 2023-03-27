from bs4 import BeautifulSoup as b4
import mammoth as mm
import sys

path = sys.argv[1]


with open(path, "rb") as docx:
    result = mm.convert_to_html(docx)
    html = result.value
    print(html)





