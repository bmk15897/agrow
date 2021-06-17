from flask import Flask, render_template,request,g,flash,redirect,url_for,jsonify,json,session
from datetime import datetime,timedelta
from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey


#initialising app
app = Flask(__name__)
app.secret_key = 'some_secret'
#connecting to DB before every request

@app.before_request
def before_request():
    g.db = Cloudant.iam(
    "3b6b2b28-2528-425e-be92-d06f5f0e6a28-bluemix",
    "WKt3fDES6usJXFE22piiXJA4GOEQOTcsiMwh4iC_ahKl",
    connect=True
	)

#closing connection after every request
@app.teardown_request
def teardown_request(exception):
    if hasattr(g, 'db'):
        g.db.disconnect()


@app.route('/')
def index():
  return "Hello"


@app.route('/signup', methods=['POST'])
def signup():
	if(request.method=='POST'):
		my_database = g.db['farmer_database']
		user = request.get_json()
		sampleOTP = "0000"
		if(len(sampleOTP)==0 or not user):
			return jsonify(result = 'Please fill up all the fields')
		else:
			user["phone"] = "whatsapp:+91"+user["phone"]
			doc_exists = user["phone"] in my_database
			
			if(doc_exists):
				return jsonify(result='User-id already exists! Please choose a different User-id.')
			else:
				my_database.create_document({
					'_id': user["phone"],
					'name': user["name"],
					'district': user["district"],
					'state' : user["state"],
					'areaOfLand' : user["areaOfLand"],
					'crop_entries' : []
				})
				return jsonify(result='Signup successful! Now login with your new User-id.')
				
			
#clicking on Login
@app.route('/login',methods=['POST'])
def login():
	if(request.method=='POST'):
		user = request.get_json()
		
		sampleOTPlist = ["1234","5678","0000"]
		my_database = g.db['farmer_database']
		user["phone"] = "whatsapp:+91"+user["phone"]
		doc_exists = user["phone"] in my_database
		if not doc_exists:
			return jsonify(result="Invalid User-id")
		else:
			if user["otp"] in sampleOTPlist:
				doc = my_database[user["phone"]]
				session['phone'] = user["phone"]
				return doc
			else:
				return jsonify(result="Incorrect password")
			

@app.route('/viewMyCropEntries',methods=['GET','POST'])
def viewMyCropEntries():
	phone = session.get('phone',None)

	my_database = g.db['farmer_database']
	
	doc_exists = phone in my_database
	if not doc_exists:
		return jsonify(result="Invalid User-id")
	else:
		doc = my_database[phone]
		existingCropEntries = doc["crop_entries"]
		return jsonify(result = existingCropEntries)


@app.route('/addMyCropEntry',methods=['POST'])
def addMyCropEntry():
	if(request.method=='POST'):
		phone = session.get('phone',None)
		print(phone)

		cropEntryJSON = request.get_json()
		print(cropEntryJSON)
		if(not cropEntryJSON):
			return jsonify(result = 'Please fill up all the fields')
		else:
			my_database = g.db['farmer_database']
			doc_exists = phone in my_database
			if not doc_exists:
				return jsonify(result="Invalid User-id")
			else:
				doc = my_database[phone]
				existingCropEntries = doc["crop_entries"]
				existingCropEntries.append(cropEntryJSON)
				doc["crop_entries"] = existingCropEntries
				doc.save()
				return jsonify(result = existingCropEntries)



@app.route('/viewAllCropEntries',methods=['GET','POST'])
def viewAllCropEntries():
	
	my_database = g.db['farmer_database']
	
	allCropEntries = []
	for document in my_database:
		for cropEntry in document["crop_entries"]:
			allCropEntries.append(cropEntry)
	return jsonify(result = allCropEntries)




@app.route('/viewMyCropEntriesForWhatsappBot',methods=['POST'])
def viewMyCropEntrieForWhatsappBots():
	userJSON = request.get_json()
	phone = userJSON['phone']

	my_database = g.db['farmer_database']
	
	doc_exists = phone in my_database
	if not doc_exists:
		return jsonify(result="Invalid User-id")
	else:
		doc = my_database[phone]
		existingCropEntries = doc["crop_entries"]
		return jsonify(result = existingCropEntries)


@app.route('/addMyCropEntryForWhatsappBot',methods=['POST'])
def addMyCropEntryForWhatsappBot():
	if(request.method=='POST'):
		

		cropEntryJSON = request.get_json()
		phone = cropEntryJSON.pop('phone',None)
		
		print(cropEntryJSON)
		if(not cropEntryJSON):
			return jsonify(result = 'Please fill up all the fields')
		else:
			my_database = g.db['farmer_database']
			doc_exists = phone in my_database
			if not doc_exists:
				return jsonify(result="Invalid User-id")
			else:
				doc = my_database[phone]
				existingCropEntries = doc["crop_entries"]
				existingCropEntries.append(cropEntryJSON)
				doc["crop_entries"] = existingCropEntries
				doc.save()
				return jsonify(result = existingCropEntries)


def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)


@app.route("/site-map")
def site_map():
    links = []
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            links.append((url, rule.endpoint))
    return jsonify(result=links)


if __name__ == '__main__':
  app.run(host= '0.0.0.0', port=5000, debug=True)
