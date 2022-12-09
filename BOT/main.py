import sys
import time
import json
import requests
from types import SimpleNamespace
from datetime import datetime
from termcolor import colored
from pyfiglet import Figlet
from rich.progress import track


# Climate data class
class Climate_data:

    # Data i want to store
    temperature: 0
    humidity: 0
    pollution: 0
    time_date: 0
   
    # Class default constructor
    def __init__(self,temperature,humidity,pollution,time_date): 
        self.temperature = temperature
        self.humidity = humidity
        self.pollution = pollution
        self.time_date = time_date

def initializing_bot():
    time.sleep(0.1)

# Main execution

f = Figlet(font='standard')

apiURL = 'http://localhost:8080'
node1URL = "http://192.168.1.184/"

print(colored(f.renderText(f'IOT data colector'), 'green'))
for _ in track(range(100), description='[green]Checking nodes'):
    initializing_bot()

print()

# Check connections before start de loop
connection_errors = 0
try: 
    api = requests.post(apiURL+"/api/climate/")
    print(colored("◉", 'green'), "API OK")
except:
    connection_errors += 1
    print(colored("◉", 'red'), "API error")

try: 
    node1 = requests.get(node1URL)
    print(colored("◉", 'green'), "NODE_1 OK")
except:
    connection_errors += 1
    print(colored("◉", 'red'), "NODE_1 error")

print()

if (connection_errors != 0):
    print(colored("[ERROR] - All nodes should be up and running", 'red'))
    sys.exit()

# Beatiful message for loop star
for _ in track(range(100), description='[green]Initializing bot'):
    initializing_bot()

print()
print(colored('Bot started, colecting data', 'green'))
print()

while True :

    # Get the current time in miliseconds
    dt = datetime.now()
    dt = int(dt.timestamp() * 1000)

    # Request for climate data to ESP8266 module
    try:
        response = requests.get(node1URL)
        data = json.loads(response.text, object_hook=lambda d: SimpleNamespace(**d))

        # Create an object instance
        objData = Climate_data(data.variables.temperature,data.variables.humidity,data.variables.pollution,dt)
        jsonBody = json.dumps(objData.__dict__)

        post = requests.post(apiURL+"/api/climate/save",json = json.loads(jsonBody) )
        print("["+str(datetime.fromtimestamp(dt/1000.0).strftime("%m/%d/%Y, %H:%M:%S"))+"] - Data colected")


    except:
        message = "["+ str(datetime.fromtimestamp(dt/1000.0).strftime("%m/%d/%Y, %H:%M:%S"))+"] - An exception occurred during data manipulation"
        print(colored(message, 'red'))

    # Repeat every 15 minutes
    time.sleep(900)