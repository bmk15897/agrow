from flask import Flask,request
import flask 
from twilio.twiml.messaging_response import MessagingResponse
from twilio.rest import Client 

from ibm_watson import LanguageTranslatorV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson import TextToSpeechV1
from twilio.twiml.voice_response import VoiceResponse, Say
from google_trans_new import google_translator  

from flask import *  

import dialogflow_v2 as dialogflow
import get_answer as getanswer
import db_connect as dbconnect
import change_sanscript as changesanscript

from indic_transliteration import sanscript

import os


def detect_intent_from_text(text, session_id, language_code='en'):
    session=dialogflow_session_client.session_path(PROJECT_ID,session_id)
    text_input=dialogflow.types.TextInput(text=text,language_code=language_code)
    query_input=dialogflow.types.QueryInput(text=text_input)
    response = dialogflow_session_client.detect_intent(session=session, query_input=query_input)
    return response.query_result
 
#TWILIO DETAILS
account_sid = 'AC966002764d6042bad05a0f8f705252c0' 
auth_token = '1968ed4926ec5be61c660b24552b84fc' 
client = Client(account_sid, auth_token) 

#IBM WATSON DETAILS
api_key='35AihKwsz6vrNAGSIj0twfEWoAtTugd9gt-N5zOTEx-B'
url='https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/32fdd6e7-2dad-43ec-8dcb-83d3b490fc8d'
authenticator=IAMAuthenticator(api_key)
lt = LanguageTranslatorV3(version='2018-05-01',authenticator=authenticator)
lt.set_service_url(url)

#IBM STT AND TTS KEYS
tts_api_key='FAju_dD20Dj4SCeBA9KgZ7QGp-yDgDtHidhQz0KQ-JNK'
tts_url='https://api.eu-gb.text-to-speech.watson.cloud.ibm.com/instances/d40b0cd8-8f46-4aa0-b2dd-18a14f9df521'
tts_authenticator= IAMAuthenticator(tts_api_key)
tts= TextToSpeechV1(authenticator=tts_authenticator)
tts.set_service_url(tts_url)

#DIALOGFLOW DETAILS
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="faq-eubs-55727bc91b56.json"
dialogflow_session_client = dialogflow.SessionsClient()
PROJECT_ID="faq-eubs"

#FLASK-SESSION
app = Flask(__name__)  
app.secret_key = "ittupittu"  
sessionID="ittupittu"

#TRANSLATOR
translator = google_translator()

@app.route("/")
def hello():
    return "Hello,world!"

