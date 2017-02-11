FROM ethcore/parity:v1.5.2

RUN ln -s /build/parity/target/release/parity /usr/local/bin/parity

ADD docker/chain.json /etc/fima/chain.json
ADD docker/config.toml /etc/fima/config.toml

ENTRYPOINT ["/build/parity/target/release/parity", \
    "--config",  "/etc/fima/config.toml", \
	"--ui-no-validation"]
