describe("WebSocket suite", function() {
	
	let server = require('../../index.js');
	let socket1;
	let socket2;

	beforeAll((done)=>{
		var io = require('socket.io-client');
		const socketUrl = "http://localhost:4000"
		socket1 = io.connect(socketUrl, {
            'reconnection delay' : 0
            , 'reopen delay' : 0
            , 'force new connection' : true
        });
        socket1.on('connect', function() {
            console.log('socket1 connected');
            //done();
        });
        socket1.on('disconnect', function() {
            console.log('socket1 disconnected');
		})
		socket1.on('NOTIFICATION', function(message){
			console.log(message)
		})
		socket2 = io.connect(socketUrl, {
            'reconnection delay' : 0
            , 'reopen delay' : 0
            , 'force new connection' : true
        });
        socket2.on('connect', function() {
			console.log('socket2 connected');
			done();
        });
        socket2.on('disconnect', function() {
            console.log('socket2 disconnected');
		})
		socket2.on('NOTIFICATION', function(message){
			console.log(message)
			
		})
	})

	afterAll(function(done) {
        // Cleanup
        if(socket1.connected) {
            console.log('disconnecting socket1');
            socket1.disconnect();
        } else {
            // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
            console.log('no connection to break...');
		}
		// Cleanup
        if(socket2.connected) {
            console.log('disconnecting socket2');
            socket2.disconnect();
        } else {
            // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
            console.log('no connection to break...');
        }
        done();
    });

	it('Sockets should create new users', ()=>{
		socket1.emit('USER_CONNECTED', {name: 'Username1', id: 1})
		socket2.emit('USER_CONNECTED', {name: 'Username2', id: 2})
	})

	it('Should send a message from server', ()=>{
		server.io.emit('echo', 'Hello World')
		socket1.on('echo', (message)=>{
			// console.log(message)
			expect(message).toBe('Hello World')
		})
		socket2.on('echo', (message)=>{
			// console.log(message)
			expect(message).toBe('Hello World')
		})
	})

	it('Should send a message from socket1 to socket2', ()=>{
		socket1.emit('echo', 'Hello World', socket2.id)

		socket2.on('echo', (message)=>{
			expect(message).toBe('Hello World')
		})

	})

});