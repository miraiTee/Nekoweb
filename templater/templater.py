
# Fork from main templater to other features
# features adding a new element to a grid oooooorrr its own post.
# TO DO:
# 1. Add a data storage as yaml files
# 2. Implement adding blog post by storing text file.
#   Updating the main html file and creating a new one.
# 3. Invoke a bash script to publish to github w/ git add, git commit based on the page's title and git push

import post
import grid

if __name__ == "__main__":
    print("Hello Mirai!")
    print("Whatcha wanna do in da blog?")
    
    loop = True
    
    while (loop):
        choices = {
            0: {
                "label": "Add blog post:",
                "func": post.generate
            },
            1: {
                "label": "Add grid item",
                "func": grid.generate
            }
        }
    
        for number, choice in choices.item():
            print(f"[{number}] {choice['label']}")
    
        try:
            select = int(input("Choose option: "))
    
            if select in choices:
                loop = False
                choices[select]["func"]()
            else:
                print("Invalid choice.")
                
        except ValueError:
            print("Invalid choice.")