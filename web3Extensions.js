// Copyright 2015 The go-ethereum Authors
// This file is part of the go-ethereum library.
//
// The go-ethereum library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The go-ethereum library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the go-ethereum library. If not, see <http://www.gnu.org/licenses/>.


// var Modules = map[string]string{
//     "admin":      Admin_JS,
//     "chequebook": Chequebook_JS,
//     "clique":     Clique_JS,
//     "debug":      Debug_JS,
//     "eth":        Eth_JS,
//     "miner":      Miner_JS,
//     "net":        Net_JS,
//     "personal":   Personal_JS,
//     "rpc":        RPC_JS,
//     "shh":        Shh_JS,
//     "swarmfs":    SWARMFS_JS,
//     "txpool":     TxPool_JS,
// }


module.exports = {
    extend: function(web3, global) {

        web3.extend({
            property: 'chequebook',
            methods: [
                {
                    name: 'deposit',
                    call: 'chequebook_deposit',
                    params: 1,
                    inputFormatter: [null]
                },
                {
                    name: 'balance',
                    call: 'chequebook_balance',
                    outputFormatter: web3.utils.toDecimal
                },
                {
                    name: 'cash',
                    call: 'chequebook_cash',
                    params: 1,
                    inputFormatter: [null]
                },
                {
                    name: 'issue',
                    call: 'chequebook_issue',
                    params: 2,
                    inputFormatter: [null, null]
                },
            ]
        });

        web3.extend({
            property: 'clique',
            methods: [
                {
                    name: 'getSnapshot',
                    call: 'clique_getSnapshot',
                    params: 1,
                    inputFormatter: [null]
                },
                {
                    name: 'getSnapshotAtHash',
                    call: 'clique_getSnapshotAtHash',
                    params: 1
                },
                {
                    name: 'getSigners',
                    call: 'clique_getSigners',
                    params: 1,
                    inputFormatter: [null]
                },
                {
                    name: 'getSignersAtHash',
                    call: 'clique_getSignersAtHash',
                    params: 1
                },
                {
                    name: 'propose',
                    call: 'clique_propose',
                    params: 2
                },
                {
                    name: 'discard',
                    call: 'clique_discard',
                    params: 1
                },
                {
                    name: 'proposals',
                    call: 'clique_proposals'
                },
            ]
        });


        web3.extend({
            property: 'admin',
            methods: [
                {
                    name: 'addPeer',
                    call: 'admin_addPeer',
                    params: 1
                },
                {
                    name: 'removePeer',
                    call: 'admin_removePeer',
                    params: 1
                },
                {
                    name: 'exportChain',
                    call: 'admin_exportChain',
                    params: 1,
                    inputFormatter: [null]
                },
                {
                    name: 'importChain',
                    call: 'admin_importChain',
                    params: 1
                },
                {
                    name: 'sleepBlocks',
                    call: 'admin_sleepBlocks',
                    params: 2
                },
                {
                    name: 'startRPC',
                    call: 'admin_startRPC',
                    params: 4,
                    inputFormatter: [null, null, null, null]
                },
                {
                    name: 'stopRPC',
                    call: 'admin_stopRPC'
                },
                {
                    name: 'startWS',
                    call: 'admin_startWS',
                    params: 4,
                    inputFormatter: [null, null, null, null]
                },
                {
                    name: 'stopWS',
                    call: 'admin_stopWS'
                },
                {
                    name: 'nodeInfo',
                    call: 'admin_nodeInfo'
                },
                {
                    name: 'peers',
                    call: 'admin_peers'
                },
                {
                    name: 'datadir',
                    call: 'admin_datadir'
                },
            ]
        });


        web3.extend({
            property: 'debug',
            methods: [
                {
                    name: 'printBlock',
                    call: 'debug_printBlock',
                    params: 1
                },
                {
                    name: 'getBlockRlp',
                    call: 'debug_getBlockRlp',
                    params: 1
                },
                {
                    name: 'setHead',
                    call: 'debug_setHead',
                    params: 1
                },
                {
                    name: 'seedHash',
                    call: 'debug_seedHash',
                    params: 1
                },
                {
                    name: 'dumpBlock',
                    call: 'debug_dumpBlock',
                    params: 1
                },
                {
                    name: 'chaindbProperty',
                    call: 'debug_chaindbProperty',
                    params: 1,
                    outputFormatter: console.log
                },
                {
                    name: 'chaindbCompact',
                    call: 'debug_chaindbCompact',
                },
                {
                    name: 'metrics',
                    call: 'debug_metrics',
                    params: 1
                },
                {
                    name: 'verbosity',
                    call: 'debug_verbosity',
                    params: 1
                },
                {
                    name: 'vmodule',
                    call: 'debug_vmodule',
                    params: 1
                },
                {
                    name: 'backtraceAt',
                    call: 'debug_backtraceAt',
                    params: 1,
                },
                {
                    name: 'stacks',
                    call: 'debug_stacks',
                    params: 0,
                    outputFormatter: console.log
                },
                {
                    name: 'freeOSMemory',
                    call: 'debug_freeOSMemory',
                    params: 0,
                },
                {
                    name: 'setGCPercent',
                    call: 'debug_setGCPercent',
                    params: 1,
                },
                {
                    name: 'memStats',
                    call: 'debug_memStats',
                    params: 0,
                },
                {
                    name: 'gcStats',
                    call: 'debug_gcStats',
                    params: 0,
                },
                {
                    name: 'cpuProfile',
                    call: 'debug_cpuProfile',
                    params: 2
                },
                {
                    name: 'startCPUProfile',
                    call: 'debug_startCPUProfile',
                    params: 1
                },
                {
                    name: 'stopCPUProfile',
                    call: 'debug_stopCPUProfile',
                    params: 0
                },
                {
                    name: 'goTrace',
                    call: 'debug_goTrace',
                    params: 2
                },
                {
                    name: 'startGoTrace',
                    call: 'debug_startGoTrace',
                    params: 1
                },
                {
                    name: 'stopGoTrace',
                    call: 'debug_stopGoTrace',
                    params: 0
                },
                {
                    name: 'blockProfile',
                    call: 'debug_blockProfile',
                    params: 2
                },
                {
                    name: 'setBlockProfileRate',
                    call: 'debug_setBlockProfileRate',
                    params: 1
                },
                {
                    name: 'writeBlockProfile',
                    call: 'debug_writeBlockProfile',
                    params: 1
                },
                {
                    name: 'mutexProfile',
                    call: 'debug_mutexProfile',
                    params: 2
                },
                {
                    name: 'setMutexProfileRate',
                    call: 'debug_setMutexProfileRate',
                    params: 1
                },
                {
                    name: 'writeMutexProfile',
                    call: 'debug_writeMutexProfile',
                    params: 1
                },
                {
                    name: 'writeMemProfile',
                    call: 'debug_writeMemProfile',
                    params: 1
                },
                {
                    name: 'traceBlock',
                    call: 'debug_traceBlock',
                    params: 2,
                    inputFormatter: [null, null]
                },
                {
                    name: 'traceBlockFromFile',
                    call: 'debug_traceBlockFromFile',
                    params: 2,
                    inputFormatter: [null, null]
                },
                {
                    name: 'traceBlockByNumber',
                    call: 'debug_traceBlockByNumber',
                    params: 2,
                    inputFormatter: [null, null]
                },
                {
                    name: 'traceBlockByHash',
                    call: 'debug_traceBlockByHash',
                    params: 2,
                    inputFormatter: [null, null]
                },
                {
                    name: 'traceTransaction',
                    call: 'debug_traceTransaction',
                    params: 2,
                    inputFormatter: [null, null]
                },
                {
                    name: 'preimage',
                    call: 'debug_preimage',
                    params: 1,
                    inputFormatter: [null]
                },
                {
                    name: 'getBadBlocks',
                    call: 'debug_getBadBlocks',
                    params: 0,
                },
                {
                    name: 'storageRangeAt',
                    call: 'debug_storageRangeAt',
                    params: 5,
                },
                {
                    name: 'getModifiedAccountsByNumber',
                    call: 'debug_getModifiedAccountsByNumber',
                    params: 2,
                    inputFormatter: [null, null],
                },
                {
                    name: 'getModifiedAccountsByHash',
                    call: 'debug_getModifiedAccountsByHash',
                    params: 2,
                    inputFormatter:[null, null],
                },
            ]
        });


        web3.extend({
            property: 'eth',
            methods: [

                {
                    name: 'resend',
                    call: 'eth_resend',
                    params: 3,
                    inputFormatter: [web3.extend.formatters.inputTransactionFormatter, web3.utils.fromDecimal, web3.utils.fromDecimal]
                },
                {
                    name: 'submitTransaction',
                    call: 'eth_submitTransaction',
                    params: 1,
                    inputFormatter: [web3.extend.formatters.inputTransactionFormatter]
                },
                {
                    name: 'getRawTransaction',
                    call: 'eth_getRawTransactionByHash',
                    params: 1
                },
                {
                    name: 'getRawTransactionFromBlock',
                    call: function(args) {
                        return (web3.utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'eth_getRawTransactionByBlockHashAndIndex' : 'eth_getRawTransactionByBlockNumberAndIndex';
                    },
                    params: 2,
                    inputFormatter: [web3.extend.formatters.inputBlockNumberFormatter, web3.utils.toHex]
                },
                {
                    name: 'pendingTransactions',
                    call: 'eth_pendingTransactions',
                    outputFormatter: function(txs) {
                        var formatted = [];
                        for (var i = 0; i < txs.length; i++) {
                            formatted.push(web3.extend.formatters.outputTransactionFormatter(txs[i]));
                            formatted[i].blockHash = null;
                        }
                        return formatted;
                    }
                },
            ]
        });


        web3.extend({
            property: 'miner',
            methods: [
                {
                    name: 'start',
                    call: 'miner_start',
                    params: 1,
                    inputFormatter: [null]
                },
                {
                    name: 'stop',
                    call: 'miner_stop'
                },
                {
                    name: 'setEtherbase',
                    call: 'miner_setEtherbase',
                    params: 1,
                    inputFormatter: [web3.extend.formatters.inputAddressFormatter]
                },
                {
                    name: 'setExtra',
                    call: 'miner_setExtra',
                    params: 1
                },
                {
                    name: 'setGasPrice',
                    call: 'miner_setGasPrice',
                    params: 1,
                    inputFormatter: [web3.utils.fromDecimal]
                },
                {
                    name: 'getHashrate',
                    call: 'miner_getHashrate'
                },
            ],
            properties: []
        });


        web3.eth.extend({
            property: 'personal',
            methods: [
                {
                    name: 'importRawKey',
                    call: 'personal_importRawKey',
                    params: 2
                },
                {
                    name: 'openWallet',
                    call: 'personal_openWallet',
                    params: 2
                },
                {
                    name: 'deriveAccount',
                    call: 'personal_deriveAccount',
                    params: 3
                },
                // Remove after web3.js release
                {
                    name: 'signTransaction',
                    call: 'personal_signTransaction',
                    params: 2,
                    inputFormatter: [web3.extend.formatters.inputTransactionFormatter, null]
                },
                {
                    name: 'listWallets',
                    call: 'personal_listWallets'
                },
            ]
        })


        web3.extend({
            property: 'rpc',
            methods: [
                {
                    name: 'modules',
                    call: 'rpc_modules'
                },
            ]
        });



        web3.extend({
            property: 'swarmfs',
            methods:
            [
                {
                    name: 'mount',
                    call: 'swarmfs_mount',
                    params: 2
                },
                {
                    name: 'unmount',
                    call: 'swarmfs_unmount',
                    params: 1
                },
                {
                    name: 'listmounts',
                    call: 'swarmfs_listmounts',
                    params: 0
                },
            ]
        });


        web3.extend({
            property: 'txpool',
            methods: [
                {
                    name: 'content',
                    call: 'txpool_content'
                },
                {
                    name: 'inspect',
                    call: 'txpool_inspect'
                },
                {
                    name: 'status',
                    call: 'txpool_status',
                    outputFormatter: function(status) {
                        status.pending = web3.utils.toDecimal(status.pending);
                        status.queued = web3.utils.toDecimal(status.queued);
                        return status;
                    }
                },
            ]
        });


        ['txpool','swarmfs','rpc','miner','debug','admin','chequebook'].forEach(function(type) {
            global[type] = web3[type];
        });
        global.personal = web3.eth.personal;
    }
};