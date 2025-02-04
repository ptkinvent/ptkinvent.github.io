import { blogs } from "@/data/blogs";

export async function generateMetadata() {
  const blog = blogs.find((blog) => blog.id === "spatial-computing");

  return {
    title: blog.title,
  };
}

export default function SpatialComputing() {
  const blog = blogs.find((blog) => blog.id === "spatial-computing");

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
              Augmented and virtual reality appear to be experiencing renewed interest these days under a new name:
              spatial computing. Apple appears to be avoiding the negative market and consumer sentiments associated
              with "virtual reality." While Meta has been investing heavily in the space for years now to little avail,
              I couldn't understand the value proposition of AR/VR until Apple unveiled their Vision Pro headset to the
              world just a few months ago. With a release date sometime in 2024, the Apple headset seems more targeted
              at productivity use-cases rather than socialization and fitness&mdash;and importantly, more as a tool for
              work than for home.
            </p>
            <p>
              If we treat these headsets as potential laptop replacements, which we can because Apple's will possess the
              same Apple silicon found in MacBooks, then the value of AR/VR in the workplace becomes much clearer.
              Especially in today's hybrid work environments, companies would much rather issue a lightweight headset to
              each employee than large desks, monitors, and laptops. I predict that comfort and price will become more
              and more minor issues over time.
            </p>
            <p>
              More interestingly, I wonder which companies will come to the forefront of AR/VR market. Companies like
              Meta and HTC have a head start, but will they be able to maintain them? Potentially, we can draw some
              parallels to the rise of past computing platforms and predict some market trends.
            </p>
            <h4>Target Market</h4>
            <p>
              The main use case that recently sold me on the future of mass adoption of VR/AR was the strength of
              productivity use cases from Apple's presentation. Positioning a headset as a potential laptop replacement,
              with productivity features for office documents as well as personal consumption features for online
              shopping and video streaming, with a familiar-looking operating system, makes for a very compelling buy
              for the average consumer (once the price comes down, which it will). I'm aware of similar features in the
              Meta headsets, but their branding and positioning heavily focus on their social and fitness features
              rather than productivity, which seem like weak use cases for a hefty investment in a new device for a
              consumer.
            </p>
            <p>
              Does this mean that VR/AR headsets will completely replace PCs for productivity? Some things are just more
              natural on a laptop&mdash;like in-person collaboration. Certainly, students may continue to use laptops
              for many years to come, while hybrid-workplace businesses simultaneously move away from issuing laptops to
              heasets for their employees. Why not issue a $1000 headset where your employees can bring their entire
              workspace home instead of a $1000 laptop plus the cost of several bulky monitors and desks that take up
              office space?
            </p>
            <p>
              The following predictions are based on arcs we've seen with historical computing platforms. As Apple put
              it during their announcement of the Vision Pro, first came the rise of personal computing, then mobile
              computing, and now we find ourselves at the beginning of spatial computing. They appear very analagous,
              both in terms of requisite technology and market forces.
            </p>

            <h4>The Winners</h4>
            <p>
              Based on what we've seen in personal and mobile computing, we can venture a guess as to which companies
              will command the strongest market forces in spatial computing. We know based on historical computing
              platforms that it will require a few major pieces: a headset-maker, a chip-maker, and an OS-maker. The new
              players here might be around low-power, portable LIDAR-makers, but if LIDAR-makers that supply the
              self-driving vehicle industry are any indication, they probably won't be a strong enough market force to
              command the others, so we can leave them out. We've seen that Apple is well-positioned to release a
              headset where they own every piece of this puzzle (including the LIDAR sensors), but what about everybody
              else?
            </p>
            <p>
              <strong>OS-makers:</strong> In terms of creating a competing OS, Microsoft and Google will perhaps race to
              capture the market, although it remains hard to predict whether they'll be open-sourced (e.g. Android
              model) or licensed (e.g. Windows model) to hardware manufacturers. It would be great to see Microsoft
              learn from their mistakes with Windows Phone OS and come out ahead as the competing OS of choice in
              spatial computing, but they may be too busy working with OpenAI to look up right now.
            </p>
            <p>
              <strong>Headset-makers:</strong> In terms of hardware, we can probably point to the usual suspects as
              becoming big players in the spatial computing era. Samsung, Motorola, HTC, Sony, Xiaomi, OnePlus, and
              Huawei all have potential to become compelling headset-makers powered by someone else's OS, analagous to
              the mobile computing market. What about HP, Dell, and Lenovo? Well PCs don't share as many parts with
              headsets compared to smartphones, so it's difficult to predict whether PC makers can adapt, build
              relationships with the right chip-makers, and ramp up new supply chains in time to keep up&mdash;it's a
              very tall order. Can we expect Microsoft and Google to also build their own headsets? Certainly, both of
              them dabble in hardware. Will they release their own headsets up-front or wait for the other
              hardware-makers to build the first iterations first? It's hard to predict, but they appear to have enough
              funding and expertise to expand vertically if they so desire. The ideal position is probably Apple's where
              they own every vertical, but they're also so uniquely good at this compared to Microsoft and Google.
            </p>
            <p>
              <strong>Chip-makers:</strong> Qualcomm stands out as the sole mobile chip-maker that can hold a candle to
              Apple's chips today. Their latest Snapdragon chips appear competitive with Apple Silicon in terms of power
              consumption and compute. Broadcomm has unfortunately been the victim of too much controversy to be a
              compelling player in this space.
            </p>

            <h4>The Not-winners</h4>
            <p>
              <strong>Laptop-makers:</strong> It's hard to imagine consumers in a couple years owning both a laptop and
              a spatial computing headset because so many of the benefits and use cases are identical. There may be some
              niche use cases, like for consultants, who might prefer to work sometimes on a headset so they can spread
              out their work on large screens during long plane rides, and sometimes on a laptop where they can share
              ideas with a colleague or a client more easily. For the rest of the world, however, buyers will likely
              view laptops and headsets as substitutes and only purchase one instead of both. This indicates that
              laptop-makers stand to lose market share to headset-makers.
            </p>
            <p>
              Simultaneously, it seems unlikely headsets will eat into the smartphone market. In the near term, there
              isn't a lot of compelling work yet on headsets that work well in outdoor, mobile environments. Apple
              showed only one outdoor use case in their announcement: a father walking outside with his headset and
              recording a 3D video of his daughter playing in the front yard, but it looked positively
              dystopian&mdash;people probably (hopefully) won't be doing this with their headsets. That's not to say
              it's impossible in the long-term&mdash;reception to Meta's sunglasses has certainly been more positive
              than that of Google Glasses&mdash;but there's still no screen or many of the other things that make
              smartphones so useful. Perhaps one day the technical challenges can one day be overcome to resolve this,
              but for the near term spatial computing does not appear as big a threat to the smartphone market as it
              does for the PC one.
            </p>
            <p>
              <strong>GPU-makers:</strong> GPUs are great for rendering complex 3D environments, but are likely too
              bulky, hot, and power-inefficient to be a good fit for a computing device that needs to live on your head.
              For this reason, it's unlikely that GPU chip-makers will be able to ride the wave of spatial computing.
            </p>
            <p>
              <strong>Intel:</strong> Intel failed to cash in on the smartphone chip market, and I'm guessing they'll
              fail to adapt again. Sorry Intel, if you can prove me wrong I'll make you brownies.
            </p>
            <p>
              <strong>Meta:</strong> Despite being (too) early to the market and trying their best to spark interest in
              VR/AR, Meta's headsets may fall by the wayside since they lack experience mass-producing at the scale of
              the other hardware-makers. Hardware is difficult&mdash;just ask Tesla. Instead, Meta's expertise is in
              building social features, so they may be more likely to build the social networking app of choice if
              they're able to build a compelling Metaverse accessible by all headsets. There's still a pretty penny to
              be made advertising in the era of spatial computing, but just as Meta failed to command enough of the
              smartphone market to set their own privacy and data collection rules, so too will Meta likely be relegated
              to just a software-maker role in the spatial computing era with no influence on data collection practices
              at the hardware level. Another win for all our data privacy, perhaps.
            </p>

            <h4>Conclusion</h4>
            <p>
              If all of this sounds rather unimaginative, it's because it is. At this point, we've witnessed two
              historical arcs in the personal and mobile computing markets, so we should roughly know how this works by
              now&mdash;I've assumed the market forces will essentially be the same as before. The main assumption where
              I've made use of my creative license is around headsets disrupting the PC industry much more than the
              smartphone industry in the short term. Much (or none) of this may not come to pass as outlined, but as
              unpredictable as advances in technology have become common&mdash;see ChatGPT&mdash;it's refreshing and
              interesting to find a familiar pattern in technology and try to predict for the sake of predicting.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
