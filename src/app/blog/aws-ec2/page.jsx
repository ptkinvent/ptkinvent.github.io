import { blogs } from "@/data/blogs";
import ResponsiveCaption from "@/components/responsive-caption";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ResponsiveHeading from "@/components/responsive-heading";
import Image from "next/image";
import ec2SecurityConfig from "@/assets/img/ec2-security-config.png";
import ec2KeyPair from "@/assets/img/ec2-key-pair.png";
import nginxWelcome from "@/assets/img/nginx-welcome.png";

export async function generateMetadata() {
  const blog = blogs.find((blog) => blog.slug === "aws-ec2");

  return {
    title: blog.title,
  };
}

export default function AwsEc2() {
  return (
    <>
      <article className="container">
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              These days, they say anyone and their grandma can create and launch a website. But having been through it
              a handful of times, I can say truthfully it's still kind of a mess. Perhaps it's even
              intentional&mdash;companies like SquareSpace and Wix thrive precisely because there's such a tall learning
              curve! Even the best tutorials are generally scattered, don't explain the meaning behind each step, and
              often just unhelpfully link you to generic documentation. This post attempts to teach you to launch your
              own static website in a maintainable and explainable way. A static website is one that only has a
              frontend&mdash;meaning there are no forms, user accounts, or databases.
            </p>
            <p>
              You'll need some familiarity with command line tools. To be clear, this post is not about creating content
              for your website (HTML/CSS/JS). Instead, this tutorial will lead you through deploying your static website
              once it's ready by launching a fresh AWS EC2 machine, setting up an NGINX web server, setting up a domain
              on Google Domains, and adding HTTPS using Certbot. If that sounds like what you've been searching for,
              read on!
            </p>
          </div>
        </div>

        {/* Part 1 */}
        <ResponsiveHeading numbering="01">Launching the Web Server</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
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
                <a className="fw-bold" href="https://console.aws.amazon.com/ec2/" target="_blank">
                  AWS EC2 Console
                </a>
                . EC2 stands for Elastic Compute Cloud and is where we will launch a virtual machine which will become
                our web server.
              </li>
              <li>
                Select <span className="fw-bold">Launch Instance</span>.
              </li>
              <li>
                We're asked to choose an operating system. For the purposes of this tutorial, we'll stick with{" "}
                <span className="fw-bold">Ubuntu Server 20.04</span>. We'll leave the option on the right toggled to{" "}
                <span className="fw-bold">64-bit (x86)</span>.
              </li>
              <li>
                Next, we're asked to choose how powerful of a machine we want. For this tutorial, we'll choose the{" "}
                <span className="fw-bold">t2.micro</span> since it's eligible for the free tier, but for enterprise
                setups we'd use something larger like <span className="fw-bold">m6i.large</span>. Select{" "}
                <span className="fw-bold">Next: Configure Instance Details</span>.
              </li>
              <li>
                Nothing to do here! Click <span className="fw-bold">Next: Add Storage</span>.
              </li>
              <li>
                Our machine currently has 8 GB of storage. You can choose up to 30 GB if you like for free. Click{" "}
                <span className="fw-bold">Next: Add Tags</span>.
              </li>
              <li>
                Nothing to do here! Click <span className="fw-bold">Next: Configure Security Group</span>.
              </li>
              <li>
                In its current security configuration, this machine will allow SSH connections and nothing else.
                However, web servers need to accept HTTP and HTTPS connections, so let's add those. Give the security
                group a name like <span className="fw-bold">web-server-sg</span>. Select{" "}
                <span className="fw-bold">Add Rule</span> and choose <span className="fw-bold">HTTP</span> under Type.
                Select <span className="fw-bold">Add Rule</span> again and choose <span className="fw-bold">HTTPS</span>{" "}
                under Type.
              </li>
            </ol>
          </div>
        </div>

        <ResponsiveCaption caption="Our security group configuration should allow inbound SSH, HTTP, and HTTPS connections.">
          <Image src={ec2SecurityConfig} className="w-100 h-auto" alt="" placeholder="blur" />
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <ol start="10">
              <li>
                Click <span className="fw-bold">Review and Launch</span> then <span className="fw-bold">Launch</span>.
              </li>
              <li>
                A pop-up appears asking to select an existing key pair or create a new key pair. Choose{" "}
                <span className="fw-bold">Create a new key pair</span>. Set the type to{" "}
                <span className="fw-bold">RSA</span>. Give it any name, e.g.{" "}
                <span className="fw-bold">aws-website</span>, and click{" "}
                <span className="fw-bold">Download Key Pair</span>. You can save the resulting .pem file anywhere, but
                I'd recommend keeping it in <code>~/.ssh/</code>. This file is called an Identity File and is necessary
                to SSH into your AWS machine. You'll have to modify the permissions on this file before you can use it
                with SSH. Run the following command in your terminal:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`chmod 400 path/to/your/identity/file.pem`}
                </SyntaxHighlighter>
              </li>
            </ol>
          </div>
        </div>

        <ResponsiveCaption caption="Download your Identity File from this pop-up and store it safely.">
          <Image src={ec2KeyPair} className="w-100 h-auto" alt="" placeholder="blur" />
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <ol start="12">
              <li>
                Click <span className="fw-bold">Launch Instances</span>.
              </li>
              <li>
                Give AWS a few minutes to spin up your new machine. Once it's launched, you'll be able to see it on the
                EC2 dashboard. From the dashboard, select <span className="fw-bold">Instances</span> and select the{" "}
                <span className="fw-bold">Instance ID</span> of your new machine. This will show information about your
                new instance, including its <span className="fw-bold">Public IPv4 address</span> which you should note
                down.
              </li>
              <li>
                Almost there! Now, let's SSH into our new machine and install a web server so our machine will start
                responding to HTTP and HTTPS requests. Apache and NGINX are popular free ones&mdash;we'll stick with
                NGINX for this tutorial. You'll need the IPv4 address of your machine and the .pem file you downloaded
                earlier. Run the following command from your terminal:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`ssh -i <path/to/your/identity/file.pem> ubuntu@<your IPv4>`}
                </SyntaxHighlighter>
                Note: If you'll be SSH-ing into your machine a lot, you can set up a convenient nickname inside{" "}
                <code>~/.ssh/config</code> so you don't have to type the path to the .pem file and IPv4 information
                every time:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`Host aws-website
HostName <your IPv4>
User ubuntu
IdentityFile <path/to/your/identity/file.pem>`}
                </SyntaxHighlighter>
              </li>
              <li>
                We're now connected to our brand new machine. It's alway good practice to download updates in any new
                Ubuntu machine before using it:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`sudo apt update
sudo apt -y upgrade`}
                </SyntaxHighlighter>
              </li>
              <li>
                Once that's done, install NGINX with <code>sudo apt install nginx</code>. Once it's installed, we can
                launch it with <code>sudo nginx -s reload</code>. At this point, you should be able to navigate to your
                server's IPv4 address in your browser and see your server respond with the NGINX welcome page!
              </li>
            </ol>
          </div>
        </div>

        <ResponsiveCaption caption="Your server is up and running if you can see this in your browser.">
          <Image src={nginxWelcome} className="w-100 h-auto" alt="" placeholder="blur" />
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
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
                You can now edit your <code>~/html/index.nginx-debian.html</code> file as you please! It's common
                practice to shorten this filename to <code>index.html</code> for convenience if you'd like. Don't worry,
                it won't break anything. You can also add other files to your <code>~/html</code> folder and they will
                automatically be served by your web server.
              </li>
            </ol>
          </div>
        </div>

        {/* Part 2 */}
        <ResponsiveHeading numbering="02">Pointing a Domain at the Web Server</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Hooray! Our web server is running, but our visitors would have to type an ugly IP address into their
              browser to visit it, which isn't a great experience. Instead, we'd like to point a custom domain to our
              server. This part is much easier&mdash;just have your IPv4 address handy from earlier. Typical websites
              for purchasing domains include GoDaddy, BlueHost, and Google Domains. For reference, AWS also has their
              own domain management system called Route 53, but just be aware it's not beginner-friendly. Let's use
              Google Domains for this tutorial.
            </p>
            <ol>
              <li>
                Navigate to{" "}
                <a className="fw-bold" href="https://domains.google.com" target="_blank">
                  Google Domains
                </a>
                .
              </li>
              <li>
                Click <span className="fw-bold">Get a new domain</span> and purchase something you like, such as{" "}
                <code>example.com</code>. Take your time, I'll be here.
              </li>
              <li>
                Navigate to <span className="fw-bold">My domains</span> and click on your new domain.
              </li>
              <li>
                From the left menu, choose <span className="fw-bold">DNS</span>.
              </li>
              <li>
                Under <span className="fw-bold">Custom records</span>, let's add two new records&mdash;one for{" "}
                <code>example.com</code> and one for <code>www.example.com</code>.
                <ol>
                  <li>
                    For the first one, leave <span className="fw-bold">Host name</span> empty. Under Type, select{" "}
                    <span className="fw-bold">A</span> because we're creating what's called an A-name record. Leave{" "}
                    <span className="fw-bold">TTL</span> as 3600&mdash;that's just a "time to live" parameter we don't
                    need to worry about. Finally, under <span className="fw-bold">Data</span> enter your server's IPv4
                    address.
                  </li>
                  <li>
                    Create one more A-name record that's identical to the previous one but whose{" "}
                    <span className="fw-bold">Host name</span> is <code>www</code>.
                  </li>
                  <li>
                    Hit <span className="fw-bold">Save</span>.
                  </li>
                </ol>
              </li>
              <li>
                That's it! Give it a few minutes, then try navigating to your domain from your browser. You should see
                your website! If you're having trouble, I'd recommend looking into the <code>dig</code> command line
                tool to debug.
              </li>
            </ol>
          </div>
        </div>

        {/* Part 3 */}
        <ResponsiveHeading numbering="03">Adding HTTPS</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              You may have noticed your browser complaining that your website is insecure. This is because modern
              websites use HTTPS for encrypting traffic, but our website is only configured for HTTP. HTTPS is
              technically optional, but these days most search engines won't even surface your website unless it has
              HTTPS enabled, so let's add it for good measure.
            </p>
            <p>
              There are many providers of HTTPS certificates. Let's use{" "}
              <a target="_blank" href="https://certbot.eff.org/">
                Certbot
              </a>{" "}
              since it's easy and free. Note that Certbot will require you to renew your certificate every 90 days.
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
                    Finally, allow Certbot to modify your NGINX configuration. As a result, Certbot will modify our{" "}
                    <code>/etc/nginx/nginx.conf</code> to redirect anyone trying to connect to our website insecurely
                    over HTTP to connect over HTTPS instead.
                  </li>
                </ol>
              </li>
              <li>
                You'll need to create a new NGINX configuration file for your website. The name of the file is typically
                the same as your domain name. Run the following:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`cd /etc/nginx/sites-available/
sudo touch example.com`}
                </SyntaxHighlighter>
                Edit the file we just created called <code>example.com</code> using your favorite editor (vim, nano,
                etc.) with sudo privileges. Add the following content inside, replacing all six instances of{" "}
                <code>example.com</code> with your domain name:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name example.com www.example.com;

    root /path/to/html;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
}
`}
                </SyntaxHighlighter>
              </li>
              <li>
                We can put multiple configuration files inside <code>/etc/nginx/sites-available</code>, but NGINX will
                only run the one(s) pointed to by the symbolic link inside <code>/etc/nginx/sites-enabled</code>. We'll
                now create our own symbolic link, which is just a file that points to another file, to point to our
                configuration. Run:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`cd /etc/nginx/sites-enabled
