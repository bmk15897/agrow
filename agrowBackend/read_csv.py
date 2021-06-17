import csv
import pandas as pd
import random as r
from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey
from datetime import datetime

#Set to False to use phone from CSV
generatePhoneFlag = True
#If set to True then if user from CSV exists in DB, the crop from CSV for the user gets appended to existingCropList of the user
addCropFlag = False

month = {	'1':'Janauary',
		'2':'February',
		'3':'March',
		'4':'April',
		'5':'May',
		'6':'June',
		'7':'July',
		'8':'August',
		'9':'September',
		'10':'October',
		'11':'November',
		'12':'December'		}

period = {
	1 : "(Mid)",
	2 : "(End)"
	}

def generatePhone():
	phone = []
	phone.append(str(r.randint(6, 9)))
	for i in range(1, 10):
		phone.append(str(r.randint(0, 9)))
	return "whatsapp:'+91"+''.join(phone)+"'"

# User record CSV column indices
# 0 - phone
# 1 - name
# 2 - crop
# 3 - district
# 4 - areaOfLand
# 5 - cropType
# 6 - cropArea
# 7 - state

# Crop Record example 
# 	"cropName": "Wheat",
#     "district": "Ahmednagar",
#     "state": "Maharashtra",
#     "areaOfLand": 1,
#     "quantitySown": 60,
#     "yieldExpected": 600,
#     "harvestPeriod": "August (Mid) 2021"

def generateUserJsonRecord(user, phone):

	cropEntry = generateCropJsonRecord(user)
	return {
		'_id': phone,
		'name': user[1].title(),
		'district': user[3].title(),
		'state' : user[7].title(),
		'areaOfLand' : user[4],
		'crop_entries' : [
			cropEntry
		]
	}

def generateCropJsonRecord(user):
	quantitySown = r.randint(10,50)* float(user[6])
	yieldExpected = quantitySown * r.randint(9,15)
	currentMonth = datetime.now().month
	monthInt = r.randint(1,12)
	isHarvested = "no"
	if(monthInt < currentMonth):
		isHarvested = "yes"
	harvestPeriod = month[str(monthInt)] +" "+ period[r.randint(1,2)] + " 2021" 
	return {
		"cropName" : user[2].lower(),
		"district" : user[3].title(),
		"state" : user[7].title(),
		"areaOfLand" : user[6],
		"quantitySown": quantitySown,
		"yieldExpected": yieldExpected,
		"harvestPeriod": harvestPeriod,
		"isHarvested" : isHarvested
	}


#if generatePhoneFlag is True then check in DB and create new unique phone and insert
#if generatePhoneFlag is False - checks in DB if record exists, if not the creates new, else updates existing with crop (duplicate crop is possible)
#if addCropFlag is False then if user from CSV exists in DB, ignore the record from CSV
#if addCropFlag is True then if user from CSV exists in DB, the crop from CSV for the user gets appended to existingCropList of the user
def readCSV(db, filename):
	with open(filename) as csvfile:
		data = csv.reader(csvfile, delimiter=',')
		next(data)
		for user in data:
			phone = user[0]
			if(generatePhoneFlag):
				phone = generatePhone()
				while(phone in db):
					phone = generatePhone()
				print(phone)
				newUser = generateUserJsonRecord(user, phone)
				#print(newUser)
				db.create_document(newUser)
			else:
				if(phone in db):
					# record already exists, add the crop
					print('Phone:',phone,"already exists")
					if(addCropFlag == True):
						doc = db[phone]
						existingCropEntries = doc["crop_entries"]
						existingCropEntries.append(generateCropJsonRecord(user))
						doc["crop_entries"] = existingCropEntries
						doc.save()
				else:
					newUser = generateUserJsonRecord(user, phone)
					db.create_document(newUser)

dbConn = Cloudant.iam("3b6b2b28-2528-425e-be92-d06f5f0e6a28-bluemix","WKt3fDES6usJXFE22piiXJA4GOEQOTcsiMwh4iC_ahKl",connect=True)
db = dbConn['farmer_database']
readCSV(db,'data/farmer_data.csv')