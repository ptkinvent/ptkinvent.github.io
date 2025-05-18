import awsAlb from "@/assets/img/blog-aws-alb.png";
import awsRds from "@/assets/img/blog-aws-rds.png";
import spatialComputing from "@/assets/img/spatial-computing-blog.jpg";
import awsCloudfront from "@/assets/img/blog-aws-cloudfront.png";
import awsS3 from "@/assets/img/blog-aws-s3.png";
import awsDjango from "@/assets/img/blog-aws-django.png";
import awsEc2 from "@/assets/img/blog-aws-ec2.png";
import gitTricks from "@/assets/img/blog-git-tricks.png";
import osg from "@/assets/img/blog-osg.png";

export const blogs = [
  {
    slug: "aws-alb",
    title: "Scaling to Multiple Servers with AWS ALB",
    bannerImg: awsAlb,
    date: "05/17/2025",
    excerpt:
      "Finally, we'll set up an AWS Application Load Balancer to distribute traffic to our web app's servers. This is a load balancer that will randomly send each request to one of our servers, and it's a good way to...",
    show: true,
  },
  {
    slug: "aws-rds",
    title: "Connecting Django to AWS RDS",
    bannerImg: awsRds,
    date: "05/16/2025",
    excerpt:
      "Databases contain the long-term memory of your app server. They can be tricky, but don't have to be scary...",
    show: true,
  },
  {
    slug: "spatial-computing",
    title: "Thoughts on Spatial Computing",
    bannerImg: spatialComputing,
    date: "11/04/2023",
    excerpt:
      "While Meta has been investing heavily in the future of virtual/augmented reality (VR/AR) for years now, the vision of the future wasn't clear to me until Apple...",
    show: true,
  },
  {
    slug: "aws-cloudfront",
    title: "Serving Static Files Globally with AWS CloudFront",
    bannerImg: awsCloudfront,
    date: "09/25/2023",
    excerpt:
      "In the current setup, our static and media files are being served by S3, but any users living very far away may experience a noticeable delay when loading these files...",
    show: true,
  },
  {
    slug: "aws-s3",
    title: "Serving Static Files from AWS S3",
    bannerImg: awsS3,
    date: "08/16/2023",
    excerpt:
      "Currently, our web app is serving static files, such as images and CSS files, directly from our server. This is a simple and straightforward way to serve static files, but it won't scale well...",
    show: true,
  },
  {
    slug: "aws-django",
    title: "Serving a Dynamic Website with AWS EC2",
    bannerImg: awsDjango,
    date: "07/17/2023",
    excerpt:
      "For building simple websites such as this one, you can use static website generators like Jekyll Hugo. But for building more sophisticated websites...",
    show: true,
  },
  {
    slug: "aws-ec2",
    title: "Serving a Static Website with AWS EC2",
    bannerImg: awsEc2,
    date: "03/02/2022",
    excerpt:
      "These days, they say anyone and their grandma can create and launch a website. But having been through it a handful of times, I can say truthfully it's still kind of a mess...",
    show: true,
  },
  {
    slug: "git-tricks",
    title: "Git Tricks",
    bannerImg: gitTricks,
    date: "08/05/2021",
    excerpt:
      "As a modern software engineer, you probably have a good working knowledge of the most common Git commands -- committing, branching, and merging. But there's actually...",
    show: true,
  },
  {
    slug: "osg",
    title: "OpenSceneGraph for Robotics Development",
    bannerImg: osg,
    date: "06/14/2018",
    excerpt:
      "OpenSceneGraph (OSG) is a powerful open-source 3D graphics toolkit that's used in a wide variety of applications, from simulation to visual effects. In this post, I'll...",
    show: true,
  },
];
