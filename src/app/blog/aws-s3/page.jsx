import { blogs } from "@/data/blogs";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

export async function generateMetadata() {
  const blog = blogs.find((blog) => blog.slug === "aws-s3");

  return {
    title: blog.title,
  };
}

export default function AwsS3() {
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
              Currently, our web app is serving static files, such as images and CSS files, directly from our server.
              This is a simple and straightforward way to serve static files, but it won't scale well as our website
              grows and gains more users. For example, our hard drive will eventually run out of space as we add more
              static files such as images to our website. Files uploaded by our users, called media files in Django, are
              also currently stored on our server's hard drive and run the same risk. In addition, we're adding more
              load to our server by serving large static files instead of just lightweight HTML and JSON, leading to
              slow response times and potential downtime. To solve this problem, we can use AWS S3, a scalable object
              storage service. S3 is a good fit for our use case because it's designed to store large amounts of data
              cheaply and is highly available and durable.
            </p>

            <p>Let's get started by creating a new S3 bucket:</p>
            <ol>
              <li>
                Navigate to the{" "}
                <a className="fw-bold" target="_blank" href="https://console.aws.amazon.com/s3/">
                  AWS S3 console
                </a>{" "}
                and select <span className="fw-bold">Create bucket</span>.
              </li>
              <li>
                Give your bucket a name and ensure{" "}
                <span className="fw-bold">Server-side encryption with S3 managed keys</span> is selected.
              </li>
              <li>
                Select <span className="fw-bold">ACLs enabled</span>.
              </li>
              <li>
                Turn off <span className="fw-bold">Block all public access</span> for now. This will get fixed later
                when we add a CDN.
              </li>
              <li>
                Then click <span className="fw-bold">Create bucket</span>.
              </li>
              <li>
                Next, we need to configure CORS (cross-origin resource sharing) to restrict only our website to access
                the bucket. In your newly created bucket, navigate to the Permissions tab, scroll down to the CORS
                configuration, and select <span className="fw-bold">Edit</span>. Add the below CORS configuration to the
                bucket:
                <SyntaxHighlighter language="json" style={monokaiSublime}>
                  {`[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "POST",
            "PUT",
            "DELETE",
        ],
        "AllowedOrigins": [
            "https://example.com"
        ],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3600
    }
]`}
                </SyntaxHighlighter>
              </li>
            </ol>

            <p>
              At this point, we could start uploading files to our new bucket by clicking the{" "}
              <span className="fw-bold">Upload</span> button. However, we'd rather Django automatically collect and
              upload our static files for us as we develop our website. To do this, we need our EC2 machine to directly
              access the S3 bucket on our behalf. Let's create a new role that allows reading and writing to S3 buckets
              that we can assign to our EC2 machine:
            </p>
            <ol>
              <li>
                Navigate to the{" "}
                <a className="fw-bold" target="_blank" href="https://console.aws.amazon.com/iam/">
                  AWS IAM console
                </a>{" "}
                and select <span className="fw-bold">Roles</span>.
              </li>
              <li>
                Select <span className="fw-bold">Create role</span>.
              </li>
              <li>
                Select <span className="fw-bold">AWS Service</span> and <span className="fw-bold">EC2</span>, then
                select <span className="fw-bold">Next</span>.
              </li>
              <li>
                On the permissions page, select <span className="fw-bold">AmazonS3FullAccess</span> and select{" "}
                <span className="fw-bold">Next</span>.
              </li>
              <li>
                On the final page, give your role a name like <code>ec2-role</code> and select{" "}
                <span className="fw-bold">Create role</span>.
              </li>
            </ol>

            <p>Now that our new role is created, let's assign it to our EC2 machine:</p>
            <ol>
              <li>
                Navigate to the{" "}
                <a className="fw-bold" href="https://console.aws.amazon.com/ec2/">
                  AWS EC2 console
                </a>{" "}
                and select your EC2 machine.
              </li>
              <li>
                Select the <span className="fw-bold">Actions</span> dropdown. Under{" "}
                <span className="fw-bold">Security</span>, select <span className="fw-bold">Modify IAM role</span>.
              </li>
              <li>
                Select the role we just created and select <span className="fw-bold">Save</span>.
              </li>
            </ol>

            <p>
              Great! Now our EC2 machine can read and write to S3 buckets. Next, we need to configure our Django app to
              use S3 for static files and user-uploaded files (called media files in Django).
            </p>
            <ol>
              <li>
                Install boto3 (a Python library for interacting with AWS services) and django-storages:
                <SyntaxHighlighter language="sh" style={monokaiSublime}>
                  {`pip install boto3 django-storages`}
                </SyntaxHighlighter>
              </li>
              <li>
                Note that we should want our web app to continue serving static files from our local directories during
                development and <i>only</i> pull static files from S3 during production. Add the following to your
                Django project's <code>settings.py</code> file:
                <SyntaxHighlighter language="python" style={monokaiSublime}>
                  {`...
if DEBUG:
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
    STATIC_URL = '/staticfiles/'
    STATICFILES_DIRS = os.path.join(BASE_DIR, 'static')
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
    MEDIA_URL = '/media/'
else:
    AWS_STORAGE_BUCKET_NAME = 'your-bucket-name'
    AWS_QUERYSTRING_EXPIRE = 3600
    AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
    AWS_S3_FILE_OVERWRITE = False
    AWS_DEFAULT_ACL = None
    STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    STATICFILES_DIRS = os.path.join(BASE_DIR, 'static')
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
    STATIC_URL = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/staticfiles/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'mediafiles')
    MEDIA_URL = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/mediafiles/'
...`}
                </SyntaxHighlighter>
              </li>
            </ol>

            <p>
              Now anytime we update our CSS, JS, images, etc., we can use Django's built-in script to automatically
              gather these static files from the <code>/static</code> directory, copy them to the{" "}
              <code>staticfiles/</code> directory, and upload them in bulk to S3:
            </p>
            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`python manage.py collectstatic`}
            </SyntaxHighlighter>

            <p>
              Note that <code>collectstatic</code> is done for us automatically during development&mdash;whenever we run{" "}
              <code>python manage.py runserver</code>, our static files are automatically served directly from our{" "}
              <code>static/</code> directory for convenience.
            </p>

            <p>
              Great! Now our static files and user-uploaded files are stored securely in S3. We've dramatically reduced
              the load on our server and can scale our website to handle more traffic. However, images and other large
              files may seem slower to load and users who are located thousands of miles from the S3 bucket will
              experience slow load times. To solve these issues, we should add a CDN (content delivery network) to our
              website such as AWS Cloudfront, but that's a topic for another blog post.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
