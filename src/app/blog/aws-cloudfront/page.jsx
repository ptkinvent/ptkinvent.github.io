import { blogs } from "@/data/blogs";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

export async function generateMetadata() {
  const blog = blogs.find((blog) => blog.id === "aws-cloudfront");

  return {
    title: blog.title,
  };
}

export default function AwsCloudfront() {
  const blog = blogs.find((blog) => blog.id === "aws-cloudfront");

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
              This blog post is part of a series of posts about how to deploy a Django app to AWS. If you haven't
              deployed a web app to EC2 and S3 yet, I recommend reading the{" "}
              <Link href="/blog/aws-ec2">
                <span className="font-weight-bold">AWS EC2</span>
              </Link>{" "}
              and{" "}
              <Link href="/blog/aws-s3">
                <span className="font-weight-bold">AWS S3</span>
              </Link>{" "}
              posts first.
            </p>
            <p>
              In the current setup, our static and media files are being served by S3, but any users living very far
              away may experience a noticeable delay when loading these files. This is because our S3 bucket is
              attempting to serve users all across the world, which can be very slow. Instead, we can use a content
              delivery network (CDN) to cache our static and user-uploaded files in a global network of edge locations
              so they can be accessed much more quickly. Although many CDNs exist, such as CloudFlare, for this blog
              post we'll use AWS CloudFront and configure our Django app to use it.
            </p>

            <p>Let's get started by creating a new CloudFront distribution.</p>
            <ol>
              <li>
                Navigate to the{" "}
                <a className="font-weight-bold" target="_blank" href="https://console.aws.amazon.com/cloudfront/">
                  AWS CloudFront console
                </a>{" "}
                and select <b>Create distribution</b>.
              </li>
              <li>
                Under <b>Origin domain</b>, select the S3 bucket you had created previously.
              </li>
              <li>
                Under <b>Origin access</b>, select <b>Legacy access identities</b> and select <b>Create new OAI</b>.
                Then select <b>Yes, update the bucket policy</b>.
              </li>
              <li>
                Under <b>Allowed HTTP methods</b>, select <b>GET, HEAD</b>
              </li>
              <li>
                Under <b>Web Application Firewall</b>, select <b>Do not enable security protections</b>.
              </li>
              <li>
                Under <b>Response headers policy</b>, select <b>SimpleCORS</b>.
              </li>
              <li>
                Finally, select <b>Create Distribution</b>.
              </li>
            </ol>

            <p>
              Great! Now our CloudFront distribution is created. Note the <b>distribution domain name</b>, which looks
              like <code>https://&lt;name&gt;.cloudfront.net</code>, since we'll need it later. Next, we need to modify
              our S3 bucket to allow CloudFront to access it.
            </p>
            <ol>
              <li>
                Navigate to the{" "}
                <a className="font-weight-bold" target="_blank" href="https://console.aws.amazon.com/s3/">
                  AWS S3 console
                </a>
                , and select the bucket we created in the previous blog post.
              </li>
              <li>
                In the <span className="font-weight-bold">Permissions</span> tab, edit the public access setting to{" "}
                <span className="font-weight-bold">Block public access</span>. We no longer want to allow the public to
                access our S3 bucket directly&mdash;instead, only Cloudfront will access our bucket and periodically
                cache the files that users request.
              </li>
              <li>Keep ACL disabled.</li>
              <li>
                In the <span className="font-weight-bold">Policy</span> tab, add the following policy:
                <SyntaxHighlighter language="json" style={monokaiSublime}>
                  {`{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Sid": "AllowCloudFrontServicePrincipal",
        "Effect": "Allow",
        "Principal": {
            "Service": "cloudfront.amazonaws.com"
        },
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::procurespark/*",
        "Condition": {
            "StringEquals": {
                "AWS:SourceArn": "arn:aws:cloudfront::794311998140:distribution/E1WA3LKALKX6RF"
            }
        }
    }
]
                  }`}
                </SyntaxHighlighter>
              </li>
            </ol>

            <p>Finally, let's configure Django to point to our new CloudFront distribution.</p>
            <ol>
              <li>
                In <code>settings.py</code>, modify the <code>AWS_S3_CUSTOM_DOMAIN</code> setting to use the CloudFront
                distribution domain name:
                <SyntaxHighlighter language="python" style={monokaiSublime}>
                  {`AWS_S3_CUSTOM_DOMAIN = '<name>.cloudfront.net'`}
                </SyntaxHighlighter>
              </li>
            </ol>

            <p>
              Now our static and media files will be served from CloudFront, which should be much faster for users
              living far away.
            </p>
            <p>
              Note that whenever you push new static files to S3, CloudFront will continue serving the old files for
              some time. To force CloudFront to grab the latest files from S3, you'll need to invalidate the cache for
              CloudFront manually:
            </p>
            <ol>
              <li>
                Navigate to the{" "}
                <a className="font-weight-bold" target="_blank" href="https://console.aws.amazon.com/cloudfront/">
                  AWS CloudFront console
                </a>{" "}
                and select the distribution you just created.
              </li>
              <li>
                Under the <b>Invalidations</b> tab, select <b>Create invalidation</b>.
              </li>
              <li>
                In the <b>Paths</b> field, enter <code>/*</code> and select <b>Create</b>. After a few minutes, the
                latest static files should be getting served on your website.
              </li>
            </ol>

            <p>
              Since this process can quickly become tedious if you're updating static files (like JavaScript)
              frequently, you can also enable Django's built-in cache-busting behavior. This will automatically add a
              unique hash to the end of your static files, which will force CloudFront to fetch the latest version of
              each file.
            </p>
            <p>
              Although cache-busting is built natively into Django, we need to make a small modification to make it work
              with S3:
            </p>
            <ol>
              <li>
                Create a new file called <code>storage.py</code> in the your primary app directory and add the following
                content:
                <SyntaxHighlighter language="python" style={monokaiSublime}>
                  {`from storages.backends.s3boto3 import S3Boto3Storage
from django.contrib.staticfiles.storage import ManifestFilesMixin


class ManifestS3Storage(ManifestFilesMixin, S3Boto3Storage):
    """
    A class for implementing storage on S3 with hashes appended.
    """
    pass
`}
                </SyntaxHighlighter>
              </li>
              <li>
                In <code>settings.py</code>, modify the <code>STATICFILES_STORAGE</code> setting to point to the new
                storage class we just created:
                <SyntaxHighlighter language="python" style={monokaiSublime}>
                  {`STATICFILES_STORAGE = 'your_app.storage.ManifestS3Storage'`}
                </SyntaxHighlighter>
              </li>
            </ol>

            <p>
              Great! Now whenever you run <code>python manage.py collectstatic</code>, your static files will be
              uploaded to S3 with a unique hash appended to each file name. This will force CloudFront to fetch the
              latest version of each static file from S3, so we don't have to manually invalidate the cache every time.
              Our static files are ready for scaling worldwide!
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
