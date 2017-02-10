FROM jboss/wildfly:10.1.0.Final

ADD docker/customization /opt/jboss/wildfly/customization/
ADD docker/modules /opt/jboss/wildfly/modules/

RUN /opt/jboss/wildfly/customization/execute.sh

# Fix for Error: Could not rename /opt/jboss/wildfly/standalone/configuration/standalone_xml_history/current
RUN rm -rf /opt/jboss/wildfly/standalone/configuration/standalone_xml_history

ADD target/fima-datastore-api.war /opt/jboss/wildfly/standalone/deployments/

CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0"]