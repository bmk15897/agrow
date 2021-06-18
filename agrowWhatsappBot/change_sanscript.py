from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate
from ibm_watson import LanguageTranslatorV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

text = "श्रेया"
code_to_sanscript_dict={'hi':sanscript.DEVANAGARI,'gu':sanscript.GUJARATI}

# printing the transliterated text
def convertToEnglishText(text,language):
    if language=='en':
        return text
    print(transliterate(text, code_to_sanscript_dict[language], sanscript.ITRANS))
    return transliterate(text, code_to_sanscript_dict[language], sanscript.ITRANS)


api_key='35AihKwsz6vrNAGSIj0twfEWoAtTugd9gt-N5zOTEx-B'
url='https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/32fdd6e7-2dad-43ec-8dcb-83d3b490fc8d'
authenticator=IAMAuthenticator(api_key)
lt = LanguageTranslatorV3(version='2018-05-01',authenticator=authenticator)
lt.set_service_url(url)
language=lt.identify(text).get_result()['languages'][0]['language']
print(language)
print(transliterate(text, sanscript.ITRANS, sanscript.ITRANS))