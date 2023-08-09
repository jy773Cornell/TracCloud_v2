from django.urls import path
from media.views.ReportAPI import *

urlpatterns = [
    path('report/list/get/', ReportListGetView.as_view()),
    path('report/download/', ReportDownloadView.as_view()),
    path('report/delete/', ReportDeleteView.as_view()),

    # ReportAPI
    path('report/central-posting/', CentralPostingView.as_view()),
]
