package main

type channel struct {
	name                string
	bufferedConnections map[string]*client
	messagesReceiver    chan<- message
	messagesSender      <-chan message
}

// method that creates new channel
func (server *server) newChannel(name string) {
	channel := channel{
		name:                name,
		bufferedConnections: make(map[string]*client),
		messagesReceiver:    make(chan<- message),
		messagesSender:      make(<-chan message),
	}

	server.channels[name] = &channel
}

// method that makes channel active for a client
func (server *server) activeChannel(client *client, name string) {
	client.activeChannel = server.channels[name]
}
