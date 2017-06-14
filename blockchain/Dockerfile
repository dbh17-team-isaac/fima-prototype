FROM ethcore/parity:v1.5.2

RUN ln -s /parity/parity /usr/local/bin/parity

ADD docker/chain.json /etc/fima/chain.json
ADD docker/config.toml /etc/fima/config.toml
ADD docker/keys /var/lib/fima/keys/FimaChain
ADD docker/passphrases /var/lib/fima/passphrases

ENTRYPOINT ["/parity/parity", \
    "--config",  "/etc/fima/config.toml", \
    "--unlock", "0040b3504fbb1466b1054dbcab4ec617477ab53e,009dd990dcc0ba64f3ed6ff362787ba7fb01acba,005a12290f0d1c3ef2aba532e42a4afa4cbf5305,00f8272361dbed901d3968bb7cc59766c4b4a8e5,005db503bea0821f5a18aba4f089598ff6a4cf54,005d9babfd44ec7e18e6eb22b7f2114e06f64421,00bbc48803401e465f0d3c23feef0a4d173e705b,00797ff50a5d648885767000e1af8b03d7530a32,0067af5b87da32b14ff58af203cf3d4684319c5c,00e344d62f38325b57c2ae733f465fedeee6595f,00ceb73c4577084c934ea579e7a8271778449008", \
    "--password", "/var/lib/fima/passphrases/passphrases.txt", \
    "--force-ui", \
    "--ui-no-validation"]

