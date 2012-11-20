var io = require('socket.io').listen(8080),
	proc = require('child_process'),
	servers = require('./servers'),
	server = null,
	mc_server = null;

io.sockets.on('connection', function(socket) {

	socket.on('get_server_list', function(){
		socket.emit('server_list', servers);
	});

	socket.on('get_status', function(){
		socket.emit('status', server);
	});

	// When the client says to start a server...
	socket.on('start_server', function(name) {
		// If a server is already running or server doesn't exist
		if (mc_server || !servers[name]) {
			// Let the user know that it failed.
			socket.emit('fail', 'start_server');
			// Stop execution of this callback
			return;
		}
		
		// Set which server is currently running
		server = name;

		// Start the Minecraft Server
		mc_server = proc.spawn(
			// Uses Java to run the server from a command line child process. The command prompt will not be visible.
			"java",
			['-Xms1024M', '-Xmx1024M', '-jar', 'minecraft_server.jar', 'nogui'],
			// CWD should contain the folder that contains all of your servers. The _ is just there because I prefix all of my server folders with _
			// Also not the \ to escape spaces. This is necessary (at least on Windows)
			{ cwd: "C:/Program\ Files\ (x86)/Minecraft/_" + servers[server] }
		);

		io.sockets.emit('status', server);

		mc_server.stdout.on('data', function (data) {
			if (data) {
				io.sockets.emit('console', ""+data);
			}
		});

		mc_server.stderr.on('data', function (data) {
			if (data) {
				io.sockets.emit('console', ""+data);
			}
		});

		mc_server.on('exit', function () {
			mc_server = server = null;
			io.sockets.emit('status', null);
		});

	}); // End .on('start_server')

	socket.on('command', function(cmd) {
		if (mc_server) {
			io.sockets.emit('console', "Player Command: " + cmd);
			mc_server.stdin.write(cmd + "\r");
		} else {
			socket.emit('fail', cmd);
		}
	});
});


// Allows me to type commands into the Console Window to control the MC Server
process.stdin.resume();
process.stdin.on('data', function (data) {
	if (mc_server) {
		mc_server.stdin.write(data);
	}
});