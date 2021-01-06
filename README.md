# dullspecies.com

The website.

## Dev

Run local server with:

```
make run
```

## Deployment

Currently run as a static site on GCS. Initial setup was done with:

```
gsutil mb -p dullspecies gs://dullspecies.com
gsutil iam ch allUsers:objectViewer gs://dullspecies.com
gsutil web set -m index.html gs://dullspecies.com
```

Update content with:

```
make deploy
```
