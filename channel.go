package main

import "time"

type channel struct {
	name                string
	bufferedConnections map[string]*client
	messagesReceiver    chan message
	messagesSender      chan message
}

// listen for messages on messagesReceiver
func (server *server) receiveMessages(channel *channel) {
	for {
		var msg message = <-channel.messagesReceiver

		switch msg.id {
		case "name":
			name := msg.args[1]
			server.changeName(msg.fromClient, name)

		case "channel":
			name := msg.args[1]
			if _, ok := server.channels[name]; !ok {
				server.newChannel(name)
				server.activeChannel(msg.fromClient, name)
			} else if ok {
				server.activeChannel(msg.fromClient, name)
			}

		case "channelReceive":
			server.handleMessage(msg.fromClient, msg.args)

		case "privateReceive":
			server.privateMessage(msg.fromClient, msg.args)

		case "quit":
			server.quitServer(msg.fromClient)

		default:
			server.systemChannel <- systemMessage{
				id:       "error",
				date:     time.Now(),
				toClient: msg.fromClient,
				args:     "Unknown command",
			}
		}
	}
}

// broadcast messages from messageSender on channel
func (server *server) sendMessages(channel *channel) {
	for {
		var msg message = <-channel.messagesSender
		switch msg.id {
		case "public":
			//function for channel broadcasting
		case "private":
			//function for private broadcasting
		}

	}
}
