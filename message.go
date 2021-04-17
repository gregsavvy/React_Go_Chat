package main

import "time"

type message struct {
	id     string
	date   time.Time
	client *client
	args   []string
}
