package main

import (
	"net"
	"time"
)

type server struct {
	channels      map[string]*channel
	systemChannel chan systemMessage
}

// method that creates server instance
func newServer() *server {
	server := server{
		channels:      make(map[string]*channel),
		systemChannel: make(chan systemMessage),
	}

	server.newChannel("general")

	return &server
}

// SERVER COMMANDS BLOCK //

// send message
func (server *server) handleMessage(client *client, args []string) {
	client.activeChannel.messagesSender <- message{
		id:         "public",
		date:       time.Now(),
		fromClient: client,
		args:       args,
	}
}

// private message
func (server *server) privateMessage(client *client, args []string) {
	client.activeChannel.messagesSender <- message{
		id:         "private",
		date:       time.Now(),
		fromClient: client,
		args:       args,
	}
}

// create new channel
func (server *server) newChannel(name string) {
	channel := channel{
		name:                name,
		bufferedConnections: make(map[net.Addr]*client),
		messagesReceiver:    make(chan message),
		messagesSender:      make(chan message),
	}

	server.channels[name] = &channel

	// start listening for channel messages
	go server.receiveMessages(&channel)
	go server.sendMessages(&channel)
}

// change active channel for a client
func (server *server) activeChannel(client *client, name_ string) {

	delete(server.channels[client.activeChannel.name].bufferedConnections, client.conn.RemoteAddr())
	client.channels[client.activeChannel.name] = client.activeChannel

	client.activeChannel = server.channels[name_]
	server.channels[name_].bufferedConnections[client.conn.RemoteAddr()] = client

	server.systemChannel <- systemMessage{
		id:       "sys_activeChannel",
		date:     time.Now(),
		toClient: client,
		args:     name_,
	}
}

// change name
func (server *server) changeName(client *client, name string) {
	client.name = name

	server.systemChannel <- systemMessage{
		id:       "sys_changeName",
		date:     time.Now(),
		toClient: client,
		args:     name,
	}
}

// quit server
func (server *server) quitServer(client *client) {
	delete(server.channels[client.activeChannel.name].bufferedConnections, client.conn.RemoteAddr())

	client.conn.Close()
}
