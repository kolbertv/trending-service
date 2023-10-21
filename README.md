# trending-service

Билдить проект
`docker compose build`

Запускать проект
`docker compose up`

Запросы:

Авторизация и сохранение токена в редис
```
curl --request POST \
  --url http://localhost:3000/auth \
  --header 'Content-Type: application/json' \
  --data '{
	"PHPSESSID": "some token"
}'

```

Запрос баланса

```
curl --request GET \
  --url http://localhost:3000/balance
```

Порт, урл настраиваются в `.env` файле.

Код писался без eslint, использовался стандартный форматер VS Code, не более. 
