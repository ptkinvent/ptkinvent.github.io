import { blogs } from "@/data/blogs";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ResponsiveHeading from "@/components/responsive-heading";
import ResponsiveCaption from "@/components/responsive-caption";

export async function generateMetadata() {
  const blog = blogs.find((blog) => blog.slug === "aws-alb");

  return {
    title: blog.title,
  };
}

export default function AwsAlb() {
  return (
    <>
      <article className="container">
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              This blog post is part of a series about how to deploy a Django app to AWS. If you haven't deployed your
              app to EC2 and RDS yet, I recommend reading the{" "}
              <Link href="/blog/aws-ec2">
                <span className="fw-bold">AWS EC2</span>
              </Link>{" "}
              and{" "}
              <Link href="/blog/aws-rds">
                <span className="fw-bold">AWS RDS</span>
              </Link>{" "}
              posts first.
            </p>
            <p>
              So your website's getting so much traffic that you're ready to scale your web app to multiple servers?
              Great! In this post, we'll walk through how to prepare our single EC2 server for scalability, create a
              template from it to spin up more instances, and create an AWS Application Load Balancer (ALB) to
              distribute traffic amongst them. Let's get started!
            </p>
          </div>
        </div>

        {/* Move logging to AWS CloudWatch */}
        <ResponsiveHeading numbering="01">Move Logging to AWS CloudWatch</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              At the moment, our EC2 instance logs to its own hard drive. This won't scale because each server will have
              its own logs, and we'll have a hard time aggregating them to find bugs or anomalies. Instead, we'll stream
              our logs to AWS CloudWatch so they're stored in a centralized location.
            </p>
            <p>First, let's grant permissions to our EC2 machine to stream logs to CloudWatch:</p>
            <ol>
              <li>
                If you don't already have an IAM role for your EC2 machines, create a new role for sending metrics to
                CloudWatch called <code>web-server</code>. Give your new (or existing) role the permission called{" "}
                <code>CloudWatchAgentServerPolicy</code>.
              </li>
              <li>
                Attach the role to our EC2 instance if you haven't already. Go to EC2 &gt; Click on the instance &gt;{" "}
                Actions &gt; Security &gt; Modify IAM role &gt; Attach the new role.
              </li>
            </ol>

            <p>Next, let's install and configure CloudWatch Agent on our EC2 machine to stream logs to CloudWatch.</p>
            <ol start="3">
              <li>SSH into your EC2 machine.</li>
              <li>
                Run the following commands to launch the CloudWatch Agent configuration wizard:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`sudo apt install collectd amazon-cloudwatch-agent
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard`}
                </SyntaxHighlighter>
              </li>
              <li>
                Say <b>yes</b> to all defaults except "Do you want to store the config in the SSM parameter store?" and
                "Do you want the CloudWatch agent to also retrieve X-ray traces?"
              </li>
              <li>
                Also say <b>yes</b> to "Do you want to monitor any log files?" and add our log files, which should look
                something like these:
                <ul>
                  <li>
                    <code>/home/ubuntu/my-public-repo/myapp/myapp.log</code>
                  </li>
                  <li>
                    <code>/var/log/nginx/access.log</code>
                  </li>
                  <li>
                    <code>/var/log/nginx/error.log</code>
                  </li>
                  <li>
                    <code>/var/log/gunicorn/gunicorn.log</code>
                  </li>
                  <li>
                    <code>/var/log/gunicorn/gunicorn-err.log</code>
                  </li>
                </ul>
                <strong>Note:</strong> For retention policy, <code>-1</code> means "never delete." <br />
              </li>
            </ol>
            <p>
              The wizard will generate a configuration file that is stored at{" "}
              <code>/opt/aws/amazon-cloudwatch-agent/bin/config.json</code>. Note that our configuration is also saved
              to{" "}
              <a target="_blank" href="https://console.aws.amazon.com/systems-manager/" className="fw-bold">
                AWS Systems Manager
              </a>{" "}
              &gt; Parameter Store for us. When we launch the CloudWatch Agent, we can choose to launch it with a local
              JSON file or by grabbing a config from the parameter store. Grabbing from the parameter store is
              considered best practice, but for the simplicity of this tutorial we're using the local file. If we ever
              did want to fetch a config from the parameter store, we would use{" "}
              <code>-c ssm:&lt;parameterName&gt;</code> below instead.
            </p>
            <ol start="7">
              <li>
                Finally, start the CloudWatch agent using:{" "}
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json -s`}
                </SyntaxHighlighter>
              </li>
            </ol>
            <p>
              Great! Our CloudWatch Agent is now streaming our web server's logs to CloudWatch. We can check the status
              of the CloudWatch Agent on any of our EC2 machines at any time using:{" "}
              <code>amazon-cloudwatch-agent-ctl -a status</code>. If we navigate to{" "}
              <a target="_blank" href="https://console.aws.amazon.com/cloudwatch" className="fw-bold">
                AWS CloudWatch
              </a>{" "}
              &gt; Log groups we should be able to see our logs streaming in. We now have a scalable way to monitor our
              web servers' usage.
            </p>
          </div>
        </div>

        {/* Move secrets to AWS Secrets Manager */}
        <ResponsiveHeading numbering="02">Move Secrets to AWS Secrets Manager</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Currently, our secrets (such as database password, API keys, etc.) might be stored as environment
              variables on our EC2 machine. This also won't scale, since creating, modifying, or deleting these secrets
              can get messy, especially as we increase the number of servers. More importantly, this also isn't a secure
              way to store secrets. Instead, we'll use{" "}
              <a target="_blank" href="https://aws.amazon.com/secrets-manager/" className="fw-bold">
                AWS Secrets Manager
              </a>{" "}
              to store them in a centralized location where it's easier to manage access.
            </p>
            <p>First, let's grant our EC2 machine access to Secrets Manager:</p>
            <ol>
              <li>
                Navigate to{" "}
                <a className="fw-bold" target="_blank" href="https://console.aws.amazon.com/iam/">
                  AWS IAM console
                </a>{" "}
                and select <b>Roles</b>.
              </li>
              <li>
                If you don't already have an IAM role for your EC2 machines, create a new role for access to Secrets
                Manager called <code>web-server</code>. Give your new (or existing) role the permission called{" "}
                <code>SecretsManagerReadWrite</code>.
              </li>
              <li>
                Attach the role to the EC2 instance if you haven't already. Go to EC2 &gt; Click on the instance &gt;{" "}
                Actions &gt; Security &gt; Modify IAM role &gt; Attach the new role.
              </li>
            </ol>

            <p>
              Now, let's create a test secret in Secrets Manager so we can try reading it from Django on our EC2
              machine:
            </p>
            <ol start="4">
              <li>
                Navigate to{" "}
                <a className="fw-bold" target="_blank" href="https://console.aws.amazon.com/secretsmanager/">
                  AWS Secrets console
                </a>{" "}
                and select <b>Store a new secret</b>.
              </li>
              <li>
                Select <b>Other type of secret</b>.
              </li>
              <li>
                Give it a key, such as <b>MYSECRET</b> and a value, such as <b>MYVALUE</b>, then select <b>Next</b>.
              </li>
              <li>
                Give it a readable name, such as <b>my-secret</b>, then select <b>Next</b>.
              </li>
              <li>
                On the final page, we are shown some sample code for accessing our new secret. Select <b>Next</b>.
              </li>
            </ol>

            <p>
              Now that our secret is created, let's access it from Django. Keep in mind that good practice mandates
              using different secrets for development vs production&mdash;e.g. different API keys or database passwords.
              With that in mind, modify <code>settings.py</code> to look like the following:
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="settings.py">
          <SyntaxHighlighter language="py" style={monokaiSublime}>
            {`...
if DEBUG:
  MYSECRET = os.environ['MYSECRET]
else:
  session = boto3.session.Session()
  client = session.client(
      service_name='secretsmanager',
      region_name='us-west-1'
  )
  response = client.get_secret_value(SecretId='my-secret')
  secrets = json.loads(response['SecretString'])
  MYSECRET = secrets['MYSECRET']
...`}
          </SyntaxHighlighter>
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Great! Now we have access to our secrets in <code>settings.py</code> in a scalable way.
            </p>
          </div>
        </div>

        {/* Create an EC2 Launch Template */}
        <ResponsiveHeading numbering="03">Create an EC2 Launch Template</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Great! Now that our EC2 machine is ready for scaling, let's create a template so that we can quickly
              launch more EC2 instances without having to painstakingly set each one up manually. There are various
              strategies for creating a template, such as creating a new Amazon Machine Image (AMI), which is a snapshot
              of our EC2 machine, or a launch template. For this tutorial, we'll use the simplest strategy: creating a
              launch template.
            </p>
            <p>
              Launch templates allow us to quickly launch new EC2 instances with one click containing our latest code
              and other configuration files.
            </p>
            <ol>
              <li>
                Navigate to the{" "}
                <a className="fw-bold" target="_blank" href="https://console.aws.amazon.com/ec2/">
                  AWS EC2 console
                </a>
                .
              </li>
              <li>
                Navigate to <b>Launch templates</b> &gt; <b>Create launch template</b>.
              </li>
              <li>
                Give it a name such as <b>web-server-template</b>.
              </li>
              <li>
                You might notice a checkbox called{" "}
                <b>Provide guidance to help me set up a template that I can use with EC2 Auto-scaling</b>. Leave this
                unchecked for now and we'll come back to it later.
              </li>
              <li>
                Choose an instance type, such as <code>t2.micro</code> for the cheapest option or <code>m6i.large</code>{" "}
                for a more powerful option.
              </li>
              <li>Choose the key pair you typically use for your EC2 machine.</li>
              <li>Choose the security group you used for your EC2 machine.</li>
              <li>Choose the subnet you typically use for your EC2 machine.</li>
              <li>Add a storage volume of at least 10GB (or more depending on the size of your web app).</li>
              <li>
                Finally, in <b>Advanced details</b> &gt; <b>IAM instance profile</b>, select the role you created for
                your EC2 machine.
              </li>
              <li>
                In <b>Advanced details</b> &gt; <b>User data</b>, add the following script to install and configure our
                web app:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`#!/bin/bash
cd /home/ubuntu
sudo apt update
sudo apt -y upgrade
sudo apt install -y collectd nginx gunicorn supervisor python3-pip postgresql-client-common postgresql-client-14

# code
cd /home/ubuntu
git clone https://github.com/your-username/your-public-repo.git
cd your-public-repo
pip install -r requirements.txt

# nginx
cd /etc/nginx/sites-available/
cat <<- EOF | sudo tee example.com
server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        include proxy_params;
        proxy_pass http://localhost:8000;
        client_max_body_size 100m;
        proxy_read_timeout 3600s;
    }
}
EOF
cd /etc/nginx/sites-enabled/
sudo rm default
sudo ln -s /etc/nginx/sites-available/example.com example.com
sudo nginx -s reload

