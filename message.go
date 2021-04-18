package main

import "time"

// struct for user messages to server
type message struct {
	id         string
	date       time.Time
	fromClient *client
	args       []string
}

// struct for system messages to users
type systemMessage struct {
	id       string
	date     time.Time
	toClient *client
	args     string
}
