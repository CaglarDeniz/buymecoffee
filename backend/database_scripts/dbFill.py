#!/usr/bin/env python

"""
 * @file dbFill.py
 * Used in CS498RK MP4 to populate database with randomly generated devs.
"""

import sys
import getopt
import http.client
import urllib
import json
import openai
from os import getenv
from random import randint
from random import choice
from random import sample
from datetime import date
from time import mktime
from random import shuffle

openai.api_key = getenv("OPENAI_API_KEY")

def usage():
    print(
        "dbFill.py -u <baseurl> -p <port> -d <numDevs> -i <numInvestors> -r <numProjects>"
    )


def getDevelopers(conn):
    # Retrieve the list of developers
    conn.request("GET", """/api/developer""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)

    # Array of user IDs
    devs = [str(d["data"][x]["username"]) for x in range(len(d["data"]))]

    return devs


def main(argv):

    # Server Base URL and port
    baseurl = "localhost"
    port = 8080

    # Number of POSTs that will be made to the server
    devCount = 50
    investorCount = 200
    projectCount = 64

    try:
        opts, args = getopt.getopt(
            argv, "hu:p:d:i:r", ["url=", "port=", "devs=", "investors=", "projects="]
        )
    except getopt.GetoptError:
        usage()
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            usage()
            sys.exit()
        elif opt in ("-u", "--url"):
            baseurl = str(arg)
        elif opt in ("-p", "--port"):
            port = int(arg)
        elif opt in ("-d", "--devs"):
            devCount = int(arg)
        elif opt in ("-i", "--investors"):
            investorCount = int(arg)
        elif opt in ("-r", "--projects"):
            projectCount = int(arg)

    # Python array containing common first names and last names
    firstNames = [
        "james",
        "john",
        "robert",
        "michael",
        "william",
        "david",
        "richard",
        "charles",
        "joseph",
        "thomas",
        "christopher",
        "daniel",
        "paul",
        "mark",
        "donald",
        "george",
        "kenneth",
        "steven",
        "edward",
        "brian",
        "ronald",
        "anthony",
        "kevin",
        "jason",
        "matthew",
        "gary",
        "timothy",
        "jose",
        "larry",
        "jeffrey",
        "frank",
        "scott",
        "eric",
        "stephen",
        "andrew",
        "raymond",
        "gregory",
        "joshua",
        "jerry",
        "dennis",
        "walter",
        "patrick",
        "peter",
        "harold",
        "douglas",
        "henry",
        "carl",
        "arthur",
        "ryan",
        "roger",
        "joe",
        "juan",
        "jack",
        "albert",
        "jonathan",
        "justin",
        "terry",
        "gerald",
        "keith",
        "samuel",
        "willie",
        "ralph",
        "lawrence",
        "nicholas",
        "roy",
        "benjamin",
        "bruce",
        "brandon",
        "adam",
        "harry",
        "fred",
        "wayne",
        "billy",
        "steve",
        "louis",
        "jeremy",
        "aaron",
        "randy",
        "howard",
        "eugene",
        "carlos",
        "russell",
        "bobby",
        "victor",
        "martin",
        "ernest",
        "phillip",
        "todd",
        "jesse",
        "craig",
        "alan",
        "shawn",
        "clarence",
        "sean",
        "philip",
        "chris",
        "johnny",
        "earl",
        "jimmy",
        "antonio",
        "danny",
        "bryan",
        "tony",
        "luis",
        "mike",
        "stanley",
        "leonard",
        "nathan",
        "dale",
        "manuel",
        "rodney",
        "curtis",
        "norman",
        "allen",
        "marvin",
        "vincent",
        "glenn",
        "jeffery",
        "travis",
        "jeff",
        "chad",
        "jacob",
        "lee",
        "melvin",
        "alfred",
        "kyle",
        "francis",
        "bradley",
        "jesus",
        "herbert",
        "frederick",
        "ray",
        "joel",
        "edwin",
        "don",
        "eddie",
        "ricky",
        "troy",
        "randall",
        "barry",
        "alexander",
        "bernard",
        "mario",
        "leroy",
        "francisco",
        "marcus",
        "micheal",
        "theodore",
        "clifford",
        "miguel",
        "oscar",
        "jay",
        "jim",
        "tom",
        "calvin",
        "alex",
        "jon",
        "ronnie",
        "bill",
        "lloyd",
        "tommy",
        "leon",
        "derek",
        "warren",
        "darrell",
        "jerome",
        "floyd",
        "leo",
        "alvin",
        "tim",
        "wesley",
        "gordon",
        "dean",
        "greg",
        "jorge",
        "dustin",
        "pedro",
        "derrick",
        "dan",
        "lewis",
        "zachary",
        "corey",
        "herman",
        "maurice",
        "vernon",
        "roberto",
        "clyde",
        "glen",
        "hector",
        "shane",
        "ricardo",
        "sam",
        "rick",
        "lester",
        "brent",
        "ramon",
        "charlie",
        "tyler",
        "gilbert",
        "gene",
    ]
    lastNames = [
        "smith",
        "johnson",
        "williams",
        "jones",
        "brown",
        "davis",
        "miller",
        "wilson",
        "moore",
        "taylor",
        "anderson",
        "thomas",
        "jackson",
        "white",
        "harris",
        "martin",
        "thompson",
        "garcia",
        "martinez",
        "robinson",
        "clark",
        "rodriguez",
        "lewis",
        "lee",
        "walker",
        "hall",
        "allen",
        "young",
        "hernandez",
        "king",
        "wright",
        "lopez",
        "hill",
        "scott",
        "green",
        "adams",
        "baker",
        "gonzalez",
        "nelson",
        "carter",
        "mitchell",
        "perez",
        "roberts",
        "turner",
        "phillips",
        "campbell",
        "parker",
        "evans",
        "edwards",
        "collins",
        "stewart",
        "sanchez",
        "morris",
        "rogers",
        "reed",
        "cook",
        "morgan",
        "bell",
        "murphy",
        "bailey",
        "rivera",
        "cooper",
        "richardson",
        "cox",
        "howard",
        "ward",
        "torres",
        "peterson",
        "gray",
        "ramirez",
        "james",
        "watson",
        "brooks",
        "kelly",
        "sanders",
        "price",
        "bennett",
        "wood",
        "barnes",
        "ross",
        "henderson",
        "coleman",
        "jenkins",
        "perry",
        "powell",
        "long",
        "patterson",
        "hughes",
        "flores",
        "washington",
        "butler",
        "simmons",
        "foster",
        "gonzales",
        "bryant",
        "alexander",
        "russell",
        "griffin",
        "diaz",
        "hayes",
    ]

    industryNames = [
        "healthcare",
        "automotive",
        "communication",
        "entertainment",
        "retail",
        "food",
        "energy",
        "finance",
        "construction",
        "aerospace",
        "software",
        "chemical",
        "real estate",
    ]

    # Server to connect to (1: url, 2: port number)
    conn = http.client.HTTPConnection(baseurl, port)

    # HTTP Headers
    headers = {
        "Content-type": "application/x-www-form-urlencoded",
        "Accept": "text/plain",
    }

    # Array of user IDs
    devIDs = []
    devNames = []
    devEmails = []
    devUserNames = []

    shuffle(firstNames)
    shuffle(lastNames)

    # Loop 'userCount' number of times
    for i in range(devCount):

        # Pick a random first name and last name
        industryList = sample(industryNames,3)

        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"Write a short biography for {firstNames[i]} {lastNames[i]}. {firstNames[i]} {lastNames[i]} is an entrepreneur working in the {industryList[0]} industry",
            temperature=0.7,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )

        # print(response)

        params = urllib.parse.urlencode(
            {
                "name": firstNames[i] + " " + lastNames[i],
                "email": firstNames[i] + "@" + lastNames[i] + ".com",
                "username": firstNames[i] + "_" + lastNames[i],
                "password": "ilovellamas",
                "industry" : industryList,
                "bio": response["choices"]["text"]
            }
        )

        # POST the user
        conn.request("POST", "/api/developer", params, headers)
        response = conn.getresponse()
        data = response.read()
        d = json.loads(data)

        # Store the users id
        devIDs.append(str(d["data"]["_id"]))
        devNames.append(str(d["data"]["name"]))
        devEmails.append(str(d["data"]["email"]))
        devUserNames.append(str(d["data"]["username"]))
        print(f"Saved developer number {i}")

    # Loop 'taskCount' number of times
    # for i in range(taskCount):

    #     # Randomly generate task parameters
    #     assigned = randint(0, 10) > 4
    #     assignedUser = randint(0, len(userIDs) - 1) if assigned else -1
    #     assignedUserID = userIDs[assignedUser] if assigned else ""
    #     assignedUserName = userNames[assignedUser] if assigned else "unassigned"
    #     assignedUserEmail = userEmails[assignedUser] if assigned else "unassigned"
    #     completed = randint(0, 10) > 5
    #     deadline = (mktime(date.today().timetuple()) + randint(86400, 864000)) * 1000
    #     description = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
    #     params = urllib.parse.urlencode(
    #         {
    #             "name": choice(taskNames),
    #             "deadline": deadline,
    #             "assignedUserName": assignedUserName,
    #             "assignedUser": assignedUserID,
    #             "completed": str(completed).lower(),
    #             "description": description,
    #         }
    #     )

    #     # POST the task
    #     conn.request("POST", "/api/tasks", params, headers)
    #     response = conn.getresponse()
    #     data = response.read()
    #     d = json.loads(data)

    #     taskID = str(d["data"]["_id"])

    #     # Make sure the task is added to the pending list of the user
    #     if assigned and not completed:
    #         # GET the correct user
    #         conn.request(
    #             "GET", """/api/users?where={"_id":\"""" + assignedUserID + """\"}"""
    #         )
    #         response = conn.getresponse()
    #         data = response.read()
    #         d = json.loads(data)

    #         # Store all the user properties
    #         assignedUserName = str(d["data"][0]["name"])
    #         assignedUserEmail = str(d["data"][0]["email"])
    #         assignedUserDate = str(d["data"][0]["dateCreated"])

    #         # Append the new taskID to pending tasks
    #         assignedUserTasks = d["data"][0]["pendingTasks"]
    #         assignedUserTasks = [
    #             str(x)
    #             .replace("[", "")
    #             .replace("]", "")
    #             .replace("'", "")
    #             .replace('"', "")
    #             for x in assignedUserTasks
    #         ]
    #         assignedUserTasks.append(taskID)

    #         # PUT in the user
    #         params = urllib.parse.urlencode(
    #             {
    #                 "_id": assignedUserID,
    #                 "name": assignedUserName,
    #                 "email": assignedUserEmail,
    #                 "dateCreated": assignedUserDate,
    #                 "pendingTasks": assignedUserTasks,
    #             },
    #             True,
    #         )
    #         conn.request("PUT", "/api/users/" + assignedUserID, params, headers)
    #         response = conn.getresponse()
    #         data = response.read()
    #         d = json.loads(data)

    # Exit gracefully
    conn.close()
    print(
        str(devCount)
        + " developers added at "
        + baseurl
        + ":"
        + str(port)
    )


if __name__ == "__main__":
    main(sys.argv[1:])
