# from ast import If
from datetime import date
from datetime import timedelta
import json
from faker import Faker
import random

# t = timedelta(days=1);
# d = date(2022, 12, 31);
# d= d+t
# print(d)

fake=Faker()
dateList = list(range(1, 32))
resultArray=[]

for dateStart in dateList:
    
    index = 20
    while index >= 0:
        # Address
        add=fake.address()
        # Dates
        d = date(2023, 1, dateStart);
        t = timedelta(days=random.randint(4,8));
        newDate= d+t;
        dates = [{"$D":dateStart,"$M":0,"$y":2023},{"$D":newDate.day,"$M":newDate.month-1,"$y":newDate.year}]
        # DatesStr
        datesstr= [str(dates[0]["$y"])+"-"+str(dates[0]["$M"]+1)+"-"+str(dates[0]["$D"]),
                   str(dates[1]["$y"])+"-"+str(dates[1]["$M"]+1)+"-"+str(dates[1]["$D"])]
        # Price
        p = random.randint(2, 8)
        price = p*100-1
        # Price string
        priceStr = str(price)
        # priceStr = priceStr[:1] + "," + priceStr[1:]  
        # Bed
        bed=random.randint(3,6)
        # Bath
        bath=random.randint(3, 6)
        # Area
        area =str(random.randint(30, 50))+ "×" +str(random.randint(30, 50))
        # Name
        name=add.split("\n")[1].split(", ")[0]
        # Booked
        booked=False

        if(add.rfind(", ")!=-1 and add.rfind("Box")==-1):
            location = add.split(", ")[1].split(" ")[0]
            print(location)
            resultArray.append({"name":name,"address":add,"pricestr":priceStr,"price":price,"bed":bed,"bath":bath,"area":area,"location":location,"booked":booked,"datesstr":datesstr})

        index -= 1
    
    
    

jsonString = json.dumps(resultArray)
jsonString2 = jsonString.replace('\\n',' ')
print(jsonString2)

jsonFile = open("data.json", "w")
jsonFile.write(jsonString2)
jsonFile.close()
