package handlers

import (
	"net/http"
	"html/template"
)

type Handler interface {
	Handle(w http.ResponseWriter, r *http.Request)
}

type IndexHandler struct {
}

func (h IndexHandler) Handle(w http.ResponseWriter, r *http.Request) {
    t, _ := template.ParseFiles("public/index.html")
    t.Execute(w, nil)
}