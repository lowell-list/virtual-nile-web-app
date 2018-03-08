## Virtual Nile Web App

###Test Deployment

1) In package.json, temporarily change

```
"homepage": "http://nile.babasmg.com/webapp",
```
to
```
"homepage": "http://nile.babasmg.com/webapp-test",
```

2) run
```
$ npm run build
$ ./deploy_test.sh
```

###Production Deployment

1) run

```
$ npm run build
$ ./deploy_production.sh
```
