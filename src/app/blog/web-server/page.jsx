import { blogs } from "@/data/blogs";
import Image from "@/components/image";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

export async function generateMetadata() {
  const blog = blogs.find((blog) => blog.id === "web-server");

  return {
    title: blog.title,
  };
}

export default function WebServer() {
  const blog = blogs.find((blog) => blog.id === "web-server");

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
              These days, they say anyone and their grandma can create and launch a website. But having been through it
              a handful of times, I can say truthfully it's still kind of a mess. Perhaps it's even
              intentional&mdash;companies like SquareSpace and Wix thrive precisely because it's still so difficult!
              Even the best tutorials are generally scattered, don't explain the meaning behind each step, and often
              just unhelpfully link you to generic documentation. This post attempts to teach you to launch your own
              website in a maintainable and explainable way.
            </p>
            <p>
              You'll need some familiarity with command line tools. To be clear, this post is not about creating content
              for your website (HTML/CSS/JS). Instead, this tutorial will lead you through deploying your website once
              it's ready by launching a fresh AWS machine, setting up an NGINX web server, setting up a domain on Google
              Domains, and adding HTTPS using Certbot. If that sounds like what you've been searching for, read on!
            </p>

            <h4>Part 1: Launching the Web Server</h4>
            <p>
              In the old days of Web 1.0, people used to run web servers from their own computers sitting inside their
              homes. These days, it's common practice to rent cloud compute on a virtual machine owned and maintained by
              a provider, such as Amazon Web Services (AWS), Google Cloud Platform (GCP), or Microsoft Azure. There
              aren't many differences between them, but just know that each cloud provider intentionally tries to lock
              you into their ecosystem, making it hard to change providers later. We'll use AWS for the purposes of this
              tutorial, sticking with the options that fall under{" "}
              <a href="https://aws.amazon.com/free/" target="_blank">
                AWS's Free Tier
              </a>{" "}
              so we can run our website for free for the first year.
            </p>
            <ol>
              <li>
                Navigate to{" "}
                <a className="font-weight-bold" href="console.aws.amazon.com/" target="_blank">
                  console.aws.amazon.com
                </a>
                and log in/sign up.
              </li>
              <li>
                From the Services menu, navigate to <span className="font-weight-bold">EC2</span>. EC2 stands for
                Elastic Compute Cloud and is where we will launch a virtual machine which will become our web server.
              </li>
              <li>
                Click the orange <span className="font-weight-bold">Launch Instances</span> button.
              </li>
              <li>
                We're asked to choose an operating system. For the purposes of this tutorial, we'll choose{" "}
                <span className="font-weight-bold">Ubuntu Server 20.04</span>. We'll leave the option on the right
                toggled to <span className="font-weight-bold">64-bit (x86)</span>. Click{" "}
                <span className="font-weight-bold">Select</span>.
              </li>
              <li>
                Next, we're asked to choose how powerful of a machine we want. For this tutorial, we'll choose the{" "}
                <span className="font-weight-bold">t2.micro</span> since it's eligible for the free tier. Click{" "}
                <span className="font-weight-bold">Next: Configure Instance Details</span>.
              </li>
              <li>
                Nothing to do here! Click <span className="font-weight-bold">Next: Add Storage</span>.
              </li>
              <li>
                Our machine currently has 8 GB of storage. You can choose up to 30 GB if you like for free. Click{" "}
                <span className="font-weight-bold">Next: Add Tags</span>.
              </li>
              <li>
                Nothing to do here! Click <span className="font-weight-bold">Next: Configure Security Group</span>.
              </li>
              <li>
                In its current security configuration, this machine will only allow SSH connections and nothing else.
                However, web servers need to accept HTTP and HTTPS connections, so let's add those. Click{" "}
                <span className="font-weight-bold">Add Rule</span> and choose{" "}
                <span className="font-weight-bold">HTTP</span> under Type. Click{" "}
                <span className="font-weight-bold">Add Rule</span> again and choose
                <span className="font-weight-bold">HTTPS</span> under Type.
              </li>
            </ol>
          </div>
        </div>

        <Image
          src="/img/ec2-security-config.png"
          width="8"
          caption="Your security group configuration should now look like this."
        />

        <div className="row">
          <div className="offset-md-2 col-md-8">
            <ol start="10">
              <li>
                Click <span className="font-weight-bold">Review and Launch</span> then{" "}
                <span className="font-weight-bold">Launch</span>.
              </li>
              <li>
                A pop-up appears asking to select an existing key pair or create a new key pair. Choose{" "}
                <span className="font-weight-bold">Create a new key pair</span>. Set the type to{" "}
                <span className="font-weight-bold">RSA</span>. Give it any name, e.g.{" "}
                <span className="font-weight-bold">personal-website</span>, and click{" "}
                <span className="font-weight-bold">Download Key Pair</span>. You can save the resulting .pem file
                anywhere, but I'd recommend keeping it in <code>~/.ssh/</code>. This file is called an Identity File and
                is necessary to SSH into your AWS machine. You'll have to modify the permissions on this file before you
                can use it with SSH. Run the following command in your terminal:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`chmod 400 <path/to/your/identity/file.pem>`}
                </SyntaxHighlighter>
              </li>
            </ol>
          </div>
        </div>

        <Image src="/img/ec2-key-pair.png" width="8" caption="Download your Identity File from this pop-up." />

        <div className="row">
          <div className="offset-md-2 col-md-8">
            <ol start="12">
              <li>
                Click <span className="font-weight-bold">Launch Instances</span>.
              </li>
              <li>
                Give AWS a few minutes to spin up your new machine. Once it's launched, you'll be able to see it on the
                EC2 dashboard. From the dashboard, click on <span className="font-weight-bold">Instances</span> and
                click on the <span className="font-weight-bold">Instance ID</span> of your new machine. This will show
                information about your new instance, including its{" "}
                <span className="font-weight-bold">Public IPv4 address</span> which you should note down.
              </li>
              <li>
                Almost there! Now, let's SSH into our new machine and install a web server. Apache and NGINX are popular
                free ones&mdash;there isn't much difference so we'll use NGINX for this tutorial. You'll need the IPv4
                address of your machine and the .pem file you downloaded earlier. Run the following command from your
                terminal:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`ssh -i <path/to/your/identity/file.pem> ubuntu@<your IPv4>`}
                </SyntaxHighlighter>
                Note: If you'll be SSH-ing into your machine a lot, you can set up a convenient nickname inside
                <code>~/.ssh/config</code> so you don't have to type the path to the .pem file and IPv4 information
                every time.
              </li>
              <li>
                We're now inside our brand new machine. It's good practice to always run <code>sudo apt update</code>{" "}
                and <code>sudo apt -y upgrade</code> in any new Ubuntu machine. This will download updates and may take
                a couple minutes.
              </li>
              <li>
                Once that's done, let's install NGINX with <code>sudo apt install nginx</code>. Once it's installed,
                let's launch it with <code>sudo nginx -s reload</code>. At this point, you should be able to navigate to
                your server's IPv4 address in your browser and see the NGINX welcome page!
              </li>
            </ol>
          </div>
        </div>

        <Image
          src="/img/nginx-welcome.png"
          width="8"
          caption="Your server is up and running if you can see this in your browser."
        />

        <div className="row">
          <div className="offset-md-2 col-md-8">
            <ol start="17">
              <li>
                At the moment, NGINX is serving a static HTML page located on your server at
                <code>/var/www/html/index.nginx-debian.html</code>. You can edit this file&mdash;go ahead and
                try&mdash;but it's a bit cumbersome because you'll need superuser privileges every time. Let's point
                NGINX to a new folder in our home directory called <code>html</code> instead. Run:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`cd ~
mkdir html
chmod 755 html/
cp /var/www/html/index.nginx-debian.html html/`}
                </SyntaxHighlighter>
                Now, let's point NGINX to our new folder. Edit the file at
                <code>/etc/nginx/sites-enabled/default</code> using your favorite editor with sudo privileges. This is
                the configuration file for our web server. Find the line that says <code>root /var/www/html</code> and
                modify it to point to our new folder. It should now say:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`...
root /home/ubuntu/html;
...`}
                </SyntaxHighlighter>
              </li>
              <li>
                You can now edit your
                <code>~/html/index.nginx-debian.html</code> file as you please! It's common practice to shorten this
                filename to
                <code>index.html</code>
                for convenience if you'd like. Don't worry, it won't break anything.
              </li>
            </ol>

            <h4>Part 2: Pointing a Domain at the Web Server</h4>
            <p>
              Hooray! Now our web server is running, but our visitors would have to type our IP address into their
              browser to visit it, which isn't a great experience. Instead, we'd like to point a custom domain to our
              server. This part is much easier&mdash;just have your IPv4 address handy from earlier. Typical websites
              for purchasing domains include GoDaddy, BlueHost, and Google Domains. For reference, AWS also has their
              own domain management system called Route 53, but it's confusing and difficult to use. Let's use Google
              Domains for this tutorial.
            </p>
            <ol>
              <li>
                Navigate to{" "}
                <a className="font-weight-bold" href="https://domains.google.com" target="_blank">
                  Google Domains
                </a>
                .
              </li>
              <li>
                Click <span className="font-weight-bold">Get a new domain</span> and purchase something you like. Take
                your time, I'll be here.
              </li>
              <li>
                Navigate to <span className="font-weight-bold">My domains</span> and click on your new domain.
              </li>
              <li>
                From the left menu, choose <span className="font-weight-bold">DNS</span>.
              </li>
              <li>
                Under <span className="font-weight-bold">Custom records</span>, let's add two new records&mdash;one for
                <code>example.com</code> and one for
                <code>www.example.com</code>.
                <ol>
                  <li>
                    For the first one, leave <span className="font-weight-bold">Host name</span> empty. Under Type,
                    select <span className="font-weight-bold">A</span> because we're creating what's called an A-name
                    record. Leave <span className="font-weight-bold">TTL</span> as 3600&mdash;that's just a "time to
                    live" parameter we don't need to worry about. Finally, under{" "}
                    <span className="font-weight-bold">Data</span> enter your server's IPv4 address.
                  </li>
                  <li>
                    Create one more that's identical to the previous one but whose{" "}
                    <span className="font-weight-bold">Host name</span> is <code>www</code>.
                  </li>
                  <li>
                    Hit <span className="font-weight-bold">Save</span>.
                  </li>
                </ol>
              </li>
              <li>
                That's it! Give it a few minutes, then try navigating to your domain from your browser. You should see
                your website! If you're having trouble, I'd recommend looking into the
                <code>dig</code> command line tool to debug.
              </li>
            </ol>

            <h4>Part 3: Adding HTTPS (Optional)</h4>
            <p>
              You may have noticed your browser complaining that your website is insecure. This is because modern
              websites use HTTPS for encrypting traffic, but our website is only configured for HTTP. HTTPS is
              technically optional, but not really because these days Google won't even surface your website in search
              results unless it has HTTPS enabled.
            </p>
            <p>
              There are many providers of HTTPS certificates. Let's use
              <a target="_blank" href="https://certbot.eff.org/">
                Certbot
              </a>
              since it's easy and free. Note that Certbot will prompt you to renew your certificate every 90 days.
            </p>
            <ol>
              <li>SSH into your machine.</li>
              <li>
                Run:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`sudo apt install -y python3-certbot-nginx`}
                </SyntaxHighlighter>
              </li>
              <li>
                Run Certbot:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`sudo certbot --nginx`}
                </SyntaxHighlighter>
                Certbot should lead you through a few steps:
                <ol>
                  <li>Enter your email so Certbot can remind you to renew your certificate every 90 days.</li>
                  <li>
                    Then enter the domain name you purchased, e.g. <code>example.com</code>.
                  </li>
                  <li>
                    Finally, allow Certbot to modify your NGINX configuration. As a result, Certbot will edit{" "}
                    <code>/etc/nginx/nginx.conf</code>
                    to redirect anyone trying to connect to your website insecurely over HTTP to connect over HTTPS
                    instead.
                  </li>
                </ol>
              </li>
              <li>
                You'll need to create a new NGINX configuration file for your website. The name of the file is typically
                the same as your domain name. Run the following:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`cd /etc/nginx/sites-available/
sudo touch mywebsitename.com`}
                </SyntaxHighlighter>
                Edit the file we just created called
                <code>mywebsitename.com</code> using your favorite editor (vim, nano, etc.) with sudo privileges. Add
                the following content inside, replacing all six instances of
                <code>mywebsitename.com</code> with your domain name:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`server {
    listen 80;
    server_name mywebsitename.com www.mywebsitename.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name mywebsitename.com www.mywebsitename.com;

    root /path/to/html;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/mywebsitename.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mywebsitename.com/privkey.pem;
}
`}
                </SyntaxHighlighter>
              </li>
              <li>
                We can put multiple configurations inside <code>/etc/nginx/sites-available</code>, but NGINX will only
                run the one(s) pointed to by the file inside <code>/etc/nginx/sites-enabled</code>. We'll now create a
                symbolic link, which is just a file that points to another file, to point to our configuration. Run:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`cd /etc/nginx/sites-enabled
sudo rm default
sudo ln -s /etc/nginx/sites-available/mywebsitename.com mywebsitename.com`}
                </SyntaxHighlighter>
              </li>
              <li>
                Reload NGINX to apply the updated configuration with:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`sudo nginx -s reload`}
                </SyntaxHighlighter>
              </li>
              <li>
                Your website now has HTTPS! Navigate to your website in your browser to check&mdash;you should see the
                "insecure connection" icons/messages disappear. It may take a reload or two.
              </li>
            </ol>

            <h4>Next Steps</h4>
            <p>
              Now that your website is launched, how should you actually build your content? Well, that's beyond the
              scope of this tutorial, but it depends on how simple or sophisticated of a website you need.
            </p>
            <p>
              If you're just putting up a single page with no forms, you can write raw HTML/CSS/JS in your{" "}
              <code>index.html</code> file without relying on any other tools.
            </p>
            <p>
              If you want to put up multiple static pages (like a blog or project portfolio), you can use a static
              website generator like{" "}
              <a href="https://jekyllrb.com/" target="_blank">
                Jekyll
              </a>{" "}
              or{" "}
              <a href="https://gohugo.io/" target="_blank">
                Hugo
              </a>
              . These days, however, it's most common to use{" "}
              <a href="https://nextjs.org/" target="_blank">
                React
              </a>{" "}
              for new websites if you're comfortable with JavaScript. These tools save you from having to add your
              header and footer to every page by hand, and have many free, open-source themes you can use.
            </p>
            <p>
              Lastly, if you're planning to run a complex app with forms and user log in, you should build a web app
              using a tool like{" "}
              <a href="https://www.djangoproject.com/" target="_blank">
                Django
              </a>{" "}
              or{" "}
              <a href="https://flask.palletsprojects.com/en/2.0.x/" target="_blank">
                Flask
              </a>{" "}
              if you're comfortable with Python, or{" "}
              <a href="https://nextjs.org/" target="_blank">
                Next.js
              </a>{" "}
              if you're comfortable with JavaScript. These require some additional setup&mdash;perhaps to be covered in
              another blog post&mdash;but will plug right into your current configuration.
            </p>
            <p>For now though, congratulations netizen, you have your very own website! Happy serving!</p>
          </div>
        </div>
      </article>
    </>
  );
}
