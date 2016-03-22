/**
Gets the right IPC path

@module getIpcPath
*/

getExtention = function(path, size)
{
   return path.substring(path.length - size, path.length)
}

module.exports = function() {
    var p = require('path');
    var path = process.env.HOME;

    if(process.platform === 'darwin')
        path += '/Library/Ethereum/geth.ipc';

    if(process.platform === 'freebsd' ||
       process.platform === 'linux' ||
       process.platform === 'sunos')
        path += '/.ethereum/geth.ipc';

    if(process.platform === 'win32')
        path = '\\\\.\\pipe\\geth.ipc';

    if (process.argv[2])
    {
       var arg = process.argv[2];
       var res = arg.substring(0, 6);
       if (res == "ipc://")
           path = arg.substring(6, arg.length);
       else
       {
	  if (getExtention(arg, 4) == ".ipc")
	      path = arg;
       }
    }

    if (getExtention(path, 4) != ".ipc")
       path += "geth.ipc"
    
    return path;
};
