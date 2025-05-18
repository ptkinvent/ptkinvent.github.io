import { blogs } from "@/data/blogs";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ResponsiveHeading from "@/components/responsive-heading";
import ResponsiveCaption from "@/components/responsive-caption";

export async function generateMetadata() {
  const blog = blogs.find((blog) => blog.slug === "aws-django");

  return {
    title: blog.title,
  };
}

export default function AwsDjango() {
  return (
    <>
      <article className="container">
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              For building simple websites with static content such as a blog, a static website generator like{" "}
              <a href="https://react.dev/">React</a>, <a href="https://jekyllrb.com/">Jekyll</a>, or{" "}
              <a href="https://gohugo.io/">Hugo</a> will suffice. But for building more complex websites with forms,
              user login, and database interaction, you'll need to develop a full web app with a backend using one of
              many frameworks, such as .NET, Java, Ruby on Rails, and more. The purpose of this post is to walk you
              through deploying a working Python web app to a production server. We'll focus on{" "}
              <a target="_blank" href="https://www.djangoproject.com/">
                Django
              </a>
              , but the steps are similar for the other Python frameworks, such as{" "}
              <a target="_blank" href="https://flask.palletsprojects.com/">
                Flask
              </a>{" "}
              and{" "}
              <a target="_blank" href="https://fastapi.tiangolo.com/">
                FastAPI
              </a>
              .
            </p>
            <p>
              This blog post is part of a series of posts about how to deploy a Django app to AWS. If you haven't
              created your EC2 instance yet, follow the instructions in{" "}
              <Link href="/blog/aws-ec2">Serving a Static Website from EC2</Link>. This post also assumes you have a
              working Django web app already. If not, follow the steps in the{" "}
              <a target="_blank" href="https://docs.djangoproject.com/en/5.2/intro/tutorial01/">
                Django tutorial
              </a>
              , then come back to this page .
            </p>
            <p>
              During development, you can test your web app locally using <code>python manage.py runserver</code>, but
              when it's time to deploy your code to a server you'll need to use a different tool for serving the app to
              your users. This is because tools like <code>runserver</code> are optimized for refreshing content quickly
              during development, not for serving multiple users efficiently and reliably. For this blog post, we'll
              deploy our website using a tool called{" "}
              <a target="_blank" href="https://gunicorn.org/">
                Gunicorn
              </a>{" "}
              (an app server) to run our Python code, which will communicate with NGINX (our web server we set up
              previously) to serve pages to our users. Note that Gunicorn will run any kind of WSGI app, which includes
              Flask, Django, and FastAPI, but we'll stick with Django for the examples. There are other tools like{" "}
              <a target="_blank" href="https://uwsgi-docs.readthedocs.io/en/latest/">
                uwsgi
              </a>
              ,{" "}
              <a target="_blank" href="https://github.com/django/daphne">
                Daphne
              </a>
              , and{" "}
              <a target="_blank" href="https://www.uvicorn.org/">
                uvicorn
              </a>{" "}
              that can also be used to serve Django apps, but we'll stick with Gunicorn for the examples.
            </p>
            <p>
              Note that tools like{" "}
              <a target="_blank" href="https://aws.amazon.com/elasticbeanstalk/">
                AWS Elastic Beanstalk
              </a>{" "}
              and{" "}
              <a target="_blank" href="https://www.heroku.com/">
                Heroku
              </a>{" "}
              would make it much more straightforward to deploy our Django project, but tend to cost more and hide a lot
              of implementation details. Instead, for this tutorial we'll explore deploying our app server by hand for
              the purposes of understanding all the pieces.
            </p>
          </div>
        </div>

        {/* Install Gunicorn */}
        <ResponsiveHeading numbering="01">Install Gunicorn</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Inside your Django project, look for a file called <code>wsgi.py</code>&mdash;it should have automatically
              been placed there when you created your Django project for the first time. Note down the name of the
              folder this <code>wsgi.py</code> file is in, e.g. <code>myappname/</code>. Let's install Gunicorn and
              point it to this file to run your app.
            </p>
            <ol>
              <li>
                Clone your Django project to your EC2 machine. Install any dependencies if needed with{" "}
                <code>pip install -r requirements.txt</code>.
              </li>
              <li>
                On your EC2 machine, run <code>sudo apt install gunicorn</code>.
              </li>
              <li>
                Run the following:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`sudo su
cd location/of/your/django/project
gunicorn --workers 4 --bind 0:8000 myappname.wsgi:application`}
                </SyntaxHighlighter>
              </li>
            </ol>

            <p>
              Side note: we've passed a few config options to Gunicorn here. If we don't want to keep passing them to
              Gunicorn every time, we simply point Gunicorn to a config file containing these options instead, and run
              it with <code>gunicorn -c /path/to/config.py</code>. Here's a sample config file you can store at{" "}
              <code>~/.gunicorn/config.py</code> with some commonly-used options for convenience:
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="~/.gunicorn/config.py">
          <SyntaxHighlighter language="python" style={monokaiSublime}>
            {`"""Gunicorn config file"""

# Django WSGI application path in pattern MODULE_NAME:VARIABLE_NAME
wsgi_app = "myappname.wsgi:application"
# The granularity of Error log outputs
loglevel = "debug"
# The number of worker processes for handling requests
workers = 4
# The socket to bind
bind = "0.0.0.0:8000"
# Restart workers when code changes (development only!)
reload = False
# Write access and error info to /var/log
accesslog = errorlog = "/var/log/gunicorn/gunicorn.log"
# Redirect stdout/stderr to log file
capture_output = True
# Daemonize the Gunicorn process (detach & enter background)
daemon = False
# Kill and restart workers silent for more than this many seconds
timeout = 10
# Restart workers after this many requests
max_requests = 1200
# Stagger reloading of workers to avoid restarting at the same time
max_requests_jitter = 90`}
          </SyntaxHighlighter>
        </ResponsiveCaption>

        {/* Configure NGINX */}
        <ResponsiveHeading numbering="02">Configure NGINX</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Now that Gunicorn is successfully launched and running on port 8000, we simply need to hook it up to NGINX
              so that it can be served at port 443, which is where HTTPS traffic is served. Modify your{" "}
              <code>/etc/nginx/sites-available/example.com</code> file to look like this:
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="/etc/nginx/sites-available/example.com">
          <SyntaxHighlighter language="sh" style={monokaiSublime}>
            {`server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name example.com www.example.com;

    location / {
        include proxy_params;
        proxy_pass http://localhost:8000;
        client_max_body_size 100m;
        proxy_read_timeout 3600s;
    }

    location /staticfiles/ {
        alias /path/to/your/django/project/staticfiles/;
        autoindex off;
    }

    location /mediafiles/ {
        alias /path/to/your/django/project/mediafiles/;
        autoindex off;
    }

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
}`}
          </SyntaxHighlighter>
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>Finally, reload NGINX to apply the changes:</p>
            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`sudo nginx -s reload # alternatively use: sudo systemctl restart nginx`}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Supervisor */}
        <ResponsiveHeading numbering="03">Supervisor</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              We might want to set up a process manager like <code>supervisor</code> to automatically start gunicorn
              whenever the server boots and automatically restart gunicorn if it ever crashes. Install supervisor with
              <code>sudo apt install supervisor</code>. Create a file with sudo privileges called{" "}
              <code>/etc/supervisor/conf.d/gunicorn.conf</code> and add the following:
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="/etc/supervisor/conf.d/gunicorn.conf">
          <SyntaxHighlighter language="sh" style={monokaiSublime}>
            {`[program:django_gunicorn]
directory=/home/ubuntu/website/
command=/usr/bin/gunicorn -c /home/ubuntu/.gunicorn/config.py
autostart=true
environment=DEBUG="false"
autorestart=true
stdout_logfile=/var/log/supervisor/django-gunicorn-out.log
stderr_logfile=/var/log/supervisor/django-gunicorn-err.log`}
          </SyntaxHighlighter>
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Note that whenever you want to deploy new changes to your project, you'll have to restart gunicorn via
              supervisor:
            </p>
            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`sudo systemctl restart supervisor`}
            </SyntaxHighlighter>
          </div>
        </div>

        <ResponsiveHeading numbering="04">Next Steps</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              You did it! You now have an EC2 machine serving your Django app to your users. This is good enough for a
              personal project, but if you want to launch a web app that supports hundreds or thousands of users,
              there's still a long road ahead: static storage and databases and load balancing, oh my! Perhaps best
              saved for another blog post. Until then, happy serving!
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
