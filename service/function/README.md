# init

```shell
docker compose down && \
docker compose run --rm sam-local \
  bash -c "cd /var/function/hello-world && npm install" && \
docker compose up -d && \
docker compose exec sam-local \
  curl -v -d @/var/function/hello-world/test/event.json \
    http://localhost:3001/2015-03-31/functions/HelloWorldFunction/invocations
```