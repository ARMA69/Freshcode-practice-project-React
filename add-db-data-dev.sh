#!/bin/bash

##########################################
## Run application migrations and seeds ##
## (create DB tables and add test data) ##
##########################################


started_at=$(date +"%s")

# Run Sequalize's migrations.
echo "-----> Running application migrations"
sudo docker exec -it $(basename ${PWD##*/})_server-dev_1 sequelize db:migrate
echo "<----- Migrations created"

# Run Sequalize's seeds.
echo "-----> Running application seeds"
sudo docker exec -it $(basename ${PWD##*/})_server-dev_1 sequelize db:seed:all
echo "<----- Seeds created"

ended_at=$(date +"%s")

minutes=$(((ended_at - started_at) / 60))
seconds=$(((ended_at - started_at) % 60))

echo "-----> Done in ${minutes}m${seconds}s"
