from bs4 import BeautifulSoup
import requests
import time


def find_newest_tags(page_count, url):

    start_time = time.time()
    x = 1
    tags = []

    while x <= page_count:
        r = requests.get(url+str(x))
        soup = BeautifulSoup(r.content, "html.parser")
        for line in soup.find_all("a", {"class": "post-tag"}):
            tags.append(line.text)
        x += 1

    elapsed_time = '{0:.2f}'.format(time.time() - start_time)
    print("Found newest tags in {} seconds".format(elapsed_time))
    return tags



