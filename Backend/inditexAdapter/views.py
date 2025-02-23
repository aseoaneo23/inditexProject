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
    """Obtiene un nuevo token y lo almacena en la variable global `access_token`."""
    global access_token

    try:
        response = requests.post(
            ITX_TOKEN_URL,
            auth=HTTPBasicAuth(CLIENT_ID, CLIENT_SECRET),
            data={"grant_type": "client_credentials", "scope": "technology.catalog.read"},
            headers={
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        )

        print("🔄 Obteniendo nuevo token...")
        response_data = response.json()
        print("📡 Respuesta de autenticación:", response_data)

        if response.status_code == 200:
            access_token = response_data.get("id_token")
            print("✅ Nuevo token obtenido correctamente")
        else:
            print("❌ Error obteniendo token:", response.status_code, response.text)
            access_token = None  # Asegurarnos de no usar un token inválido

    except requests.RequestException as e:
        print("❌ Error en la solicitud de token:", e)
        access_token = None

@csrf_exempt
def get_products(request, retry_count=0):
    """Obtiene productos con manejo de errores y reintentos limitados."""
    global access_token

    # Si no hay token, intenta obtenerlo
    if not access_token:
        get_token()
        if not access_token:
            return JsonResponse({"error": "No se pudo obtener el token"}, status=500)

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    params = {
        "query": request.GET.get("query"),
        "brand": request.GET.get("brand"),
    }

    try:
        print(f"📡 Haciendo petición a la API de productos... Intento {retry_count + 1}")
        response = requests.get(ITX_PRODUCT_API_BASE_URL, params=params, headers=headers)

        if response.status_code == 200:
            print("✅ Productos obtenidos con éxito")
            return JsonResponse(response.json(), safe=False, headers={"Access-Control-Allow-Origin": "*"})

        elif response.status_code in [401, 403]:  # Token inválido o expirado
            if retry_count < 2:  # Permitir hasta 3 intentos en total
                print("🔄 Token expirado o inválido. Obteniendo nuevo token...")
                get_token()
                return get_products(request, retry_count + 1)  # Reintentar con el nuevo token

            print("❌ Se alcanzó el límite de reintentos para obtener un nuevo token.")
            return JsonResponse({"error": "Error de autenticación"}, status=403)

        else:
            print(f"❌ Error en la API: {response.status_code} - {response.text}")
            return JsonResponse({"error": "Error en la solicitud"}, status=response.status_code)

    except requests.RequestException as e:
        print("❌ Error en la solicitud a la API:", e)
        return JsonResponse({"error": str(e)}, status=500)

# Para pruebas manuales
if __name__ == "__main__":
    class MockRequest:
        """Clase simulada para pruebas sin Django."""
        GET = {"query": "shirt", "brand": "zara", "onSale": "false"}

    productos = get_products(MockRequest())
    print(productos.content)
