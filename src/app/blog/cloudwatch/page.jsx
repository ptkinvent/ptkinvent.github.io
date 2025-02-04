import { blogs } from "@/data/blogs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

export async function generateMetadata() {
  const blog = blogs.find((blog) => blog.id === "cloudwatch");

  return {
    title: blog.title,
  };
}

export default function Cloudwatch() {
  const blog = blogs.find((blog) => blog.id === "cloudwatch");

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
            <p>TODO: Intro</p>

            <p>First, we need to grant permissions to our EC2 machine to send metrics to CloudWatch.</p>
            <ol>
              <li>
                Create a new IAM role for sending metrics to CloudWatch called <code>ec2-logging-metrics-role</code>.
                Give it permission <code>CloudWatchAgentServerPolicy</code>.
              </li>
              <li>
                Attach the role to our EC2 instance. Go to EC2 {">"} Click on the instance {">"} Actions {">"} Security{" "}
                {">"} Modify IAM role {">"} Attach the new role
              </li>
            </ol>

            <p>Next, install the CloudWatch Agent on your EC2 machine.</p>
            <ol start="3">
              <li>SSH into your EC2 machine</li>
              <li>
                <code>sudo apt install collectd</code>
              </li>
              <li>
                <code>sudo apt install amazon-cloudwatch-agent</code>
              </li>
              <li>
                <code>cd /opt/aws/amazon-cloudwatch-agent</code>
              </li>
              <li>
                <code>sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard</code>
              </li>
              <li>
                Say yes to all defaults except "Do you want to store the config in the SSM parameter store?" and "Do you
                want the CloudWatch agent to also retrieve X-ray traces?" (<strong>Note:</strong> The parameter store is
                inside of AWS Systems Manager {">"} Parameter Store. When we launch the CloudWatch agent, we can choose
                to launch it with a local JSON file or by grabbing a config from the parameter store. Good practice is
                to grab from the parameter store, but let's just use a file for the simplicity of this tutorial.)
              </li>
              <li>
                Also say yes to Say yes to "Do you want to monitor any log files?" to add four log files:
                <ul>
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
                    <code>/var/log/gunicorn/myapp.log</code>
                  </li>
                </ul>
                <strong>Note:</strong> For retention policy, <code>-1</code> means "never delete."
              </li>
              <li>
                Result is at <code>/opt/aws/amazon-cloudwatch-agent/bin/config.json</code>
              </li>
              <li>
                Start CloudWatch agent using:{" "}
                <SyntaxHighlighter language="bash" style={monokaiSublime}>
                  {`sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json -s`}
                </SyntaxHighlighter>
                (<strong>Note:</strong> If we instead wanted to fetch the config from the parameter store, we would use{" "}
                <code>-c ssm:&lt;parameterName&gt;</code>)
              </li>
              <li>
                Check status using: <code>amazon-cloudwatch-agent-ctl -a status</code>
              </li>
            </ol>

            <p>
              Finally, if we navigate to CloudWatch {">"} Log groups we should be able to see our logs streaming in.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
