#!/usr/bin/env bash

# get root access
sudo su

# update package manager
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
apt-get update

# install node
apt-get install -y g++
curl -sL https://deb.nodesource.com/setup_7.0 | sudo -E bash -
sudo apt-get install -y nodejs

#install and launch mongodb
apt-get install -y mongodb-org
service mongod start

# install nginx
apt-get -y install nginx
service nginx start

# set up nginx server
rm /etc/nginx/sites-available/default
rm /etc/nginx/sites-enabled/default
cp /srv/.provision/nginx/nginx.conf /etc/nginx/sites-available/site.conf
chmod 644 /etc/nginx/sites-available/site.conf
ln -sf /etc/nginx/sites-available/site.conf /etc/nginx/sites-enabled/site.conf
sed -e "s/sendfile on;/sendfile off;/" /etc/nginx/nginx.conf > temp_file
mv -f temp_file /etc/nginx/nginx.conf
service nginx restart

# set locale to access mongodb from command line
export LC_ALL=C

# add default ssh dir
echo "cd /srv" | tee -a /etc/bash.bashrc
