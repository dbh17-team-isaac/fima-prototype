FROM ethcore/parity:v1.5.2

ADD docker/chain.json /etc/fima/chain.json

ENTRYPOINT ["/build/parity/target/release/parity", "--chain", "/etc/fima/chain.json"]
