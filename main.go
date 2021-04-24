package main

import (
	"log"
	"net"
)

func main() {
	// Declare port
	port := ":8080"

	listener, err := net.Listen("tcp6", port)

	if err != nil {
		log.Fatalf("error starting server: %s", err.Error())
	}

	log.Printf("server started on port %s", port)

	server := newServer()

	for {
		connection, err := listener.Accept()
		if err != nil {
			log.Printf("error while connecting: %s", err.Error())
			continue
		}

		server.newClient(connection)

	}
}
