
# Python 3
# pip install datagovindia
from datagovindia import DataGovIndia
import concurrent.futures


YOUR_API_KEY = "579b464db66ec23bdd0000010b1f5f864eb641ec4bc4e072cb41ca4f" #this is Aditya's personal API key generated on data.gov.in

datagovin = DataGovIndia(YOUR_API_KEY)

def createFilter(paramList):
	filterDict = {}
	for k,v in paramList:
		if(v != ""):
			filterDict[k] = v
	return filterDict


def callMandiApi(state, district, market, commodity):
	
	filterDict = createFilter([['state',state],['district',district],['market',market],['commodity',commodity]]) #key-val pairs to create filter

	print('FilterDict :',filterDict)
	data = datagovin.get_data('9ef84268_d588_465a_a308_a864a43d0070', filters= filterDict)
	return data
	


#MAIN -- sample calls 
#I think data is a dataframe object that is returned

# data = callMandiApi("Maharashtra", "Pune", "", "")
# print(data.head(10))
# print(data['modal_price'][0]) #price of first row

# data = callMandiApi("Maharashtra", "Pune", "Khed(Chakan)", "")
# print(data.head(10))


data = callMandiApi("Maharashtra", "Pune", "", "Tomato")
print(data)