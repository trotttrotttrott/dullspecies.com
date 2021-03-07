package main

import (
	"context"
	"html/template"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

// whether to output static site files and exit instead of waiting for external requests.
var buildSite = os.Getenv("BUILD_SITE") == "true"

func main() {
	srv := &http.Server{Addr: ":3000"}
	if buildSite {
		build(srv)
	} else {
		listen(srv)
	}
}

// build outputs static site files.
func build(srv *http.Server) {
	go listen(srv)
	resp, err := http.Get("http://localhost:3000/root.html")
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	err = ioutil.WriteFile("index.html", body, 0644)
	srv.Shutdown(context.Background())
}

// listen waits for requests.
func listen(srv *http.Server) {
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.HandleFunc("/", serve)
	srv.ListenAndServe()
}

// serve serves site content.
func serve(w http.ResponseWriter, r *http.Request) {
	lp := filepath.Join("templates", "layout.html")
	fp := filepath.Join("templates", filepath.Clean(r.URL.Path))

	// Return a 404 if the template doesn't exist
	info, err := os.Stat(fp)
	if err != nil {
		if os.IsNotExist(err) {
			http.NotFound(w, r)
			return
		}
	}

	// Return a 404 if the request is for a directory
	if info.IsDir() {
		http.NotFound(w, r)
		return
	}

	tmpl, err := template.ParseFiles(lp, fp)
	if err != nil {
		// Log the detailed error
		log.Println(err.Error())
		// Return a generic "Internal Server Error" message
		http.Error(w, http.StatusText(500), 500)
		return
	}

	iface := struct {
		Build   bool
		BuildID int64
	}{
		buildSite,
		time.Now().Unix(),
	}

	if err := tmpl.ExecuteTemplate(w, "layout", iface); err != nil {
		log.Println(err.Error())
		http.Error(w, http.StatusText(500), 500)
	}
}
