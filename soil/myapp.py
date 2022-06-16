import requests
import json


#URL = "http://127.0.0.1:8000/api/"
# URL = "http://127.0.0.1:8000/app2/StudentAPI/"
URL = "http://127.0.0.1:8000/"

def get_data(id = None):
    
    if id is not None:
        json_data =  json.dumps({'id':id})
        print(json_data)
        headers = { 'content-Type' : 'application/json'}
        res = requests.post(url = URL , headers=headers, data = json_data)
        # print(res.json())
    


get_data('https://growise.000webhostapp.com/images/1648486701_5c801972-03f0-4c28-827e-d3f30733698e.jpg')

# def post_data():
#     data = {
#         'url' : 'https://growise.000webhostapp.com/images/1648486715_e8be5018-cb7e-4b43-b50c-754933137fbf.jpg'
#     }
#     headers = { 'content-Type' : 'application/json'}
#     json_data = json.dumps(data)
#     res = requests.post(url = URL ,headers = headers, data= json_data)
#     print(res)

# post_data()


