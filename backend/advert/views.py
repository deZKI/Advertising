import json

import pandas as pd
import io

from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from langchain_core.messages import HumanMessage, SystemMessage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status

from ai.main import main
from config.settings import GIGACHAT
from .serializers import CSVUploadSerializer


class CSVUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def __proceed_file(self, file) -> pd.DataFrame:
        contents = file.read().decode('utf-8')

        # Преобразовать содержимое в DataFrame
        df = pd.read_csv(io.StringIO(contents))

        return df

    @swagger_auto_schema(
        operation_description="Upload a CSV file",
        request_body=CSVUploadSerializer,
        responses={200: openapi.Response("CSV processed successfully", CSVUploadSerializer)}
    )
    def post(self, request, *args, **kwargs):
        serializer = CSVUploadSerializer(data=request.data)
        if serializer.is_valid():
            file = request.FILES['file']
            df = self.__proceed_file(file)
            df = main(df)
            # Обработка данных (пример: добавление нового столбца)
            df['description'] = df.apply(lambda row: self.__add_gigachat_description(row), axis=1)

            # Обработка данных (пример: добавление нового столбца)
            df['type'] = df.apply(lambda row: self.__add_type(row), axis=1)

            processed_data = json.loads(df.to_json(orient='records'))
            return JsonResponse(processed_data, status=status.HTTP_200_OK, safe=False)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def __add_gigachat_description(self, row):
        messages = [
            SystemMessage(
                content="Ты - эксперт по рекламе c 10 летним опытом. Ты понимаешь почему данная точка полезна."
                        "И какую рекламу лучше предложить для размещения."
            ),
            HumanMessage(content=f"Опишии точку для размещения рекламы. Вот данные точки:"
                                 f"Охват: {row['prediction']}"
                                 f"Название целевой аудитории: {row['name']}"
                                 f"Пол целевой аудитории: {row['gender']}"
                                 f"Возраст целевой аудитории: от {row['ageFrom']} до {row['ageTo']}"
                                 f"Доход: {row['income']}"
            )
        ]
        res = GIGACHAT(messages)
        return res.content

    def __add_type(self, row):
        value = float(row['prediction'])
        if value > 80:
            return 'high'
        if value > 50:
            return 'middle'
        return 'low'
