import Script from "next/script";
import "@/styles/bootstrap/bootstrap.scss";
import "@/styles/index.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: {
    template: "%s | Prateek Sahay",
  },
  description:
    "Welcome to the digital realm of Prateek Sahay, an innovative entrepreneur based in the vibrant city of San Francisco, CA. This platform serves as a showcase for my journey, featuring a curated collection of my past projects and and a space to articulate my thoughts. Join me as as I navigate the intersection of creativity, engineering, and business.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-100">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

        {/* JS */}
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script type="text/javascript" src="/js/bootstrap.js"></script>
        <Script>
          {`(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-56229856-1', 'auto');
          ga('send', 'pageview');`}
        </Script>
        <script type="text/javascript" src="/js/fontawesome-all.js"></script>

        {/* CSS */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:900,400,300|Exo+2:400,200"
          type="text/css"
        />
      </head>
      <body className="h-100">
        <Header />

        <a name="top"></a>

        {children}

        <Footer />
      </body>
    </html>
  );
}
