#!/usr/bin/python

import urllib2
import json
import sys

def main(coke):
    server = 'http://ape.cd34.com:3668/?'
    cmd = [{'cmd': 'updatecans',
        'params': {
           'password': 'testpasswd',
           'can': coke,
           'channel': 'coke',
       }
    }]
    url = server + urllib2.quote(json.dumps(cmd))
    response = urllib2.urlopen(url)
    print(response.read())

if __name__ == '__main__':
  if len(sys.argv) == 2:
    main(sys.argv[1])
  else:
    print '''Usage:\n%s 'cherrycoke' ''' % sys.argv[0]
