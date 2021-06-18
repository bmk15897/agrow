from datetime import datetime,timedelta
from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey
from collections import defaultdict
import india
import csv

#initialising app
# app = Flask(__name__)
# app.secret_key = 'some_secret'
#connecting to DB before every request

db = Cloudant.iam(
"3b6b2b28-2528-425e-be92-d06f5f0e6a28-bluemix",
"WKt3fDES6usJXFE22piiXJA4GOEQOTcsiMwh4iC_ahKl",
connect=True
)

def registerUser(userDetails):
    my_database = db['farmer_database']
    my_database.create_document({
        '_id': userDetails["phone"],
        'name': userDetails["name"],
        'village':userDetails["village"],
        'district': userDetails["district"],
        'state' : india.cities.lookup(userDetails["district"]).state.name,
        'areaOfLand' : userDetails["areaOfLand"],
        'crop_entries' : []
        })
            # return jsonify(result='Signup successful! Now login with your new User-id.')

def checkIfUserRegistered(phone):
    my_database = db['farmer_database']
    doc_exists = phone in my_database
    print(doc_exists)
    return doc_exists

def getCropStats(farmer_district):
    my_database = db['farmer_database']
    farmer_district = "Ahmednagar"

    selector = {'district': {'$eq': farmer_district}}
    docs = my_database.get_query_result(selector)

    all_entries = []
    for d in docs:
        for c in d["crop_entries"]:
            if "harvested" not in c:
                all_entries.append(c)

    groups = defaultdict(list)


    for obj in all_entries:
        groups[obj["cropName"]].append(obj)
        
    new_list = groups.values()

    cropNameCount = {}

    for l in new_list:
        cropNameCount[l[0]["cropName"]] = {
        "totalYieldExpected": sum(c["yieldExpected"] for c in l),
        "totalAreaOfLand" : sum(float(c["areaOfLand"]) for c in l),
        "totalQuantitySown" : sum(c["quantitySown"] for c in l)
        }

    top3CropsYieldExpected = sorted(cropNameCount.items(), key=lambda item : item[1]['totalYieldExpected'], reverse=True)[:3]
#print(top3CropsYieldExpected)
    yeildExpectedSentence = "In "+farmer_district+", these crops have the highest expected yield :\n1. "+top3CropsYieldExpected[0][0]+" Expected Yield: "+str(int(top3CropsYieldExpected[0][1]["totalYieldExpected"]))+" quintals\n2. "+top3CropsYieldExpected[1][0]+" Expected Yield: "+str(int(top3CropsYieldExpected[1][1]["totalYieldExpected"]))+" quintals\n3. "+top3CropsYieldExpected[2][0]+" Expected Yield: "+str(int(top3CropsYieldExpected[2][1]["totalYieldExpected"]))+" quintals"

    top3CropsAreaOfLand = sorted(cropNameCount.items(), key=lambda item : item[1]['totalAreaOfLand'], reverse=True)[:3]
    areaOfLandSentence = "In "+farmer_district+", these crops have the highest area of land :\n1. "+" Area of Land having "+top3CropsAreaOfLand[0][0]+" : "+str(int(top3CropsAreaOfLand[0][1]["totalAreaOfLand"]))+" acres\n2. "+" Area of Land having "+top3CropsAreaOfLand[1][0]+" : "+str(int(top3CropsAreaOfLand[1][1]["totalAreaOfLand"]))+" acres\n3. Area of Land having "+top3CropsAreaOfLand[2][0]+" : "+str(int(top3CropsAreaOfLand[2][1]["totalAreaOfLand"]))+" acres"
    mandiPricesSentence= "As per our analysis of current mandi prices, there seems to be a supply shortage of pomegranate so the prices are trending on the higher side. The prices are 20% higher than last month"

    return(yeildExpectedSentence+ " \n\n "+areaOfLandSentence+" \n\n "+mandiPricesSentence)
    print(areaOfLandSentence)
        

def getKCCQuestion(question):

    user_question_words=question.lower().split(" ")

    lookupData=[]
    with open('processedKCCData.csv', 'r') as csvfile:
        csvreader = csv.reader(csvfile)
        for row in csvreader:
            queryType_words=row[0].lower().split(" ")
            lookup_question_words=row[1].lower().split(" ")
            user_question_words_as_set = set(user_question_words)
            intersection1 = user_question_words_as_set.intersection(queryType_words)
            intersection2 = user_question_words_as_set.intersection(lookup_question_words)
            if(len(intersection1)>2 or len(intersection2)>1):
                return row[2]
    return "Sorry, I couldn't find an answer to your question"
        # else:

# my_document = my_database['whatsapp:+14155238886']

# # Delete the document
# my_document.delete()