sudo rm default
sudo ln -s /etc/nginx/sites-available/example.com example.com`}
                </SyntaxHighlighter>
              </li>
              <li>
                Reload NGINX to apply the updated configuration:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`sudo nginx -s reload`}
                </SyntaxHighlighter>
              </li>
              <li>
                Your website now has HTTPS! Navigate to your website in your browser to check&mdash;you should see the
                "insecure connection" icons/messages disappear. It may take a reload or two.
              </li>
            </ol>
          </div>
        </div>

        {/* Part 4 */}
        <ResponsiveHeading numbering="04">Next Steps</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Now that our website is launched, how should you actually build your content? Well, that's up to personal
              preference and beyond the scope of this tutorial, but it depends on how simple or complex of a website you
              need. If you're just putting up a single page with no forms, you could write raw HTML/CSS/JS in your{" "}
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
              , which are meant for creating blogs and portfolios and won't require you to learn JavaScript. These tools
              will save you from having to add your header and footer to every page by hand, and have many free,
              open-source themes you can use. These days, however, it's more common to learn JavaScript and use{" "}
              <a href="https://react.dev/" target="_blank">
                React
              </a>{" "}
              for new websites, especially if you want to add interactivity and advanced features.
            </p>
            <p>
              Lastly, if you're planning to run a complex app with forms and user log in, you'll need to add a backend
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
            <p>
              For now though, congratulations netizen, you have your very own corner of the internet! Happy serving!
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
