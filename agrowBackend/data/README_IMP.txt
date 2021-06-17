farmer_data.csv is read by read_csv.py - standalone Python program to insert records from CSV to DB.
xlsx is also present in this directory to be used for editing purpose- sometimes CSV cannot be edited due to restricted features, so edit the xlsx, and then File -> Save As CSV and overwrite the csv.

IMPORTANT to note before running read_csv.py

There are 2 flags set in read_csv.py:
generatePhoneFlag and addCropFlag
.if generatePhoneFlag is True then check in DB and create new unique phone and insert
.if generatePhoneFlag is False - checks in DB if record exists, if not the creates new, else updates existing with crop (duplicate crop is possible)
.if addCropFlag is False then if user from CSV exists in DB, ignore the record from CSV
.if addCropFlag is True then if user from CSV exists in DB, the crop from CSV for the user gets appended to existingCropList of the user