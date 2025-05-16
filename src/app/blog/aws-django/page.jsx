import { blogs } from "@/data/blogs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

export async function generateMetadata() {
  const blog = blogs.find((blog) => blog.id === "aws-django");

  return {
    title: blog.title,
  };
}

export default async function AppServer() {
  const blog = blogs.find((blog) => blog.id === "aws-django");

  return (
    <>
      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          <hr style={{ width: "200px" }} />
          <img src={blog.bannerImg} className="header-img" alt="" />
        </div>
      </div>

      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          <h2 className="about-intro">{blog.title}</h2>
          <p className="post-meta">
            <span className="text-danger">{blog.date}</span>
          </p>
        </div>
      </div>

      <article>
        <div className="row">
          <div className="offset-md-2 col-md-8">
            <p>
              For building simple websites such as this one, you can use static website generators like{" "}
              <a href="https://react.dev/">React</a>, <a href="https://jekyllrb.com/">Jekyll</a>, or{" "}
              <a href="https://gohugo.io/">Hugo</a>. But for building more sophisticated websites with forms, user
              login, and database interaction, you'll need to develop a web app with a backend using one of many
              frameworks, including .NET, Java, Ruby on Rails, and more. Three of the most popular frameworks for
              developing Python web apps are{" "}
              <a target="_blank" href="https://www.djangoproject.com/">
                Django
              </a>
              ,{" "}
              <a target="_blank" href="https://flask.palletsprojects.com/">
                Flask
              </a>
              , and{" "}
              <a target="_blank" href="https://fastapi.tiangolo.com/">
                FastAPI
              </a>
              . The purpose of this post is to walk you through deploying a working Python web app to a production
              server. We'll focus on Django, but the steps are similar for the other Python frameworks. This post
              assumes you have a working Django web app already. If not, you can follow the steps in{" "}
              <a target="_blank" href="https://docs.djangoproject.com/en/5.2/intro/tutorial01/">
                Django's tutorial
              </a>
              .
            </p>
            <p>
              During development, you can test your web app locally using <code>python manage.py runserver</code>, but
              when it's time to deploy your code to a server you'll need to use a different tool for serving the app.
              This is because local tools are optimized for refreshing content quickly during development, not for
              serving multiple users efficiently and reliably. For this blog post, we'll deploy our website using a tool
              called Gunicorn (an app server) to run our Python code, which will communicate with NGINX (a web server)
              to serve pages to our users. Note that Gunicorn will run any kind of WSGI app, which includes Flask,
              Django, and FastAPI, but we'll stick with Django for the examples.
            </p>
            <p>
              Note that tools like AWS's <a href="https://aws.amazon.com/elasticbeanstalk/">Elastic Beanstalk</a> are
              also available for deploying Django projects, but are generally more costly. Instead, for this tutorial
              we'll deploy our app server by hand.
            </p>

            <h4>Part 1: Launching the Web Server</h4>
            <p>
              Let's start by launching the web server. Follow the instructions in{" "}
              <a href="{% post_url 2022-03-02-web-server %}">Launching a Web Server from Scratch</a>. Once you can see
              that NGINX has been successfully installed and is serving a single HTML file at your URL, come back to
              this page.
            </p>

            <h4>Part 2: Launching the App Server</h4>
            <p>
              Inside your Django project, look for a file called <code>wsgi.py</code>&mdash;it should have automatically
              been placed there when you created your Django project for the first time. Note down the name of the
              folder this <code>wsgi.py</code> file is in, e.g. <code>myappname/</code>. Let's install Gunicorn and
              point it to this file to run your app.
            </p>
            <ol>
              <li>Clone your Django project to your newly created web server. Install any dependencies if needed.</li>
              <li>
                Run <code>sudo apt install gunicorn</code>.
              </li>
              <li>
                Run the following:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`sudo su
cd location/of/your/Django/project
gunicorn --workers 4 --bind 0:8000 myappname.wsgi:application`}
                </SyntaxHighlighter>
              </li>
            </ol>

            <p>
              Side note: we've passed a few config options to Gunicorn here. If we don't want to keep passing them to
              Gunicorn every time, we simply point Gunicorn to a config file with these options instead, and run it with{" "}
              <code>gunicorn -c /path/to/config.py</code>. Here's a sample config file with more options for
              convenience:
            </p>

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
daemon = True
# Kill and restart workers silent for more than this many seconds
timeout = 10
# Restart workers after this many requests
max_requests = 1200
# Stagger reloading of workers to avoid restarting at the same time
max_requests_jitter = 90`}
            </SyntaxHighlighter>

            <p>
              Now that Gunicorn is successfully launched and running on port 8000, we simply need to hook it up to NGINX
              so that it can be served at port 443, which is where HTTPS traffic is served. Modify your{" "}
              <code>/etc/nginx/sites-enabled/mywebsite.com</code> file to look like this:
            </p>

            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`server {
    listen 80;
    server_name mywebsitename.com www.mywebsitename.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name mywebsitename.com www.mywebsitename.com;

    location / {
        include proxy_params;
        proxy_pass http://localhost:8000;
    }

    ssl_certificate /etc/letsencrypt/live/mywebsitename.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mywebsitename.com/privkey.pem;
}`}
            </SyntaxHighlighter>
            <h4>Next Steps</h4>
            <p>
              Optionally, you can set up a process manager like <code>supervisor</code> to automatically start gunicorn
              whenever the server boots and automatically restart gunicorn if it ever crashes. Create a file with sudo
              privileges called <code>/etc/supervisor/conf.d/gunicorn.conf</code> and add the following:
            </p>
            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`[program:django_gunicorn]
directory=/home/ubuntu/website/
command=/usr/bin/gunicorn -c /home/ubuntu/.gunicorn/config.py
autostart=true
environment=PROCURESPARK_DEBUG="false"
autorestart=true
stdout_logfile=/var/log/supervisor/django-gunicorn-out.log
stderr_logfile=/var/log/supervisor/django-gunicorn-err.log`}
            </SyntaxHighlighter>
            <p>Now you can start and stop gunicorn via supervisor:</p>
            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`sudo systemctl start supervisor
sudo systemctl stop supervisor
sudo systemctl restart supervisor`}
            </SyntaxHighlighter>
            <p>
              You did it! You now have a web server serving your Django app. This is good enough for a personal project,
              but if you're trying to launch a business that supports hundreds or thousands of users, there's still a
              long road ahead: static storage and databases and load balancing, oh my! Perhaps best saved for another
              blog post. Until then, happy serving!
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
