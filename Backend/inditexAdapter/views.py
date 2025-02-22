import requests
import os
from dotenv import load_dotenv
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from requests.auth import HTTPBasicAuth

load_dotenv()

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
ITX_TOKEN_URL = os.getenv("ITX_TOKEN_URL")
ITX_PRODUCT_API_BASE_URL = os.getenv("ITX_PRODUCT_API_BASE_URL")

access_token = None

def get_token():
    global access_token

    try:
        response = requests.post(
            ITX_TOKEN_URL,
            auth=HTTPBasicAuth(CLIENT_ID, CLIENT_SECRET),
            data={"grant_type": "client_credentials",
             "scope": "technology.catalog.read"},
            headers={"Content-Type": "application/x-www-form-urlencoded","user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}
        )

        if response.status_code == 200:
            access_token = response.json().get("id_token")
        else:
            print("❌ Error obteniendo token:", response.status_code, response.text)
    except requests.RequestException as e:
        print("❌ Error en la solicitud de token:", e)

@csrf_exempt 
def get_products(request):
    global access_token

    if not access_token:
        get_token()


    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.get(ITX_PRODUCT_API_BASE_URL + "?query=shirt&brand=zara", headers=headers)

        if response.status_code == 200:
            data = response.json()
            return JsonResponse(data, safe=False, headers={"Access-Control-Allow-Origin": "*"})
        elif (response.status_code == 403 or response.status_code == 401) and count < 3:
            print("Error 403 - Obteniendo nuevo token y reintentando...")
            get_token()
            count+=1
            return get_products(request)  # Reintentar con un nuevo token
        else:
            return JsonResponse({"error": "Error en la solicitud"}, status=response.status_code, headers={"Access-Control-Allow-Origin": "*"})
    except requests.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500, headers={"Access-Control-Allow-Origin": "*"})

if __name__ == "__main__":
    productos = get_products()
