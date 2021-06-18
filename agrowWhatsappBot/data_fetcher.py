from datagovindia import DataGovIndia
import india
import csv

YOUR_API_KEY = "579b464db66ec23bdd0000010b1f5f864eb641ec4bc4e072cb41ca4f" #this is Aditya's personal API key generated on data.gov.in
farmers_data_file='farmer_data.csv'

datagovin = DataGovIndia(YOUR_API_KEY)

def createFilter(paramList):
	filterDict = {}
	for k,v in paramList:
		if(v != ""):
			filterDict[k] = v
	return filterDict

def checkIfState(place):
    state="".join(place[0].upper() + place[1:].lower())
    try:
        india.states.lookup(place)
    except ValueError:
        state=""
    return state


def checkIfCity(place):
    city="".join(place[0].upper() + place[1:].lower())
    city=place
    try:
        india.cities.lookup(place)
    except ValueError:
        city=""
    return city

def callMandiApi(params):
    # state, district, market, commodity
    # print(params)
    # try:
    state=checkIfState(params.get('location').string_value)
    district=checkIfCity(params.get('location').string_value)
    if district!="":
        print("District is: "+district)
        state=india.cities.lookup(district).state.name
    market=""
    if state=="" and district=="":
        market=params.get('location').string_value
    commodity=params.get('crop').string_value
    commodity="".join(commodity[0].upper() + commodity[1:].lower())
    
    filterDict = createFilter([['state',state],['district',district],['market',market],['commodity',commodity]]) #key-val pairs to create filter

    print('FilterDict :',filterDict)
    data = datagovin.get_data('9ef84268_d588_465a_a308_a864a43d0070', filters= filterDict)
    print(data)
    return data[0]
    # except ValueError:
    #     pass
	


#MAIN -- sample calls 
#I think data is a dataframe object that is returned

# data = callMandiApi("Maharashtra", "Pune", "", "")
# print(data.head(10))
# print(data['modal_price'][0]) #price of first row

# data = callMandiApi("Maharashtra", "Pune", "Khed(Chakan)", "")
# print(data.head(10))


# data = callMandiApi("Maharashtra", "Pune", "", "Apple")
# print(data.head(10))