@app.route("/sms",methods=['POST'])
def sms_reply():
    msg = request.form.get('Body')
    sender = request.form.get('From')
    resp= MessagingResponse()
    resp.message('You said: {}',format(msg))
    
    session['isUserRegistered'] = False
    #Write code to check user's entry in DB here
    session['isUserRegistered']=dbconnect.checkIfUserRegistered(sender)
    if(session['isUserRegistered']==False):

        print("User not registered")
        
        if(session.get('currentIntent') is None):
            session['language']=lt.identify(msg).get_result()['languages'][0]['language']
            print(session['language'])
            response=detect_intent_from_text("CodeCallsRegistrationIntent",sessionID)
            session['registrationDetails'] = {'name':'','phone':'','village':'','district':'','areaOfLand':0}
            session['registrationDetails']['phone']=sender
            session['currentIntent']="UserProvidesName"

        elif(session['currentIntent']=="UserProvidesName"):
            language=lt.identify(msg).get_result()['languages'][0]['language']
            response=detect_intent_from_text(msg,sessionID)
            session['registrationDetails']['name']=changesanscript.convertToEnglishText(msg,session['language'])
            session['currentIntent']="UserProvidesVillage"

        elif(session['currentIntent']=="UserProvidesVillage"):
            language=lt.identify(msg).get_result()['languages'][0]['language']
            response=detect_intent_from_text(msg,sessionID)
            session['registrationDetails']['village']=changesanscript.convertToEnglishText(msg,session['language'])
            session['currentIntent']="UserProvidesLocation"

        elif(session['currentIntent']=="UserProvidesLocation"):
            language=lt.identify(msg).get_result()['languages'][0]['language']
            response=detect_intent_from_text(msg,sessionID)
            session['registrationDetails']['district']='Bhopal'
            # session['registrationDetails']['district']=changesanscript.convertToEnglishText(msg,session['language'])
            session['currentIntent']="UserProvidesLandArea"

        elif(session['currentIntent']=="UserProvidesLandArea"):
            language=lt.identify(msg).get_result()['languages'][0]['language']
            response=detect_intent_from_text(msg,sessionID)
            session['registrationDetails']['areaOfLand']=changesanscript.convertToEnglishText(msg,session['language'])
            session['isUserRegistered']=True
            session['currentIntent']=""
            dbconnect.registerUser(session['registrationDetails'])
            #Write code to insert the record into DB
            
        translation=response.fulfillment_text
        if(session['language']!='en' and session['language']!='sq' and session['language']!=''):
            translate_to_from='en'+'-'+session['language']
            translation=translator.translate(response.fulfillment_text,lang_src='en',lang_tgt=session['language'])  
            translation=lt.translate(text=response.fulfillment_text,model_id=translate_to_from).get_result()['translations'][0]['translation']

        message = client.messages.create( 
                from_='whatsapp:+14155238886',  
                body=translation,      
                # media_url='https://m.economictimes.com/thumb/msid-69702930,width-1200,height-900,resizemode-4,imgsize-574454/farmer.jpg',
                to=sender 
            )

        print(session['currentIntent'])

    else:

        print("User registered")

        language=lt.identify(msg).get_result()['languages'][0]['language']
        print(language)
    
        translation=msg
        if(language=='ne'):
            language='hi'
        if(language!='en' and language!='sq'):
            translate_from_to=language+'-'+'en'
            translation=translator.translate(msg,lang_src=language,lang_tgt='en')
            # translation=lt.translate(text=msg,model_id=translate_from_to).get_result()['translations'][0]['translation']
            print(translation)
        # with open('./help.mp3','wb') as audio_file:
        #     res=tts.synthesize(text,accept='audio/mp3',voice='hi-HI_BirgitV3Voice').get_result()
        #     audio_file.write(res.content)

        # print(translation['translations'][0]['translation'])

        response=detect_intent_from_text(translation,12321)
        translated_response=response.fulfillment_text
        print(response.intent.display_name)

        if(language!='en' and language!='sq'):
            translate_to_from='en'+'-'+language
            # translated_response=lt.translate(text=response.fulfillment_text,model_id=translate_to_from).get_result()['translations'][0]['translation']
            translated_response=translator.translate(response.fulfillment_text,lang_src='en',lang_tgt=language)

        detected_intent=response.intent.display_name
        print("Intent is : "+detected_intent)
        if(detected_intent in getanswer.intents_list):
            if(detected_intent=="fallback" or detected_intent=="UserAsksKCCQuestion"):
                answer_to_user_question=getanswer.get_response(detected_intent,translation)
            else:
                answer_to_user_question=getanswer.get_response(detected_intent,response.parameters.fields)

            if(language!='en' and language!='sq'):
                answer_to_user_question=translator.translate(answer_to_user_question,lang_src='en',lang_tgt=language)

            message1 = client.messages.create( 
                                    from_='whatsapp:+14155238886',  
                                    body=answer_to_user_question,      
                                    to=sender 
                                ) 
        else:
            if(detected_intent=='welcome'):
                message = client.messages.create( 
                                        from_='whatsapp:+14155238886',  
                                        body=translated_response,      
                                        media_url='https://m.economictimes.com/thumb/msid-69702930,width-1200,height-900,resizemode-4,imgsize-574454/farmer.jpg',
                                        to=sender 
                                    )   
            else:
                message = client.messages.create( 
                        from_='whatsapp:+14155238886',  
                        body=translated_response,      
                        # media_url='https://m.economictimes.com/thumb/msid-69702930,width-1200,height-900,resizemode-4,imgsize-574454/farmer.jpg',
                        to=sender 
                    )   

        resp = MessagingResponse()

    return str(resp)

if __name__ == '__main__':  
    app.run(debug = True)  