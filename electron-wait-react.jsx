const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000 ; 

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;

const tryConnect = ()=> client.connect({port: port },
	()=>{
		client.end();
		if(!startedElectron){
			console.log('starting electron');
			startedElectron = true ; 
			const exec = require('child_process').exec;
			exec('npm run electron');
		}
	}
);

tryConnect();

client.on('error', error => setTimeout(tryConnect,1000));