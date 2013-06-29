#!/var/www/pyramidape/bin/python

import os
import site
os.environ['PYTHON_EGG_CACHE'] = '/var/www/pyramidape/ape/egg_cache'
site.addsitedir('/var/www/pyramidape/lib/python2.7/site-packages')
from paste.script.util.logging_config import fileConfig
from pyramid.paster import get_app
application = get_app(
    '/var/www/pyramidape/ape/production.ini', 'main')
fileConfig('/var/www/pyramidape/ape/production.ini')
