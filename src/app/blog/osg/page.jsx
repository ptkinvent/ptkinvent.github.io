import { blogs } from "@/data/blogs";
import ResponsiveCaption from "@/components/responsive-caption";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Image from "next/image";
import osgExample from "@/assets/img/blog-osg-example.png";
import osgGlider from "@/assets/img/blog-osg-glider.gif";

export async function generateMetadata() {
  const blog = blogs.find((blog) => blog.slug === "osg");

  return {
    title: blog.title,
  };
}

export default function OSG() {
  return (
    <>
      <article className="container">
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              While working on new algorithms and data structures in robotics, it's often helpful to visualize data in
              3D. Certainly, it's possible for our minds to comprehend much larger amounts of data and perform visual
              error-checking in 3D than in the console. But I've met many bright developers who feel daunted by tools
              like Unity and Unreal Engine and end up trying to visualize complex 3D environments using 2D grayscale
              maps instead.
            </p>
            <p>
              Enter OpenSceneGraph (OSG). OSG is an open source, cross-platform 3D rendering library written in C++
              that's much easier to get up and running. There's still a learning curve, but it's short enough to be
              covered in a blog post like the one you're reading.
            </p>
            <p>
              "Why not use a standard tool like Gazebo for this?" you may be wondering. Well, in most cases, especially
              in professional environments, you may not be building in ROS. Perhaps ROS will one day become widely
              adopted enough that we can rely on Gazebo, but such is still not the case today.
            </p>
            <p>
              This guide is meant to springboard those developers looking to visualize 3D scenes in a quick-and-dirty
              manner&mdash;we won't be worrying about realistic shadows, materials, and other effects. If that sounds
              like you, keep on reading!
            </p>

            <h3>Introduction</h3>
            <p>
              I won't be getting into the installation of OpenSceneGraph. But for reference, after installation, if you
              have trouble linking your first project to the OpenSceneGraph library, here is a sample CMakeLists.txt
              file to get you started (don't worry, I was new to CMake when I started, too).
            </p>

            <SyntaxHighlighter language="cmake" style={monokaiSublime}>
              {`CMAKE_MINIMUM_REQUIRED(VERSION 2.6)
PROJECT(osgExample)

FIND_PACKAGE(OpenSceneGraph REQUIRED COMPONENTS osgViewer osgDB osgGA osgText)

SET(CMAKE_CXX_FLAGS "\${CMAKE_CXX_FLAGS} -std=c++11")

INCLUDE_DIRECTORIES(
    \${OPENSCENEGRAPH_INCLUDE_DIRS}
)

ADD_EXECUTABLE(osgExample main.cpp)

TARGET_LINK_LIBRARIES(osgExample
    \${OPENSCENEGRAPH_LIBRARIES}
)`}
            </SyntaxHighlighter>
          </div>
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <h3>Smart Pointers</h3>
            <p>
              Before we dive into building your first scene graph, just be aware that OSG ships with its own brand of
              smart pointers, called <code>{`osg::ref_ptr<>`}</code>. Just like <code>{`std::shared_ptr<>`}</code>,
              which you may be used to, these pointers maintain a count of how many times an object is referenced and
              will automatically delete the object when its reference count falls to zero. Unlike{" "}
              <code>{`std::shared_ptr<>`}</code>, the reference count in OSG also increments when an object is added to
              the scene graph and likewise decrements when the object is removed. Generally, it's good practice to use
              these smart pointers as much as possible. You'll find in examples that even the helper methods for
              constructing OSG objects for us will generally return a smart pointer to the constructed object rather
              than a regular pointer. Good practices like these will help prevent memory leaks or our objects being
              deleted when we least expect it.
            </p>

            <h3>Nodes</h3>
            <p>
              First and foremost, OpenSceneGraph is about constructing a graph, and for the purposes of this guide we
              can abstract away the specifics of how that graph is actually rendered into the 2D picture that appears on
              your screen and worry instead about creating just that graph. In fact, let's simplify further: for most
              purposes, your scene graph will really just be a scene tree.
            </p>
            <p>
              Now, a tree consists of nodes, one of which is the root. This is the root of your scene, and you'll see
              later that we specify <code>setSceneData(root)</code> to define the point where rendering begins. All
              other nodes will have one parent (in this guide, anyway) and zero or more children. There's two main types
              of nodes: group nodes and leaf nodes. Groups can have one or more children, and they may apply some sort
              of transform or special properties to all downstream children. Leaf nodes, on the other hand, cannot have
              children. They describe some sort of geometry or specific 2D/3D object in the scene, like a triangle or a{" "}
              <code>.3ds</code> model imported from a CAD program.
            </p>

            <h3>Geodes</h3>
            <p>
              With that, let's jump right in. Geodes are a special type of leaf node which define geometries; in fact
              geode is short for geometry node. The way to use these is to create one or more <code>osg::Drawable</code>
              s defining some geometry (like a line, triangle, sphere, text, etc.) and add it to your geode using{" "}
              <code>{`geode->addDrawable(geom)`}</code>. Then, add your geode to the scene graph under a group node with{" "}
              <code>{`group->addChild(geode)`}</code>.
            </p>
            <p>
              Let's expand on three types of drawables you can use inside geodes&mdash;geometries, shapes (yes, they're
              different), and text.
            </p>

            <h5>Geometries</h5>
            <p>
              Geometries are custom user-defined shapes. By combining individual shapes like triangles and quads, you
              can create shapes as simple as hexagons or as complex as pentagonal trapezohedrons&mdash;or really any
              shapes you can think of, including point clouds and nonconvex crescents. Let's start by creating a
              triangle.
            </p>
            <SyntaxHighlighter language="c++" style={monokaiSublime}>
              {`#include <osg/Referenced>
#include <osg/Geometry>
#include <osg/Geode>
#include <osg/Array>
#include <osgViewer/Viewer>

int main(int argc, char** argv)
{
    // Create the geometry which will define the triangle
    osg::ref_ptr<osg::Geometry> myTriangleGeometry = new osg::Geometry;

    // Define the triangle's 3 vertices
    osg::ref_ptr<osg::Vec3Array> vertices = new osg::Vec3Array;
    vertices->push_back(osg::Vec3(0, 0, 0));
    vertices->push_back(osg::Vec3(100, 0, 0));
    vertices->push_back(osg::Vec3(0, 0, 100));
    myTriangleGeometry->setVertexArray(vertices);

    // You can give each vertex its own color, but let's just make it green for now
    osg::ref_ptr<osg::Vec4Array> colors = new osg::Vec4Array;
    colors->push_back(osg::Vec4(0, 1.0, 0, 1.0)); // RGBA for green
    myTriangleGeometry->setColorArray(colors);
    myTriangleGeometry->setColorBinding(osg::Geometry::BIND_OVERALL);

    // Turn off lighting
    myTriangleGeometry->getOrCreateStateSet()->setMode(GL_LIGHTING, osg::StateAttribute::OFF);

    // Turn on blending
    myTriangleGeometry->getOrCreateStateSet()->setMode(GL_BLEND, osg::StateAttribute::ON);

    // Define the geometry type as 'triangles'
    myTriangleGeometry->addPrimitiveSet(new osg::DrawArrays(osg::PrimitiveSet::TRIANGLES, 0, vertices->size()));

    // Finally, let's add our triangle to a geode
    osg::ref_ptr<osg::Geode> myGeode = new osg::Geode;
    myGeode->addDrawable(myTriangleGeometry);

    // And now we can create a viewer to look at our geode
    osgViewer::Viewer viewer;
    viewer.setSceneData(myGeode);
    return viewer.run();
}
        `}
            </SyntaxHighlighter>

            <p>
              If you build and run this, you should be able to launch a window with a green triangle that you can spin
              around by clicking and dragging your mouse. Play around with it. Try adding 6 vertices instead of 3 and
              change the primitive type from <code>TRIANGLES</code> to <code>LINE_LOOP</code>. Now switch it to{" "}
              <code>LINES</code>, or <code>LINE_STRIP</code> Can you tell what these do?
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="Your first OSG geometry.">
          <Image
            src={osgExample}
            className="w-100 h-auto"
            alt="A green triangle with a purple backdrop"
            placeholder="blur"
          />
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              In this case, we chose to <code>BIND_OVERALL</code>, meaning we assigned a single color to the entire
              geometry. But we can actually assign individual colors at each vertex&mdash;OSG will blend the colors
              together for you if you add two more colors in the <code>colors</code> array and replace{" "}
              <code>BIND_OVERALL</code> with <code>BIND_PER_VERTEX</code>.
            </p>
            <p>
              Lighting is used to darken and lighten objects in the scene depending on the direction of the light source
              of the scene. For our purposes, they just make details hard to see so we turn them off. Blending enables
              helpful effects like transparency so we leave it on.
            </p>
            <p>
              By specifying <code>TRIANGLES</code> to the geometry, we've defined that we want to interpret every three
              vertices as a new triangle. Of course, there's plenty of other primitive types. Here's a non-exhaustive
              list to get you started:
            </p>

            <table className="table table-sm-responsive">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Primitive Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <code>POINTS</code>
                  </td>
                  <td>Renders each vertex as a point</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>
                    <code>LINES</code>
                  </td>
                  <td>Connects every pair of vertices with a line</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>
                    <code>LINE_STRIP</code>
                  </td>
                  <td>Draws a line connecting every point in sequence</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>
                    <code>LINE_LOOP</code>
                  </td>
                  <td>
                    Same as <code>LINE_STRIP</code> but also connects the beginning and end
                  </td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>
                    <code>TRIANGLES</code>
                  </td>
                  <td>Renders every triplet of points as a triangle</td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>
                    <code>TRIANGLE_STRIP</code>
                  </td>
                  <td>
                    Renders triangles with shared edges (
                    <a target="_blank" href="https://en.wikipedia.org/wiki/Triangle_strip">
                      see details here
                    </a>
                    )
                  </td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td>
                    <code>TRIANGLE_FAN</code>
                  </td>
                  <td>
                    Renders triangles with a shared vertex (
                    <a target="_blank" href="https://en.wikipedia.org/wiki/Triangle_fan">
                      see details here
                    </a>
                    )
                  </td>
                </tr>
                <tr>
                  <th scope="row">8</th>
                  <td>
                    <code>QUADS</code>
                  </td>
                  <td>Renders every 4 points as a quad</td>
                </tr>
                <tr>
                  <th scope="row">9</th>
                  <td>
                    <code>QUAD_STRIP</code>
                  </td>
                  <td>Renders quads with shared edges</td>
                </tr>
              </tbody>
            </table>

            <h5>Shapes</h5>
            <p>
              A variety of other basic shapes exist for quickly adding 3D objects to scenes, such as <code>Sphere</code>
              , <code>Box</code>, <code>Cone</code>, and <code>Cylinder</code>. They behave similarly to geometries in
              that they are attached to geodes using <code>addDrawable()</code>.
            </p>

            <h5>Text</h5>
            <p>
              Adding text to scenes is done using the <code>Text</code> class in the <code>osgText</code> namespace.
              Simply create an <code>osgText::Text</code> object and attach it to a geode using{" "}
              <code>addDrawable()</code>. Common methods used with text are:
            </p>
            <ul>
              <li>
                <code>setText()</code>
              </li>
              <li>
                <code>setPosition()</code>
              </li>
              <li>
                <code>setFont()</code>
              </li>
              <li>
                <code>setColor()</code>
              </li>
              <li>
                <code>setAxisAlignment()</code>&ensp;Place the text on the XY, YZ, XZ, or other planes.
              </li>
              <li>
                <code>setAlignment()</code>&ensp;Options here include centered, left-aligned, right-aligned, etc.
              </li>
              <li>
                <code>setCharacterSize()</code>
              </li>
            </ul>

            <h3>Groups</h3>
            <p>
              As mentioned before, groups are simply a type of node in the scene graph which contain children. Some
              groups, like <code>osg::Group</code> don't have any special properties&mdash;they simply help organize
              your scene graph in an intelligible way. Others apply special properties to their children.
            </p>
            <p>
              Below is a code snippet with a short example of how to use groups in your scene graph. To run the code
              snippet, you will need to download the example dataset for your version of OpenSceneGraph{" "}
              <a target="_blank" href="http://www.openscenegraph.org/index.php/download-section/data">
                here
              </a>
              , unzip it to a folder, and point an OSG-specific environment variable called <code>$OSG_FILE_PATH</code>{" "}
              to that folder so the files can be found at runtime. If you don't set <code>$OSG_FILE_PATH</code>, you'll
              have to provide paths to each model, like cessna.osg.
            </p>

            <SyntaxHighlighter language="c++" style={monokaiSublime}>
              {`#include <osg/Group>
#include <osgDB/ReadFile>
#include <osgViewer/Viewer>

int main(int argc, char** argv)
{
    // Root node of the scene
    osg::ref_ptr<osg::Group> root = new osg::Group;

    // Read "cessna.osg" file
    osg::ref_ptr<osg::Node> mynode = osgDB::readNodeFile("cessna.osg");
    if (!mynode)
    {
        printf("Node not loaded, model not found\\n");
        return 1;
    }

    // Add cessna to the scene
    root->addChild(mynode);

    // And now we can create a viewer to look at our geode
    osgViewer::Viewer viewer;
    viewer.setSceneData(root);
    return viewer.run();
}
`}
            </SyntaxHighlighter>

            <h4>Transforms</h4>
            <p>
              You might be thinking, "That covers adding objects to the scene, but how do you actually position them in
              the scene?". Well, there's two main ways of transforming objects in OSG:{" "}
              <code>PositionAttitudeTransform</code> and <code>MatrixTransform</code>. Both achieve the same results,
              but their interfaces differ.
            </p>

            <p>
              For PositionAttitudeTransforms, or PATs for short you apply a<code>setPosition()</code>,{" "}
              <code>setAttitude()</code>, and/or <code>setScale()</code> to transform all children downstream in the
              scene graph. Try to imagine how this could be used to construct a robot arm in OSG&mdash;a relatively
              linear scene graph where each linkage of the arm would be added under its own{" "}
              <code>osg::PositionAttitudeTransform</code>, which itself would be a child of the previous linkage of the
              arm. Changing the position or attitude of any linkage would automatically transform the downstream
              linkages.
            </p>

            <p>
              MatrixTransforms behave the same way, but rather than setting a position or attitude, you set a{" "}
              <code>Matrix</code> instead.
            </p>

            <p>Try running the following example to iteratively rotate a 3D model of a glider:</p>

            <SyntaxHighlighter language="c++" style={monokaiSublime}>
              {`#include <osgViewer/Viewer>
#include <osgDB/ReadFile>
#include <osg/Group>
#include <osg/MatrixTransform>
#include <osg/Matrix>
#include <osgGA/TrackballManipulator>

int main(int argc, char** argv)
{
    // Root node of the scene
    osg::ref_ptr<osg::Group> root = new osg::Group;

    // Add axesNode under root
    osg::ref_ptr<osg::Node> axesNode = osgDB::readNodeFile("axes.osgt");
    if (!axesNode)
    {
        printf("Origin node not loaded, model not found\\n");
        return 1;
    }
    root->addChild(axesNode);

    // Add a MatrixTransform under root
    osg::ref_ptr<osg::MatrixTransform> mt = new osg::MatrixTransform;
    root->addChild(mt);

    // Add gliderNode under MatrixTransform
    osg::ref_ptr<osg::Node> gliderNode = osgDB::readNodeFile("glider.osg");
    if (!gliderNode)
    {
        printf("Glider node not loaded, model not found\\n");
        return 1;
    }
    mt->addChild(gliderNode);

    // Create the viewer
    osgViewer::Viewer viewer;
    viewer.setSceneData(root);
    viewer.realize();

    // Attach a manipulator (it's usually done for us when we use viewer.run())
    osg::ref_ptr<osgGA::TrackballManipulator> tm = new osgGA::TrackballManipulator;
    viewer.setCameraManipulator(tm);

    int angle = 0;
    while (!viewer.done())
    {
        // Define the MatrixTransform's matrix
        osg::Matrix mRot  = osg::Matrix::rotate(osg::DegreesToRadians(double(angle)), osg::Z_AXIS);
        osg::Matrix mTrans = osg::Matrix::translate(5, 0, 0);
        osg::Matrix m = mRot * mTrans; // Translate then rotate
        mt->setMatrix(m);

        // Increment angle and wrap around for safety
        angle = (angle+1) % 360;

        viewer.frame();
    }

    return 0;
}
`}
            </SyntaxHighlighter>

            <p>
              In this case, we can see that the glider is translated along the x-axis and is rotating relative to the
              origin of the scene, marked by the set of axes. Note that <code>viewer.run()</code> in the previous
              examples was automatically attaching a manipulator to the scene for us. When we use{" "}
              <code>viewer.frame()</code>, we have to create and attach our own to enable zooming and panning.
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="The glider is translated along the x-axis then rotated about its z-axis.">
          <Image src={osgGlider} className="w-100 h-auto" alt="A glider rotating next to a set of 3D axes" />
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <h4>Switches</h4>
            <p>
              Switches are used to selectively hide or show objects in the scene. It's hard to find this written down
              anywhere, but it's generally not a good idea to <code>removeChildren()</code> from your scene graph
              often&mdash;rather, you should use <code>osg::Switch</code> or <code>{`node->setNodeMask()`}</code> to
              hide and show your nodes. To use a switch, initialize the switch, add it to the scene, give it some
              children, and use <code>setChildValue()</code> or <code>setSingleChildOn()</code> to make them visible or
              invisible.
            </p>

            <h4>LODs (Level of Detail)</h4>
            <p>
              LOD group nodes are used to make objects visible or invisible depending on the distance of the camera from
              the object. When you add a child, you also specify a range like so:{" "}
              <code>{`lod->addChild(node, 0, 1000)`}</code>. LOD nodes are often used for paging terrain data in and
              out&mdash;for example, when you zoom far out some high resolution terrain tiles can get replaced by lower
              resolution ones, putting less burden on the system and resulting in a smoother scene (all without the user
              knowing).
            </p>

            <h3>Conclusion</h3>
            <p>
              Well, that's a whirlwind tour of OpenSceneGraph. Of course, there's much more to it, including handling
              mouse interactions using intersections, keyboard interactions using event handlers, other types of
              manipulators, and autotransforms and billboards&mdash;perhaps for another blog post. Until then, these
              principles alone will get you pretty far with quickly creating complex 3D environments to visualize your
              algorithms. For more details, look to{" "}
              <a target="_blank" href="https://www.lulu.com/items/volume_51/767000/767629/3/print/OSGQSG.pdf">
                OSG Quick Start Guide
              </a>
              . As you become more familiar, you can even take advantage of the open-source nature of OSG and explore
              the source code of applications like{" "}
              <a
                target="_blank"
                href="https://github.com/openscenegraph/OpenSceneGraph/blob/master/applications/osgviewer/osgviewer.cpp"
              >
                osgViewer
              </a>
              , a command line utility that ships with OSG. Please feel free to share your adventures, and remember that
              play makes perfect!
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
