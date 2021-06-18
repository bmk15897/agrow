import csv

question="Potato digging"
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
        if(len(intersection1)>1 or len(intersection2)>1):
            print(row[2])
        # else:
        #     print("NO MATCH")

print("DONE")