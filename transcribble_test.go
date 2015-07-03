package main

import "testing"

func TestGetTranscribbleInstance(t *testing.T) {
	instance1 := GetTranscribbleInstance()
	instance2 := GetTranscribbleInstance()

	if instance1 != instance2 {
		t.Errorf("Failed due to instance inequality.\n")
	}
}