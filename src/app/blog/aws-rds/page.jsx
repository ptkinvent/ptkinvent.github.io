import { blogs } from "@/data/blogs";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ResponsiveHeading from "@/components/responsive-heading";
import ResponsiveCaption from "@/components/responsive-caption";

export async function generateMetadata() {
  const blog = blogs.find((blog) => blog.slug === "aws-rds");

  return {
    title: blog.title,
  };
}

export default function AwsRds() {
  return (
    <>
      <article className="container">
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              This blog post is part of a series about how to deploy a Django app to AWS. If you haven't deployed your
              Django app to EC2 and S3 yet, I recommend reading the <Link href="/blog/aws-ec2">AWS EC2</Link> and{" "}
              <Link href="/blog/aws-django">AWS Django</Link> posts first.
            </p>
            <p>
              Databases contain the long-term memory of your app server. Out-of-the-box, Django gets you started with a
              SQLite database, which works great for local development and small web apps. However, when it's time to
              scale up your app, you may find yourself wondering whether it's time to move your database to a dedicated
              machine for database operations like{" "}
              <a target="_blank" href="https://aws.amazon.com/rds/">
                AWS RDS
              </a>
              .
            </p>
            <p>
              How do you know when it's time to move to a dedicated database architecture? Well, if your website is
              receiving more than 5-10 simultaneous visitors, our single EC2 machine may struggle to keep up since it's
              balancing serving our web app with database operations. If that's the case, the solution is to offload
              your database operations to a dedicated machine. This architecture also enables scaling to multiple web
              servers in the future, where we might have multiple web servers talking to a centralized database which
              securely hosts our user data. In this blog post, we'll walk through scaling up from our SQLite database to
              a PostgreSQL database hosted in RDS.
            </p>
          </div>
        </div>

        {/* Launch an RDS Instance */}
        <ResponsiveHeading numbering="01">Launch an RDS Instance</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <ol>
              <li>
                Navigate to the{" "}
                <a className="fw-bold" target="_blank" href="https://us-west-1.console.aws.amazon.com/rds/">
                  AWS RDS console
                </a>{" "}
                and select <b>Create database</b>.
              </li>
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
                    Public access: <code>Yes</code> (just for testing&mdash;we'll fix this later)
                  </li>
                  <li>
                    Database authentication: <code>Password authentication</code>
                  </li>
                  <li>
                    Additional configuration: Initial database name: <code>tutorial_db</code>
                  </li>
                </ul>
              </li>
              <li>
                Select <b>Create database</b>.
              </li>
              <li>
                Once created, copy the endpoint hostname (ends in
                <code>.rds.amazonaws.com</code>) and port number (usually 5432) from the console and store them
                somewhere safely. It's bad practice to store them in code, so we'll store them in environment variables
                in our EC2 instance for now:
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
            <ol start="5">
              <li>From the RDS console, select the security group corresponding to your RDS instance.</li>
              <li>
                Select <b>Edit inbound rules</b>.
              </li>
              <li>
                Add a rule that allows connections of type <code>PostgreSQL</code> from the security group of your EC2
                instance.
              </li>
              <li>
                Add another rule that allows connections of type <code>SS</code> from the security group of your EC2
                instance.
              </li>
              <li>
                Select <b>Save</b>.
              </li>
            </ol>
            <p>Great! Now our RDS instance is setup. It has no tables or data yet, but we'll fix that soon.</p>
          </div>
        </div>

        {/* Connect EC2 to RDS */}
        <ResponsiveHeading numbering="02">Connect EC2 to RDS</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Ideally, we want to continue using SQLite while developing our app locally but point to RDS in production.
              We can enable this in our <code>settings.py</code> file by replacing the default values for{" "}
              <code>DATABASES</code> with:
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="settings.py">
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
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              This code will read values from the environment variables we created earlier and use them to connect to
              our RDS machine in production. Next, on your server, run:
            </p>
            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`pip install psycopg2 # or psycopg2-binary`}
            </SyntaxHighlighter>
            <p>We can now test the connection is working by using:</p>
            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`python manage.py dbshell`}
            </SyntaxHighlighter>
            <p>
              If everything worked, our EC2 machine should connect to RDS and we should get a PostgreSQL prompt allowing
              us to query the newly created database. But hang on, there's no tables or data yet!
            </p>
          </div>
        </div>

        {/* Migrate Tables and Data to RDS */}
        <ResponsiveHeading numbering="03">Migrate Tables and Data to RDS</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Now that everything's connected, the final step is initializing our database with our tables and data. If
              we want to start fresh with an empty tables, simply run:
            </p>
            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`python manage.py migrate`}
            </SyntaxHighlighter>
            <p>However, if we want to bring data over from our old SQLite database, run these commands instead:</p>
            <ol>
              <li>
                Temporarily point the code to the old SQLite database (e.g. by fudging the <code>if</code> statement we
                made in <code>settings.py</code>). Then, run:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`python manage.py dumpdata > data.json`}
                </SyntaxHighlighter>
              </li>
              <li>
                Now, point the code back to the new RDS instance. Then, run:
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
          </div>
        </div>

        {/* Next Steps */}
        <ResponsiveHeading numbering="04">Next Steps</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              If everything looks good, you're done with your database migration. From here, we can make further
              optimizations in the future, such as using a read replica for read-heavy operations or using a multi-AZ
              setup for high availability, but those are reserved for another blog post. Congratulations, and happy
              coding!
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
