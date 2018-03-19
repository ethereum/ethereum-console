#!/usr/bin/env node

/*
	Run by default in interactive mode. When called in script mode, process.exit() should be called in your script to exit the nodejs app.
	Arguments:
	- a path which target a JavaScript file to execute (.js extension).
	- a path which target an ipc path.
*/


var net = require('net');
var repl = require('repl');
var promisify = require("repl-promised").promisify;
var moment = require('moment');
var fs = require('fs')
var vm = require('vm');
var ipcpath = require('./getIpcPath.js');
require('es6-shim');

var Web3 = require('web3');
var web3Extensions = require('./web3Extensions.js');

// Arguments
var ipcPath = ipcpath();
var wsPath, httpPath, jsScript;
processArguments();


// select provider
var provider, providerPath;
if (wsPath) {
	providerPath = wsPath;
	provider = new Web3.providers.WebsocketProvider(providerPath);
} else if (httpPath) {
	providerPath = httpPath;
	provider = new Web3.providers.HttpProvider(providerPath);
} else if (ipcPath) {
	providerPath = ipcPath;
	provider = new Web3.providers.IpcProvider(providerPath, net);
}

process.on('uncaughtException', function(err) {
	console.error("Uncaught exception: " + err);
});

console.log("ETHEREUM CONSOLE");
console.log("Connecting to node at " + providerPath);

if (wsPath || httpPath) {
	console.log("\nWARNING! You're connecting through an unsecure connection!\n"+
		"Using this console API allows you to send passwords over this connection,\n"+
		"please make sure to secure your connection to prevent loss of funds!\n\n"+
		"Additionally you need to activate in your node extra debug APIs manually.\n");
}

var web3 = new Web3(provider);
web3Extensions.extend(web3, global);
global.web3 = web3;

// attach main modules globally
['eth','bzz','shh','utils'].forEach(function(type) {
	global[type] = web3[type];
});



web3.eth.net.getNetworkType()
.then(function(type){
	console.log("... Connection successful!\n");

	console.log("Use the \"web3\" object to interact.\nYou can find the documentation here: http://web3js.readthedocs.io/en/1.0/\n");


	console.log("ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ");
	console.log("Network: " + type.toUpperCase());
	return web3.eth.getBlock('latest');
})
.then(function(block) {
	console.log("Current block: "+ block.number + " [" + block.hash.substr(0,8) +"], "+ moment.unix(block.timestamp).format('MMMM Do YYYY, HH:mm:ss') +"");
})
.then(function(){

console.log("ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ\n");

	if (jsScript)
		executeScript(jsScript);
	else {

		// log latest block
		// web3.eth.subscribe('newBlockHeaders', function(error, block){
		// 	console.log("Block "+ block.hash.substr(0,8) +" arrived: " + block.number + " ("+ moment.unix(block.timestamp).format('MMMM Do YYYY, HH:mm:ss') +")");
		// });

		promisify(repl.start({
			prompt: "> ",
			input: process.stdin,
			output: process.stdout
		}));
	}
})
.catch(function(e){
	console.error("\nERROR");
	console.error(String(e));
	console.log('Exit due to error.');
	process.exit();
});


function processArguments()
{
	for (var k = 2; k < process.argv.length; k++) {
		var arg = process.argv[k];

		if (arg === "help" || arg === "--help" || arg === "-h")
			help();
		else if (arg.startsWith("ipc:") || arg.endsWith(".ipc"))
			ipcPath = arg.startsWith("ipc:") ? arg.substring(4) : arg;
		else if (arg.startsWith("ws://"))
			wsPath = arg;
		else if (arg.startsWith("http://") || arg.startsWith("https://"))
			httpPath = arg;
		else if (arg.endsWith(".js"))
			jsScript = arg;
		else {
			console.log("Argument not recognized: " + arg +"\n");
			help();
			process.exit();
		}
	}
}

function executeScript(jsScript) {
	console.log("Executing " + jsScript + " ...\n");

	fs.readFile(jsScript, 'utf8', function (err, data) {
		if (err) {
			console.log(err);
			process.exit();
		} else {
			var script = new vm.Script(data);
			script.runInThisContext();
		}
	});
}

function help(){
	console.log(
		"web3.js based console that connects to an Ethereum node via IPC/WS/HTTP.\n" +
		"Defaults to IPC path: " + ipcpath() + "\n\n" +
		"Usage: ethconsole <connection> <JavaScript file>\n\n" +
		"Arguments:\n" +
		"<connection>	connect to a Websocket (ws://...), HTTP endpoint (http://..), or IPC socket (use ipc://<path> if path does not end with \".ipc\").\n"+
		"		Defaults to the default IPC endpoint for geth.\n"+
		"<JavaScript file>	execute the given JavaScript file non-interactively.\n" +
		"			The script has to call process.exit() in order to terminate the console.\n");
}
