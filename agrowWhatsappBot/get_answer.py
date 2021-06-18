import data_fetcher as datafetcher
import db_connect as dbconnect

intents_list=["UserAsksForMandiPrice","UserProvidesLocationForStats","UserAsksKCCQuestion","fallback"]

def get_response(intent,params):
    if intent=="UserAsksForMandiPrice":
        return "Current price is "+str(datafetcher.callMandiApi(params))
    elif intent=="UserProvidesLocationForStats":
        return dbconnect.getCropStats("Ahmednagar")
    elif intent=="UserAsksKCCQuestion" or intent=="fallback":
        return dbconnect.getKCCQuestion(params)

    return "Sorry, I couldn't find data for you"
