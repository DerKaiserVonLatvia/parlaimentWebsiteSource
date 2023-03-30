from bs4 import BeautifulSoup as b4
import mammoth as mm
import sys
import os
from xml.etree import ElementTree as ET

path = sys.argv[1]
fileName = sys.argv[2]


with open(path, "rb") as docx:
    result = mm.convert_to_html(docx)
    html = result.value

    id = fileName.split('_')[1].replace('.docx', '').replace('.doc', '')
    articleName = fileName.split('_')[0]
    newPath = (path.replace(fileName, "")).replace("article_buffer", "articles")
    name = "article_" + id + ".html"
    with open(newPath+name, "w") as newFile:
        newFile.write(html)
        tree=ET.ElementTree(file=newPath+"article_data.xml")
        root = tree.getroot()
        print(root)
        article_elem = ET.Element("articleName", {"id": str(id)})
        article_elem.text = articleName
        root.append(article_elem)
        tree.write(newPath+"article_data.xml")
        
    docx.close()
    os.remove(path)

