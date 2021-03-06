package main

import (
	"bytes"
	"log"
	"strings"
	"time"

	"github.com/gorilla/websocket"
)

// client struct that holds info about users
type client struct {
	conn          *websocket.Conn
	name          string
	channels      map[string]*channel
	activeChannel *channel
}

// Time allowed to read the next pong message from the peer (standard var from gorilla).
var readWait = 1800 * time.Second

// Time allowed to write a message to the peer (standard var from gorilla).
var writeWait = 1800 * time.Second

// method that creates a client connection instance to server
func (server *server) newClient(conn *websocket.Conn) {
	log.Printf("new client has joined: %v", conn.RemoteAddr().String())

	client := client{
		conn:          conn,
		name:          "Anonymous",
		channels:      make(map[string]*channel),
		activeChannel: server.channels["general"],
	}

	server.channels["general"].bufferedConnections[client.conn.RemoteAddr()] = &client

	go server.readInput(&client)
	go server.receiveSys(&client)

	server.systemChannel <- systemMessage{
		id:       "welcome",
		date:     time.Now(),
		toClient: &client,
		args:     "Welcome, " + client.name + "!" + "\\n\\nYour current channel is " + client.activeChannel.name + ".",
	}
}

// method that reads input from client and sends commands to server
func (server *server) readInput(client *client) {

	// standard functions from the gorilla library to handle hanging connection
	client.conn.SetReadDeadline(time.Now().Add(readWait))
	client.conn.SetPongHandler(func(string) error {
		client.conn.SetReadDeadline(time.Now().Add(readWait))
		return nil
	})

	// standard functions from the gorilla library to handle hanging connection
	client.conn.SetWriteDeadline(time.Now().Add(writeWait))
	client.conn.SetPongHandler(func(string) error {
		client.conn.SetWriteDeadline(time.Now().Add(writeWait))
		return nil
	})

	for {
		_, msg, err := client.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		args := strings.Split(string(bytes.TrimSpace(msg)), " ")
		command := strings.TrimSpace(args[0])

		switch command {
		case "/name":
			client.activeChannel.messagesReceiver <- message{
				id:         "name",
				date:       time.Now(),
				fromClient: client,
				args:       args,
			}
		case "/channel":
			client.activeChannel.messagesReceiver <- message{
				id:         "channel",
				date:       time.Now(),
				fromClient: client,
				args:       args,
			}
		case "/msg":
			client.activeChannel.messagesReceiver <- message{
				id:         "channelReceive",
				date:       time.Now(),
				fromClient: client,
				args:       args,
			}
		case "/quit":
			client.activeChannel.messagesReceiver <- message{
				id:         "quit",
				date:       time.Now(),
				fromClient: client,
				args:       args,
			}
		default:
			server.systemChannel <- systemMessage{
				id:       "error",
				date:     time.Now(),
				toClient: client,
				args:     "Something went wrong delivering your message, please try reconnecting!\n",
			}
		}
	}
}

// listen for messages on systemChannel
func (server *server) receiveSys(client *client) {
	for {
		var sysMsg systemMessage = <-server.systemChannel

		switch sysMsg.id {
		case "error":
			sysMsg.toClient.deliverSys("{\"user\":" + "\"System\", " + "\"time\":" + "\"" + sysMsg.date.String() + "\", " + "\"msg\":" + "\"" + sysMsg.args + "\"}")
		case "welcome":
			sysMsg.toClient.deliverSys("{\"user\":" + "\"System\", " + "\"time\":" + "\"" + sysMsg.date.String() + "\", " + "\"msg\":" + "\"" + sysMsg.args + "\"}")

		case "sys_activeChannel":
			sysMsg.toClient.deliverSys("{\"user\":" + "\"System\", " + "\"time\":" + "\"" + sysMsg.date.String() + "\", " + "\"msg\":" + "\"Your active channel is " + sysMsg.args + "\"}")
		case "sys_changeName":
			sysMsg.toClient.deliverSys("{\"user\":" + "\"System\", " + "\"time\":" + "\"" + sysMsg.date.String() + "\", " + "\"msg\":" + "\"Your name is " + sysMsg.args + "\"}")
		}
	}
}

// write message to client [called on toClient object, others - on fromClient]
func (toClient *client) deliverMsg(msg string, fromClient *client, date time.Time) {
	toClient.conn.WriteMessage(websocket.TextMessage, []byte("{\"user\":"+"\""+fromClient.name+"\", "+"\"time\":"+"\""+date.String()+"\", "+"\"msg\":"+"\""+msg+"\"}"))
}

// write sysMessage to client [called on toClient object, others - on fromClient]
func (toClient *client) deliverSys(msg string) {
	toClient.conn.WriteMessage(websocket.TextMessage, []byte(msg+"\n"))
}