# gunicorn
cd /home/ubuntu
mkdir .gunicorn
cat <<- EOF > /home/ubuntu/.gunicorn/config.py
	"""Gunicorn config file"""

	# Django WSGI application path in pattern MODULE_NAME:VARIABLE_NAME
	wsgi_app = "example.wsgi:application"
	# The granularity of Error log outputs
	loglevel = "debug"
	# The number of worker processes for handling requests
	workers = 4
	# The socket to bind
	bind = "0.0.0.0:8000"
	# Restart workers when code changes (development only!)
	#reload = True
	# Write access and error info to /var/log
	accesslog = errorlog = "/var/log/gunicorn/gunicorn.log"
	# Redirect stdout/stderr to log file
	capture_output = True
	# PID file so you can easily fetch process ID
	#pidfile = "/var/run/gunicorn/dev.pid"
	# Daemonize the Gunicorn process (detach & enter background)
	#daemon = True
	# Workers silent for more than this many seconds are killed and restarted
	timeout = 600
	# Restart workers after this many requests
	max_requests = 10
	# Stagger reloading of workers to avoid restarting at the same time
	max_requests_jitter = 30
	# Restart workers after this much resident memory
EOF
chown -R ubuntu:ubuntu /home/ubuntu/.gunicorn

# supervisor
cat <<- EOF | sudo tee /etc/supervisor/conf.d/gunicorn.conf
	[program:django_gunicorn]
	directory=/home/ubuntu/my-public-repo/
	command=/usr/bin/gunicorn -c /home/ubuntu/.gunicorn/config.py
	autostart=true
	autorestart=true
	stdout_logfile=/var/log/supervisor/django-gunicorn-out.log
	stderr_logfile=/var/log/supervisor/django-gunicorn-err.log
