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

from config.settings import GIGACHAT
from .serializers import CSVUploadSerializer


class CSVUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def __proceed_file(self, file) -> pd.DataFrame:
        contents = file.read().decode('utf-8')

        # Преобразовать содержимое в DataFrame
        df = pd.read_csv(io.StringIO(contents))

        # Замена одинарных кавычек на двойные в именах столбцов
        df.columns = df.columns.str.replace("'", '"')

        # Замена одинарных кавычек на двойные во всех значениях
        df = df.applymap(lambda x: str(x).replace("'", '"'))
        return df

    @swagger_auto_schema(
        operation_description="Upload a CSV file",
        request_body=CSVUploadSerializer,
        responses={200: openapi.Response("CSV processed successfully", CSVUploadSerializer)}
    )
    def post(self, request, *args, **kwargs):
        serializer = CSVUploadSerializer(data=request.data)
        if serializer.is_valid():
            try:
                file = request.FILES['file']
                df = self.__proceed_file(file)

                # Обработка данных (пример: добавление нового столбца)
                df['description'] = df.apply(lambda row: self.__add_gigachat_description(row), axis=1)

                # Обработка данных (пример: добавление нового столбца)
                df['type'] = df.apply(lambda row: self.__add_type(row), axis=1)

                processed_data = json.loads(df.to_json(orient='records'))

                # Вернуть обработанные данные в формате JSON
                for data in processed_data:
                    data['points'] = json.loads(data['points'])
                return JsonResponse(processed_data, status=status.HTTP_200_OK, safe=False)

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def __add_gigachat_description(self, row):
        messages = [
            SystemMessage(
                content="Ты - эксперт по рекламе c 10 летним опытом. Ты понимаешь почему данная точка полезна."
                        "И какую рекламу лучше предложить для размещения."
            ),
            HumanMessage(content=f"Опишии точку для размещения рекламы. Вот данные точки:"
                                 f"Охват: {row['value']}"
                                 f"Название целевой аудитории: {row['targetAudience.name']}"
                                 f"Пол целевой аудитории: {row['targetAudience.gender']}"
                                 f"Возраст целевой аудитории: от {row['targetAudience.ageFrom']} до {row['targetAudience.ageTo']}"
                                 f"Доход: {row['targetAudience.income']}"
            )
        ]
        res = GIGACHAT(messages)
        return res.content

    def __add_type(self, row):
        value = float(row['value'])
        if value > 80:
            return 'high'
        if value > 50:
            return 'middle'
        return 'low'
