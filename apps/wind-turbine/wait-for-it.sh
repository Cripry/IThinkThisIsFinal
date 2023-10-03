#!/bin/bash

host=${1:-"127.0.0.1"}
port=${2:-5000}
max_retries=400
delay_seconds=5

for i in $(seq 1 $max_retries); do
  response=$(curl -o /dev/null -s -w "%{http_code}" http://$host:$port/predict_future)
  
  if [ "$response" -eq "200" ] || [ "$response" -eq "500" ] || [ "$response" -eq "400" ]; then
    echo "Connected successfully."
    exit 0
  fi
  
  echo "Waiting until the Flask server is started [$i/$max_retries]"
  sleep $delay_seconds
done

echo "Max retries reached. Exiting."
exit 1
