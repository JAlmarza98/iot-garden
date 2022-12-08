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
m = Figlet(font='small')

print(colored(f.renderText(f'IOT data colector'), 'green'))
for _ in track(range(100), description='[green]Checking nodes'):
    initializing_bot()

# Check connections before start de loop
connection_errors = 0
api = requests.post('http://localhost:8080/api/climate/')
node1 = requests.get("http://192.168.1.193/")

if ( api.status_code != 200): 
    ++connection_errors
    print(colored("◉", 'red'), "API error")
else:
    print(colored("◉", 'green'), "API OK")

if ( node1.status_code != 200):
    ++connection_errors
    print(colored("◉", 'red'), "NODE_1 error")
else :
    print(colored("◉", 'green'), "NODE_1 OK")

if (connection_errors != 0):
    sys.exit()

# Beatiful message for loop star
for _ in track(range(100), description='[green]Initializing bot'):
    initializing_bot()

print(colored(m.renderText(f'Bot started, colecting data'), 'green'))

while True :

    # Get the current time in miliseconds
    dt = datetime.now()
    dt = int(dt.timestamp() * 1000)

    # Request for climate data to ESP8266 module
    try:
        response = requests.get("http://192.168.1.193/")
        data = json.loads(response.text, object_hook=lambda d: SimpleNamespace(**d))

        # Create an object instance
        objData = Climate_data(data.variables.temperature,data.variables.humidity,data.variables.pollution,dt)
        jsonBody = json.dumps(objData.__dict__)

        post = requests.post('http://localhost:8080/api/climate/save',json = json.loads(jsonBody) )

    except:
        print("An exception occurred during data manipulation")

    # Repeat every 15 minutes
    time.sleep(900)