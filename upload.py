import requests
url = "https://vrsandbox-62fc.restdb.io/media"
payload={}
files=[
  ('file',('image.jpeg',open('./image.jpeg','rb'),'image/jpeg'))
]
headers = {
  'x-apikey': '636af092e9a77f5984220834'
}
response = requests.request("POST", url, headers=headers, data=payload, files=files)

print(response.text)