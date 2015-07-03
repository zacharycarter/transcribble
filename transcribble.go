package main

import (
	"os"
)

type instrument struct {
	name string
}

type note struct {
	pitch string
	instrument instrument
	beat uint8
}

type staff struct {
	measures uint16
	music map[uint16][]note
}

type transcribble struct {
	timeSignature float32
}

var global struct {
	transcribbleInstance *transcribble
}

func main() {
	initialize(os.Args)
}

func initialize(args []string) {
	// instance := GetTranscribbleInstance()
}

func GetTranscribbleInstance() *transcribble {
	if global.transcribbleInstance == nil {
		global.transcribbleInstance = &transcribble{}
	}
	return global.transcribbleInstance
}