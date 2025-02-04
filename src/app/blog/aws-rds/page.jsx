import { blogs } from "@/data/blogs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

export async function generateMetadata() {
  const blog = blogs.find((blog) => blog.id === "aws-rds");

  return {
    title: blog.title,
  };
}

export default function RDS() {
  const blog = blogs.find((blog) => blog.id === "aws-rds");

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
              Databases contain the long-term memory of your app server. They can be tricky, but don't have to be scary!
              Out-of-the-box, Django gets you started with a SQLite database, which works great for local development
              and small web apps in production. However, when it's time to scale up your app, you may find yourself
              wondering whether it's time to move to something more sophisticated, such as AWS RDS.
            </p>
            <p>
              How do you know when it's time to move to RDS? Well, for one thing, if your website is receiving more than
              5-10 simultaneous visitors, your single EC2 machine may struggle to handle all the traffic. In that case,
              you should consider enabling EC2 auto-scaling, which allows AWS to automatically spin up and down
              additional EC2 instances to keep up with demand. But in order to enable EC2 auto-scaling, you'll need to
              have a centralized database for all the EC2 instances to talk to. When this happens, it's time to move to
              RDS.
            </p>
            <p>
              The purpose of this blog post is to guide you through a migration from your SQLite database to a
              PostgreSQL database hosted in AWS RDS. If that sounds like what you need, read on!
            </p>
            <h4>Part 1: Launching an RDS Instance</h4>
            <ol>
              <li>
                Navigate to{" "}
                <a href="https://us-west-1.console.aws.amazon.com/rds/">
                  https://us-west-1.console.aws.amazon.com/rds/
                </a>
                .
              </li>
              <li>Scroll down to "Create database" and click "Create database."</li>
              <li>
                Select:
                <ul>
                  <li>
                    Engine options: <code>PostgreSQL</code>
                  </li>
                  <li>
                    Master username: <code>postgres</code>
                  </li>
                  <li>
                    Templates: <code>Free tier</code>
                  </li>
                  <li>
                    DB instance identifier: <code>my-database-name</code>
                  </li>
                  <li>
                    Master username: <code>postgres</code>
                  </li>
                  <li>
                    Master password: <code>some_secure_password</code>
                  </li>
                  <li>
                    Connectivity: <code>Don't connect to an EC2 compute resource</code>
                  </li>
                  <li>
                    Public access: <code>Yes</code>
                  </li>
                  <li>
                    Database authentication: <code>Password authentication</code>
                  </li>
                  <li>
                    Additional configuration: Initial database name: <code>tutorial_db</code>
                  </li>
                </ul>
              </li>
              <li>Select 'Create database.'</li>
              <li>
                Once created, copy the endpoint hostname (ends in
                <code>.us-west-1.rds.amazonaws.com</code>) and port number from the console and store them as
                environment variables in your terminal:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`export RDS_NAME="my-database-name"
export RDS_USER="postgres"
export RDS_PASSWORD="some_secure_password"
export RDS_HOST="<your hostname>"
export RDS_PORT="5432"
`}
                </SyntaxHighlighter>
              </li>
            </ol>
            <p>
              Next, we need to edit the security rules for this database to allow incoming connections from our EC2
              machine.
            </p>
            <ol start="6">
              <li>From the RDS console, select the security group corresponding to your RDS instance.</li>
              <li>Select 'Edit inbound rules'.</li>
              <li>
                Add a rule that allows connections of type <code>PostgreSQL</code> from the security group of your EC2
                instance.
              </li>
              <li>
                Add another rule that allows connections of type <code>SS</code> from the security group of your EC2
                instance.
              </li>
              <li>Select 'Save'</li>
            </ol>
            Great! Now your RDS instance is setup.
            <h4>Part 2: Connecting the RDS Instance to EC2</h4>
            <p>
              Ideally, we want to continue testing our app locally using SQLite while allowing the production EC2 server
              to communicate with RDS. We can enable this in our <code>settings.py</code>
              file by replacing the default values for <code>DATABASES</code>
              with:
            </p>
            <SyntaxHighlighter language="python" style={monokaiSublime}>
              {`...

if DEBUG:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ['RDS_NAME'],
            'USER': os.environ['RDS_USER'],
            'PASSWORD': os.environ['RDS_PASSWORD'],
            'HOST': os.environ['RDS_HOST'],
            'PORT': os.environ['RDS_PORT'],
        }
    }
...
`}
            </SyntaxHighlighter>
            <p>
              This code reads values from our environment variables and uses them to connect to our RDS machine during
              production. Next, run:
            </p>
            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`pip install psycopg2 # or psycopg2-binary`}
            </SyntaxHighlighter>
            <p>We can test the connection is working by using:</p>
            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`python manage.py dbshell`}
            </SyntaxHighlighter>
            <p>
              If everything worked, we should get a PostgreSQL prompt allowing us to query the newly created SQL
              database. But hang on, there's no tables yet!
            </p>
            <h4>Part 3: Loading Tables and Data into RDS</h4>
            <p>
              Now that everything's connected, the final step is initializing our database with the tables it needs to
              get started. If we want to start fresh with an empty database, simply run:
            </p>
            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`python manage.py migrate`}
            </SyntaxHighlighter>
            <p>Otherwise, if we want to bring data over from our old SQLite database, run these commands:</p>
            <ol>
              <li>
                For this step, temporarily point the terminal to the old SQLite database (e.g. by fudging the{" "}
                <code>if</code> statement we made in <code>settings.py</code>). Then, run:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`python manage.py dumpdata > data.json`}
                </SyntaxHighlighter>
              </li>
              <li>
                Now, point the server back to the new RDS machine. Then, run:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`python manage.py migrate --run-syncdb # Creates all the tables without filling out the django_migrations table`}
                </SyntaxHighlighter>
              </li>
              <li>
                We also need to manually delete some default data in our newly created RDS instance. Run:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`python manage.py shell
> from django.contrib.conttentypes.models import ContentType
> ContentType.objects.all().delete()
`}
                </SyntaxHighlighter>
              </li>
              <li>
                Finally, we can load the data from our <code>data.json</code> file into our new database. From the
                terminal, run:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`python manage.py loaddata data.json
`}
                </SyntaxHighlighter>
              </li>
            </ol>
            <p>To confirm our data has made it into the database, we can run:</p>
            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`python manage.py dbshell> \dt`}
            </SyntaxHighlighter>
            <p>
              If all is well, we should get a list of all our tables. Feel free to query them using SQL statements to
              confirm all your data is there, such as: <code>select * from django_migrations;</code>
            </p>
            <p>
              If everything looks good, you're done with your database migration! Congratulations, and happy coding.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
