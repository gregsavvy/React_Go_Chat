package main

type server struct {
	channels map[string]*channel
	clients  map[string]*client
}

// method that creates server instance
func newServer() *server {

	server := server{
		channels: make(map[string]*channel),
		clients:  make(map[string]*client),
	}

	server.newChannel("general")

	return &server
}

// SERVER COMMANDS BLOCK //

// send message

// create channel

// change channel

// change name
