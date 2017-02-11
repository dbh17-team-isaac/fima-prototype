FROM ethcore/parity:v1.5.2

ADD docker/chain.json /etc/fima/chain.json

ENTRYPOINT ["/build/parity/target/release/parity", \
	"--ui-interface", "0.0.0.0", \
	"--jsonrpc-interface", "0.0.0.0", \
        "--jsonrpc-hosts", "all", \
	"--ui-no-validation", "--chain", \
	"/etc/fima/chain.json"]

