"""
Creates post for today. Asks for keywords to add to filename.
"""


import os
import re
import datetime

POSTS_DIR = '_posts'


today = datetime.datetime.today()
today_str = datetime.datetime.strftime(today, "%Y-%m-%d")

for filename in os.listdir(POSTS_DIR):
    file_date_str = '-'.join(filename.split('-')[:3])
    if file_date_str == today_str:
        print "Post for today alread exists: {}".format(filename)
        break

keywords = raw_input("Enter keywords for the post: ")

today_filename = "{}-{}.textile".format(today_str, '-'.join(re.split(r'[ ,-]', keywords)))
print today_filename

f = open(POSTS_DIR + '/' + today_filename, 'a')
f.close()
