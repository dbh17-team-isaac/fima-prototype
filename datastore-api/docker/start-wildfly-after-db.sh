#!/bin/sh

echo "Waiting for the database to come up..."
until nc -w 2 db 3306; do sleep 1; done

/opt/jboss/wildfly/bin/standalone.sh -b 0.0.0.0
