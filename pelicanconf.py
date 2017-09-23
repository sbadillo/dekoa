#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import glob
import os

DEFAULT_LANG = u'es'
TIMEZONE = 'Europe/Paris'
AUTHOR = u'sb'
SITENAME = u'Dekoa'


SITEURL = ''  # empty, see publishconf.py for publishing config
print('==== Empieza Pelican! : ' + SITENAME + ' '+ SITEURL + ' by ' +  AUTHOR + '  ====')

PATH = 'content'

THEME = './themes/simple-boot'

STATIC_PATHS = ['images','extra','pages/images'] # paths copied identically from content folder.

# Social widget: names are used for font-awesome icons, use lowerspace
SOCIAL = (('instagram', 'https://www.instagram.com/dekoamx/'),
          ('facebook', 'https://www.facebook.com/dekoamx/'),)

# Post the instagram usado para extraer una imagen y link
# ver get-instagram-section.js
INSTAGRAM_POST = 'https://www.instagram.com/p/BPtoG4vBSZv'

# Seccion ultimos trabajos
ULTIMOS_TRABAJOS_PATH = './content/images/ultimos_trabajos'
ULTIMOS_TRABAJOS = [os.path.basename(x) for x in glob.glob(ULTIMOS_TRABAJOS_PATH+"/*.jpg")]
print('---> Encontre ' + str(len(ULTIMOS_TRABAJOS)) + ' jpg files in ' + ULTIMOS_TRABAJOS_PATH)


DEFAULT_PAGINATION = False
RELATIVE_URLS = True  # true for deployment, see publishconf.py for publishing config

# OTHER
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None


