**Conventional Deployment**

1. run `git clone https://github.com/attanza/lj-dashboard-v2.git`
2. cd into repo
3. run `touch .env`
4. run `sudo vi .env`
5. paste the .env content
6. run `npm i`
7. run `npm run build`
8. run `pm2 start npm ecosystem.config.js --name dashboard -- start`

**Docker Deployment**

1. run `git clone https://github.com/attanza/lj-dashboard-v2.git`
2. cd into repo
3. run `touch .env`
4. run `sudo vi .env`
5. paste the .env content
6. run `docker-compose up -d --build`
