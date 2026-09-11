
# File to build html file based from a template.
# should build both the section's html and post html itself

from pathlib import Path
import os

import dominate
import frontmatter as FM
from dominate.tags import *
from dominate.util import *
import md

METADATA_PATH = "../metadata"

SECTION_PATH = "../raiten.nekoweb.org/blog.html"
BLOG_PATH = "../raiten.nekoweb.org"

SECTION = "/blog"
TITLE = "Blog"

import datetime as dt

def title_card(title):
    return raw(
        f'<title-card title="{escape(title, quote=True)}"></title-card>'
    )

def nav_bar():
    return raw("<nav-bar></nav-bar>")

def buildSection():
    
    metadata_folder = os.listdir(Path(METADATA_PATH + SECTION))
    metadata = []
    
    for file in metadata_folder:
        metadata.append(md.parse(Path(f"{METADATA_PATH}{SECTION}/{file}")))
        
    #Sort by date
    mergeSort(metadata)    
        
    doc = dominate.document(title=f'mirai10 | {TITLE}')
    
    with doc.head:
        link(rel='stylesheet', href='/styles/main.css')
        script(type='text/javascript', src='/components/titlecard.js')
        script(type='text/javascript', src='/components/navbar.js')

    with doc:
        with div(id='left'):
            title_card("Home")
            nav_bar()

        with div(id="center"):
            ul(id="bloglist")
            
            for post in metadata:
                href = Path(str(f"{SECTION}/{post[0]['slug']}.html"))
                li(id="blogitem")
                h1(f"{post[0]['date']}")
                with a(href=href):
                    p(f"{post[0]['title']}")

        div(id="right")

    with open(SECTION_PATH, "w") as file:
        file.write(str(doc))

def buildPost(post):
    OUTPUT_PATH = Path(str(f"{BLOG_PATH}/{SECTION}/{post['slug']}.html"))
    
    doc = dominate.document(title=f"mirai10 | {post['title']}")
    

    with doc.head:
        link(rel='stylesheet', href='/styles/main.css')
        script(type='text/javascript', src='/components/titlecard.js')
        script(type='text/javascript', src='/components/navbar.js')

    with doc:
        with div(id='left'):
            title_card(title="Home")
            nav_bar()

        with div(id="center"):
            h1(f"{post['title']}")
            h2(f"{post['date']}")
            h2(f"{post['tags']}")
            p(f"{post}")

        div(id="right")
    
    with open(OUTPUT_PATH, "w") as file:
        file.write(str(doc))
        
def mergeSort(arr):
  if len(arr) <= 1:
    return arr

  mid = len(arr) // 2
  leftHalf = arr[:mid]
  rightHalf = arr[mid:]

  sortedLeft = mergeSort(leftHalf)
  sortedRight = mergeSort(rightHalf)

  return merge(sortedLeft, sortedRight)

def merge(left, right):
  result = []
  i = j = 0
  
  print(left[i])

  while i < len(left) and j < len(right):
    if left[i][0].get('date') < right[j][0].get('date'):
      result.append(left[i])
      i += 1
    else:
      result.append(right[j])
      j += 1

  result.extend(left[i:])
  result.extend(right[j:])

  return result