import csv
from os import error
import pandas as pd

from ibm_watson import LanguageTranslatorV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson import TextToSpeechV1
# from translate import Translator
from google_trans_new import google_translator  


api_key='35AihKwsz6vrNAGSIj0twfEWoAtTugd9gt-N5zOTEx-B'
url='https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/32fdd6e7-2dad-43ec-8dcb-83d3b490fc8d'
authenticator=IAMAuthenticator(api_key)
lt = LanguageTranslatorV3(version='2018-05-01',authenticator=authenticator)
lt.set_service_url(url)
translator = google_translator()

final_data=[]
lang=[]


data = pd.read_excel('KCC.json.xlsx')
data_list=data.values.tolist()

with open('processedKCCData.csv', 'w', newline='') as csvfile:
    fieldnames = ['queryType', 'question','answer']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for row in data_list:
        try:
            queryType=row[0]
            question=row[1]
            answer=row[2]
            language=lt.identify(answer).get_result()['languages'][0]['language']
            if(language!='en'):
                # answer=lt.translate(text=answer,model_id='hi-en').get_result()['translations'][0]['translation']
                # answer = translator.translate(answer)
                answer = translator.translate(answer,lang_src='hi',lang_tgt='en')  
                # answer = translator.translate(answer)
                final_data.append([queryType,question,answer])
                writer.writerow({'queryType': queryType, 'question': question, 'answer' : answer})
                print(answer)
        except Exception:
            pass
# print(queryType,question,answer)
