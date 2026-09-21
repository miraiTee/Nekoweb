
# File for creating markdown files with metadata (yaml) and
# parsing them (to be sent to html.py)

import html
from pathlib import Path

import frontmatter as FM

META_DIR = "../metadata"
SECTION = "blog"
 
# given a list of metadata and content, package it into a markdown file w/ frontmatter. 
def build(title, slug, date, tags, content):
    post = FM.Post(
        content,
        title=title,
        slug=slug,
        date=date,
        tags=tags,
    )
    
    output_path = Path(f"{META_DIR}/{SECTION}/{slug}.md")
    
    with open(output_path, "w") as f:
        FM.dump(post, f)
        
    return post
            
# given a markdown file, parse content and spit out as something understandable
def parse(input_path):
    with open(input_path) as f:
        post = FM.parse(f.read())

    return post