
# Function for publishing to github.
# Invoke a bash script to publish to github w/ git add, git commit based on the page's title and git push

import subprocess

def publish():
    print("Publishing to Github")
    subprocess.call(["bash", "push.sh"])
    print("Finished Publishing")
    
if __name__ == "__main__":
    publish()