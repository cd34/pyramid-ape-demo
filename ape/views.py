import urllib2
import json

from pyramid.view import view_config

def postupdate(coke):
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

@view_config(route_name='post', renderer='json')
def post(request):
    request.response.headers['Access-Control-Allow-Origin'] = 'http://cd34.com'
    can = request.params.get('can', 'cherrycoke')
    postupdate(can)
    return {'can':can}
