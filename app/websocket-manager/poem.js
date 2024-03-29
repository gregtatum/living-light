function _addClient( clients, client ) {
	clients.push( client )
}

function _removeClient( clients, clientToRemove ) {
	
	var index = clients.indexOf( clientToRemove )
	
	if( index >= 0 ) {
		clients.splice(index, 1)
	}
}

function _removeClientBySocket( clients, socket ) {
	
	var client = _.find( clients, client => (client.socket === socket) )
	
	if( client ) {
		client.destroy()
		var index = clients.indexOf( client )
		
		if( index > 0 ) {
			clients.splice(index, 1)
		}
	}
}

function _disconnect( clients, socket ) {
	
	clients.forEach(function( client ) {
		client.socket.emit('removePoem')
		client.destroy()
	})
	
	// socket.close()
}

function _emitToClients( clients, commandName, data ) {
	
	clients.forEach( clients, function( client ) {
		client.socket.emit(commandName, data)
	})
}

module.exports = function createPoem( socket ) {
	
	var clients = []
	
	return {
		socket        : socket,
		code          : null,
		addClient     : _addClient     .bind( null, clients ),
		removeClient  : _removeClient  .bind( null, clients ),
		disconnect    : _disconnect    .bind( null, clients ),
		emitToClients : _emitToClients .bind( null, clients ),
		countClients  : function() { return clients.length },
	}
}