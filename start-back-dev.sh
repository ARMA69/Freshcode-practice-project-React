#!/bin/bash

##########################################################################
## Run application server part and DBs in Docker containers in DEV mode ##
##########################################################################

echo "-----> Provisioning containers"
sudo docker-compose --file docker-compose-only-back-dev.yaml up
