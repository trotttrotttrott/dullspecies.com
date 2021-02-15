run:
	go run main.go

deploy:
	set -e
	curl localhost:3000/root.html?deploy=true > index.html
	gsutil cp index.html gs://dullspecies.com/
	gsutil rsync -r static gs://dullspecies.com/static
	rm index.html
