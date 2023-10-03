import requests
import time

def wait_for_server_to_be_up(url, max_retries=20, delay_seconds=5):
    retries = 0

    while retries < max_retries:
        try:
            response = requests.get(url)
            
            # Check for successful connection and optionally status
            if response.status_code == 200:
                print("Connected successfully.")
                return True
            
        except requests.ConnectionError as e:
            print(f"Unable to connect to the server. Retrying... [{retries}/{max_retries}]")
        
        retries += 1
        time.sleep(delay_seconds)
    
    print("Max retries reached. Exiting.")
    return False

if __name__ == "__main__":
    url = "http://127.0.0.1:5000/predict_future"
    wait_for_server_to_be_up(url)
