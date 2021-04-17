package main

import (
	"bufio"
	"log"
	"net"
	"strings"
	"time"
)

type client struct {
	conn          net.Conn
	name          string
	channels      map[string]*channel
	activeChannel *channel
}

// method that creates a client connection instance to server
func (server *server) newClient(conn net.Conn) {
	log.Printf("new client has joined: %v", conn.RemoteAddr().String())

	client := client{
		conn:          conn,
		name:          "anonymous",
		channels:      make(map[string]*channel),
		activeChannel: server.channels["general"],
	}

	server.clients[conn.RemoteAddr().String()] = &client

	client.readInput()
}

// method that ends a client connection instance to server
func (server *server) quitServer(client *client) {
	client.conn.Close()
}

// method that reads input from client
func (client *client) readInput() {
	scanner := bufio.NewScanner(client.conn)
	for scanner.Scan() {

		args := strings.Split(scanner.Text(), " ")
		command := strings.TrimSpace(args[0])

		switch command {
		case "/name":
			client.activeChannel.messagesReceiver <- message{
				id:     "name",
				date:   time.Now(),
				client: client,
				args:   args,
			}
		case "/channel":
			client.activeChannel.messagesReceiver <- message{
				id:     "channel",
				date:   time.Now(),
				client: client,
				args:   args,
			}
		case "/msg":
			client.activeChannel.messagesReceiver <- message{
				id:     "send",
				date:   time.Now(),
				client: client,
				args:   args,
			}
		case "/quit":
			client.activeChannel.messagesReceiver <- message{
				id:     "quit",
				date:   time.Now(),
				client: client,
				args:   args,
			}
		default:
			client.activeChannel.messagesReceiver <- message{
				id:     "error",
				date:   time.Now(),
				client: client,
			}
		}
	}
}
