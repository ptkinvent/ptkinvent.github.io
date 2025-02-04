# Prateek Sahay's Personal Website

Welcome to the source code of my personal website! I developed this website to archive my favorite projects and write
about my thoughts. The initial version in 2011 was written by hand, but I ported it to [Jekyll](https://jekyllrb.com/),
a static website generator, in 2018, and then to [Next.js](https://nextjs.org/) in 2025. The site uses [Twitter's
Bootstrap](https://getbootstrap.com/) for mobile/tablet support.

My website is hosted at [prateeksahay.com](prateeksahay.com), [psahay.com](psahay.com), and [ptkinvent.com](ptkinvent.com).

## Local Development
Make sure you have Git LFS installed:
```
sudo apt install git-lfs
cd website/
git lfs install
```

With Node installed, run:

```sh
npm install
npm run dev
```

## Production Deployment
Make sure you have Git LFS installed:
```
sudo apt install git-lfs
cd website/
git lfs install
```

With Node installed, run:

```sh
npm install
npm run build
npm install -g pm2
pm2 start "npm run start -- -p 8080" --name prateeksahay
```

With nginx installed, add the following nginx config:
```
server {
    listen 80;
    server_name prateeksahay.com www.prateeksahay.com;
    rewrite ^ https://$host$request_uri? permanent;
}

server {
    listen 443 ssl;
    server_name www.prateeksahay.com prateeksahay.com;

    index index.html;
    root /home/ptkinvent/website;

    ssl_certificate /etc/letsencrypt/live/prateeksahay.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/prateeksahay.com/privkey.pem;

    location /_next/static {
        alias /home/ptkinvent/website/.next/static;
        add_header Cache-Control "public, max-age=3600, immutable";
    }

    location / {
        try_files $uri.html $uri/index.html
        @public
        @nextjs;
        add_header Cache-Control "public, max-age=3600";
    }

    location @public {
        add_header Cache-Control "public, max-age=3600";
    }

    location @nextjs {
        # reverse proxy for next server
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name ptkinvent.com www.ptkinvent.com;
    rewrite ^ https://$host$request_uri? permanent;
}

server {
    listen 443 ssl;
    server_name www.ptkinvent.com ptkinvent.com;

    index index.html;
    root /home/ptkinvent/website;

    ssl_certificate /etc/letsencrypt/live/prateeksahay.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/prateeksahay.com/privkey.pem;

    location /_next/static {
        alias /home/ptkinvent/website/.next/static;
        add_header Cache-Control "public, max-age=3600, immutable";
    }

    location / {
        try_files $uri.html $uri/index.html
        @public
        @nextjs;
        add_header Cache-Control "public, max-age=3600";
    }

    location @public {
        add_header Cache-Control "public, max-age=3600";
    }

    location @nextjs {
        # reverse proxy for next server
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name psahay.com www.psahay.com;
    rewrite ^ https://$host$request_uri? permanent;
}

server {
    listen 443 ssl;
    server_name www.psahay.com psahay.com;

    index index.html;
    root /home/ptkinvent/website;

    ssl_certificate /etc/letsencrypt/live/prateeksahay.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/prateeksahay.com/privkey.pem;

    location /_next/static {
        alias /home/ptkinvent/website/.next/static;
        add_header Cache-Control "public, max-age=3600, immutable";
    }

    location / {
        try_files $uri.html $uri/index.html
        @public
        @nextjs;
        add_header Cache-Control "public, max-age=3600";
    }

    location @public {
        add_header Cache-Control "public, max-age=3600";
    }

    location @nextjs {
        # reverse proxy for next server
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## (Optional) Webhooks
https://medium.com/@jgefroh/a-guide-to-using-nginx-for-static-websites-d96a9d034940

 1. Install nginx and python3-certbot-nginx
 2. Clone github.com/ptkinvent/ptkinvent.github.io
 3. Jekyll build
 4. Edit /etc/nginx/sites-available/prateeksahay.com to add 443 conf and custom 404 page
 6. Added webhook:
     a. Installed Go: sudo apt install golang-go
     b. go get github.com/adnanh/webhook
     c. Create a hooks.json which points to a redeploy.sh (search webhooks on Gmail for more info)
 7. Unblocked port 9000 on GCloud Compute instance
 8. Set up commit hook on GitHub