EOF
sudo systemctl restart supervisor

# logging
cd /home/ubuntu
wget https://amazoncloudwatch-agent.s3.amazonaws.com/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo apt install -y ./amazon-cloudwatch-agent.deb
cd /opt/aws/amazon-cloudwatch-agent/bin
cat << EOF | sudo tee config.json
{
    "agent": {
        "metrics_collection_interval": 60,
        "run_as_user": "root"
    },
    "logs": {
        "logs_collected": {
            "files": {
                "collect_list": [
                    {
                        "file_path": "/var/log/nginx/access.log",
                        "log_group_class": "STANDARD",
                        "log_group_name": "nginx-access.log",
                        "log_stream_name": "prod",
                        "retention_in_days": -1
                    },
                    {
                        "file_path": "/var/log/nginx/error.log",
                        "log_group_class": "STANDARD",
                        "log_group_name": "nginx-error.log",
                        "log_stream_name": "prod",
                        "retention_in_days": -1
                    },
                    {
                        "file_path": "/var/log/gunicorn/gunicorn.log",
                        "log_group_class": "STANDARD",
                        "log_group_name": "gunicorn.log",
                        "log_stream_name": "prod",
                        "retention_in_days": -1
                    },
                    {
                        "file_path": "/home/ubuntu/my-public-repo/myapp.log",
                        "log_group_class": "STANDARD",
                        "log_group_name": "myapp.log",
                        "log_stream_name": "prod",
                        "retention_in_days": -1
                    }
                ]
            }
        }
    },
    "metrics": {
        "aggregation_dimensions": [
            [
                "InstanceId"
            ]
        ],
        "append_dimensions": {
            "AutoScalingGroupName": "\${aws:AutoScalingGroupName}",
            "ImageId": "\${aws:ImageId}",
            "InstanceId": "\${aws:InstanceId}",
            "InstanceType": "\${aws:InstanceType}"
        },
        "metrics_collected": {
            "collectd": {
                "metrics_aggregation_interval": 60
            },
            "disk": {
                "measurement": [
                    "used_percent"
                ],
                "metrics_collection_interval": 60,
                "resources": [
                    "*"
                ]
            },
            "mem": {
                "measurement": [
                    "mem_used_percent"
                ],
                "metrics_collection_interval": 60
            },
            "statsd": {
                "metrics_aggregation_interval": 60,
                "metrics_collection_interval": 10,
                "service_address": ":8125"
            }
        }
    }
}
EOF
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json -s`}
                </SyntaxHighlighter>
              </li>
              <li>
                Finally, select <b>Create launch template</b>.
              </li>
            </ol>

            <p>
              Great! Now we can easily launch multiple new web servers by selecting our template &gt; Actions &gt;
              Launch instance from template. Feel free to modify this template as you go, for example by adding extra
              setup instructions for npm by selecting our template &gt; Actions &gt; Modify template (Create new
              version).
            </p>
          </div>
        </div>

        {/* Add an AWS Application Load Balancer */}
        <ResponsiveHeading numbering="04">Add an AWS Application Load Balancer</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Before creating our load balancer, we need to create a target group for our web servers, which is simply a
              group of EC2 instances that our load balancer will point to. But first, we'll need to create an endpoint
              where our target group can ping our web servers to check if they're still responding. If they stop
              responding with a 200 status, the server will automatically be marked unhealthy by the target group. We
              could add a custom middleware to intercept this request and put less load on our server, but let's just
              add a regular view instead for simplicity at the endpoint <code>/status</code>:
            </p>
            <ol>
              <li>
                Add a new view to our top-level <code>views.py</code> that returns a simple HTTP response:
              </li>
              <SyntaxHighlighter language="py" style={monokaiSublime}>
                {`def status_view(request):
  return HttpResponse("Healthy.")`}
              </SyntaxHighlighter>
              <li>
                Add a new URL to our top-level <code>urls.py</code> that points to this view:
              </li>
              <SyntaxHighlighter language="py" style={monokaiSublime}>
                {`urlpatterns = [
  path('status/', views.status_view, name='status'),
]`}
              </SyntaxHighlighter>
            </ol>

            <p>
              Now that our endpoint is created, we can create a target group for our web servers that periodically sends
              health checks to this endpoint:
            </p>
            <ol start="3">
              <li>
                Navigate to the{" "}
                <a className="fw-bold" target="_blank" href="https://console.aws.amazon.com/ec2/">
                  AWS EC2 console
                </a>{" "}
                and select <b>Target Groups</b> &gt; <b>Create target group</b>.
              </li>
              <li>
                Select a target type of <b>Instances</b>.
              </li>
              <li>
                Give it a name such as <b>web-server-tg</b>.
              </li>
              <li>
                Select a protocal of <b>HTTP</b> which defaults to port <b>80</b>.
              </li>
              <li>
                Under <b>Health checks</b>, select <b>HTTPS</b> for the protocol and <code>/status</code> for the path.
              </li>
              <li>
                Select <b>Next</b>. On the next page, select the instance(s) to add to this target group, then select{" "}
                <b>Include as pending below</b>.
              </li>
              <li>
                Select <b>Create target group</b>.
              </li>
            </ol>
            <p>
              Now that our instance(s) are added to the target group, we should see each one receiving a ping to{" "}
              <code>/status</code> every 30 seconds. If we select the newly created target group, we should see a count
              of healthy and unhealthy web servers. By default, a server is marked as unhealthy if it fails to respond
              to 5 pings in a row, and is marked healthy again when it responds to 2 pings in a row (all of this can be
              configured as desired in the target group). The target group will use this information to automatically
              instruct our load balancer to stop sending requests to unhealthy servers, and in the future we can even
              configure it to automatically spin up new web servers when the number of healthy web servers drops below
              some threshold.
            </p>
            <p>
              Next, let's modify our security groups. Note that we want no longer want our EC2 instances exposed to
              public web traffic, only our load balancer. First, let's create a new security group for our ALB:
            </p>
            <ol start="10">
              <li>
                Navigate to the{" "}
                <a className="fw-bold" target="_blank" href="https://console.aws.amazon.com/ec2/">
                  AWS EC2 console
                </a>{" "}
                and select <b>Security Groups</b> &gt; <b>Create security group</b>.
              </li>
              <li>
                Give it a name such as <b>alb-sg</b>.
              </li>
              <li>Add two inbound rules that allow HTTP and HTTPS traffic from anywhere.</li>
            </ol>

            <p>
              Next, let's modify the existing security group for our web servers to only allow web traffic from our ALB,
              not the open web:
            </p>
            <ol start="13">
              <li>
                Navigate to the{" "}
                <a className="fw-bold" target="_blank" href="https://console.aws.amazon.com/ec2/">
                  AWS EC2 console
                </a>{" "}
                and select <b>Security Groups</b> &gt; <b>web-server-sg</b>.
              </li>
              <li>
                Select <b>Actions</b> &gt; <b>Edit inbound rules</b>.
              </li>
              <li>Remove all inbound rules except for the one that allows SSH traffic.</li>
              <li>
                Add a new inbound rule that allows HTTP traffic from the security group of our ALB we just created.
              </li>
            </ol>
            <p>
              Finally, we're ready to create the AWS Application Load Balancer (ALB) which will distribute traffic to
              the web servers in our new target group:
            </p>
            <ol start="17">
              <li>
                Navigate to the{" "}
                <a className="fw-bold" target="_blank" href="https://console.aws.amazon.com/ec2/">
                  AWS EC2 console
                </a>{" "}
                and select <b>Load Balancers</b> &gt; <b>Create load balancer</b>. Select{" "}
                <b>Application Load Balancer</b> and <b>Create</b>.
              </li>
              <li>
                Give it a name like <b>web-server-alb</b>.
              </li>
              <li>
                Select a scheme of <b>Internet-facing</b>.
              </li>
              <li>Select any two or more Availability Zones.</li>
              <li>Select the security group we created earlier.</li>
              <li>Select the target group we created earlier.</li>
              <li>
                Select <b>Create</b>.
              </li>
            </ol>
            <p>
              Note down the IPv4 address of our new load balancer (something like{" "}
              <code>dualstack.alb-&lt;random-id&gt;.us-west-1.elb.amazonaws.com</code>). Now that everything's hooked
              up, the final step is to point our domain to our ALB instead of to our single EC2 instance.
            </p>
            <ol start="24">
              <li>
                Select the ALB we just created and navigate to the <b>Details</b> tab. Copy the <b>DNS name</b> of the
                ALB.
              </li>
              <li>
                Navigate to your domain registrar, remove the previous <b>A</b> records that pointed to the EC2 machine,
                and add an <b>A</b> record that points to the DNS name of the ALB, such as{" "}
                <code>dualstack.alb-&lt;random-id&gt;.us-west-1.elb.amazonaws.com</code>.
              </li>
              <li>
                Save the changes and test your domain by navigating to it in your browser. You should see your web app.
              </li>
            </ol>

            <p>
              Well done! We've now enabled multiple web servers and created a load balancer to distribute traffic
              amongst them.
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <ResponsiveHeading numbering="05">Next Steps</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              From here, we could enable tools like EC2 Auto Scaling, which can automatically terminate and spin up
              servers using our launch template to maintain a certain number of healthy servers at all times. It can
              also be configured to scale up and down servers based on the average usage (memory, CPU, or networking
              traffic) across our servers to keep up with traffic. Congratulations on completing this series of blog
              posts!
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
