from collections import Counter
import re


def analyze_tags(tags):

    cleansed_tags = map(lambda row: re.sub("\d+", "", row).replace("-", "").replace(".", ""), tags)
    reduced_tags = Counter(cleansed_tags).most_common(10)
    new_tags = []
    for record in reduced_tags:
        new_tags.append({"name": record[0], "occurrences": record[1]})
    return new_tags

