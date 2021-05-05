package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// .Upgrade to upgrade http connection to a websocket connection
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func main() {
	// Declare port
	port := ":8080"

	// New server object to store info about server
	server := newServer()

	// Default handler for a new connection to server that upgrades to websocket
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)

		if err != nil {
			log.Println(err)
			return
		}

		server.newClient(conn)
	})

	// Start listening
	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
