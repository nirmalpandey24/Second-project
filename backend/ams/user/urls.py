from django.urls import path
from .views import CreateArtist, ListUsers,ListArtists,Login,ManageArtists,ListAdmin,CurrentArtist ,AdminArtistDetail
from rest_framework_simplejwt.views import TokenBlacklistView

urlpatterns = [
    path('artists/', CreateArtist.as_view(), name='create-artist'),
    path('artists/<int:pk>/', CreateArtist.as_view(), name='artist-detail'),
    path('only/artists/', ListArtists.as_view(), name='list-artists'),
    path('users/', ListUsers.as_view(), name='list-users'),
    path('login/',Login.as_view(),name='login'),
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('manageartist/', ManageArtists.as_view(), name='Manage_artist'),
    path('only/admin/',ListAdmin.as_view(),name='only_admin'),
    path('artists/me/', CurrentArtist.as_view(), name='current-artist'),
    path('individual/<int:pk>/', AdminArtistDetail.as_view(), name='individual-artist'),

]




