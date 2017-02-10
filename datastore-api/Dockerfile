FROM jboss/wildfly:10.1.0.Final

ADD docker/customization /opt/jboss/wildfly/customization/
ADD docker/modules /opt/jboss/wildfly/modules/
ADD docker/start-wildfly-after-db.sh /opt/jboss/wildfly/

# Needed for running yum
USER root

RUN yum install -y nc \
    && /opt/jboss/wildfly/customization/execute.sh

# Fix for Error: Could not rename /opt/jboss/wildfly/standalone/configuration/standalone_xml_history/current
RUN rm -rf /opt/jboss/wildfly/standalone/configuration/standalone_xml_history

CMD ["/opt/jboss/wildfly/start-wildfly-after-db.sh"]