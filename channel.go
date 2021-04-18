package main

import (
	"net"
	"strings"
	"time"
)

type channel struct {
	name                string
	bufferedConnections map[net.Addr]*client
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

// listen for messages to deliver on messagesSender
func (server *server) sendMessages(channel *channel) {
	for {
		var msg message = <-channel.messagesSender
		switch msg.id {
		case "public":
			//function for public broadcasting
			clearMsg := strings.Join(msg.args[1:], "")
			msg.fromClient.broadcast(clearMsg)

		case "private":
			//function for private broadcasting
			for _, member := range msg.fromClient.activeChannel.bufferedConnections {
				if member.name == msg.args[1] {
					toClient := member
					clearMsg := strings.Join(msg.args[2:], "")
					toClient.deliverMsg(clearMsg)
				} else {
					server.systemChannel <- systemMessage{
						id:       "error",
						date:     time.Now(),
						toClient: msg.fromClient,
						args:     "Something went wrong delivering your message",
					}
				}
			}

		default:
			server.systemChannel <- systemMessage{
				id:       "error",
				date:     time.Now(),
				toClient: msg.fromClient,
				args:     "Something went wrong delivering your message",
			}
		}
	}
}

// write message to client [the only method that is called on toClient, others - fromClient]
func (toClient *client) deliverMsg(msg string) {
	toClient.conn.Write([]byte("> " + toClient.name + ": " + msg + "\n"))
}

// write message to channel
func (client *client) broadcast(msg string) {
	for addr, member := range client.activeChannel.bufferedConnections {
		if client.conn.RemoteAddr() != addr {
			member.deliverMsg(msg)
		}
	}
}
