# ethereum-console

Commandline console for Ethereum nodes.

`ethconsole` connects to a running Ethereum node via IPC/WS/HTTP
and provides an interactive javascript console containing the `web3` (1.x) object with admin extensions.

Note that the admin/debug additions are not yet official and may change over time.

Run `$ ethconsole --help` for help.

## Installation / Usage

    $ npm install -g ethereum-console
    ...

    $ ethconsole
    ETHEREUM CONSOLE
    Connecting to node at /Users/xyz/Library/Ethereum/geth.ipc
    ... Connection successful!

    Use the "web3" object to interact.
    You can find the documentation here: http://web3js.readthedocs.io/en/1.0/

    ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ
    Network: MAIN
    Current block: 5285047 [0x8a22bd], March 19th 2018, 20:46:37
    ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ

    > web3.admin.nodeInfo()
    ...

### CPP Ethereum Test Interface

`ethconsole` provides access to the cpp-ethereum test interface, which can
be used to test smart contracts that depend on timing and blocks being
mined.

    # Install the development version of cpp-ethereum on Ubuntu:
    # sudo add-apt-repository -y ppa:ethereum/ethereum-qt
    # sudo add-apt-repository -y ppa:ethereum/ethereum
    # sudo add-apt-repository -y ppa:ethereum/ethereum-dev
    # sudo apt-get -y update
    # sudo apt-get -y install eth
    #
    # Start eth in test-mode using data directory /tmp/test 
    $ eth --test -d /tmp/test &
    # Wait for it to start up...
    # Run the example:
    $ ethconsole /tmp/test/geth.ipc cppTestExample.js

These testing interfaces exist in cpp-ethereum:

    web3.test.setChainParams({}, cb(err, bool))
        set chain parameters using the json chain description
        you can use the function chainParams() from the cppTestExample.js to create such a description
    web3.test.mineBlocks(x, cb(err, bool))
        start mining and stop again after exactly x blocks
    web3.test.modifyTimestamp(x, cb(err, bool))
        set the timestamp of the current block to x
    web3.test.rewindToBlock(x, cb(err, bool))
        rewind the blockchain to block number x
    web3.test.addBlock(x, cb(err, bool)
        inject an RLP-encoded block
