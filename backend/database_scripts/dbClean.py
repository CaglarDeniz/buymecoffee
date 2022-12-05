#!/usr/bin/env python

"""
 * @file dbClean.py
 * Used in CS498RK MP4 to empty database of all users and tasks.
 *
 * @author Aswin Sivaraman
 * @date Created: Spring 2015
 * @date Modified: Spring 2015
 * @date Modified: Spring 2019
"""

import sys
import getopt
import http.client
import urllib
import json

def usage():
    print('dbClean.py -u <baseurl> -p <port>')

def getDevelopers(conn):
    # Retrieve the list of users
    conn.request("GET","""/api/developer?filter={"_id":1}""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)

    # Array of user IDs
    users = [str(d['data'][x]['_id']) for x in range(len(d['data']))]

    return users

def getInvestors(conn):
    # Retrieve the list of tasks
    conn.request("GET","""/api/investor?filter={"_id":1}""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)

    # Array of user IDs
    tasks = [str(d['data'][x]['_id']) for x in range(len(d['data']))]

    return tasks


def getProjects(conn):
    # Retrieve the list of users
    conn.request("GET","""/api/project?filter={"_id":1}""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)

    # Array of user IDs
    users = [str(d['data'][x]['_id']) for x in range(len(d['data']))]

    return users

def main(argv):

    # Server Base URL and port
    baseurl = "localhost"
    port = 8080

    try:
        opts, args = getopt.getopt(argv,"hu:p:",["url=","port="])
    except getopt.GetoptError:
        usage()
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
             usage()
             sys.exit()
        elif opt in ("-u", "--url"):
             baseurl = str(arg)
        elif opt in ("-p", "--port"):
             port = int(arg)

    # Server to connect to (1: url, 2: port number)
    conn = http.client.HTTPConnection(baseurl, port)

    # Fetch a list of users
    devs = getDevelopers(conn)

    # Loop for as long as the database still returns users
    while len(devs):

        # Delete each individual user
        for dev in devs:
            conn.request("DELETE","/api/developer/single_developer/"+dev)
            response = conn.getresponse()
            data = response.read()

        # Fetch a list of users
        devs = getDevelopers(conn)

    invs = getInvestors(conn)

    # Loop for as long as the database still returns tasks
    while len(invs):

        # Delete each individual investor
        for inv in invs:
            conn.request("DELETE","/api/investor/"+inv)
            response = conn.getresponse()
            data = response.read()

        # Fetch a list of tasks
        invs = getInvestors(conn)
    
    projs = getProjects(conn)
    while len(projs):

        # Delete each individual investor
        for proj in projs:
            conn.request("DELETE","/api/project/"+proj)
            response = conn.getresponse()
            data = response.read()

        # Fetch a list of tasks
        projs = getProjects(conn)

    # Exit gracefully
    conn.close()
    print("All Developers, Investors and Projects removed at "+baseurl+":"+str(port))


if __name__ == "__main__":
     main(sys.argv[1:])
