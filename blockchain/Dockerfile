FROM ethcore/parity:v1.5.2

ADD docker/chain.json /etc/fima/chain.json

ENTRYPOINT ["/build/parity/target/release/parity", "--ui-interface", "0.0.0.0", "--chain", "/etc/fima/chain.json"]
