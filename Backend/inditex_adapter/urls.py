from django.urls import path
from inditexAdapter.views import get_products

urlpatterns = [
    path('products/', get_products, name='products'),
]

