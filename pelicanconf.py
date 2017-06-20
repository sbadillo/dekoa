#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import glob
import os

AUTHOR = u'sb'
SITENAME = u'Dekoa'
SITEURL = ''

print(SITENAME + ' -- ' +  AUTHOR)

PATH = 'content'
THEME = './themes/simple-boot'

# paths that get copied identically from content folder.
STATIC_PATHS = ['images','extra']

TIMEZONE = 'Europe/Paris'

DEFAULT_LANG = u'es'


# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),)

# Social widget: names are used for font-awesome icons, use lowerspace
SOCIAL = (('instagram', 'https://www.instagram.com/dekoamx/'),
          ('facebook', 'https://www.facebook.com/dekoamx/'),)

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True


# no feed generation for now
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Post the instagram usado para extraer una imagen y link
# ver get-instagram-section.js
INSTAGRAM_POST = 'https://www.instagram.com/p/BPtoG4vBSZv'

# Folder con fotos de ultimos trabajos
ULTIMOS_TRABAJOS_PATH = './content/images/ultimos_trabajos'
ULTIMOS_TRABAJOS = [os.path.basename(x) for x in glob.glob(ULTIMOS_TRABAJOS_PATH+"/*.jpg")]
print('---> Encontre ' + str(len(ULTIMOS_TRABAJOS)) + ' jpg files in ' + ULTIMOS_TRABAJOS_PATH)

