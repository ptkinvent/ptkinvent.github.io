import { blogs } from "@/data/blogs";
import ResponsiveCaption from "@/components/responsive-caption";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Image from "next/image";
import gitCherrypick from "@/assets/img/blog-git-cherrypick.png";
import gitRebase from "@/assets/img/blog-git-rebase.png";

export async function generateMetadata() {
  const blog = blogs.find((blog) => blog.slug === "git-tricks");

  return {
    title: blog.title,
  };
}

export default function GitSecrets() {
  return (
    <>
      <article className="container">
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              As a modern software engineer, you're likely familiar with essential Git commands like committing,
              branching, and merging. However, Git has far more depth than meets the eye&mdash;enough to potentially
              transform your workflow. For instance, your commit history is much more flexible than many beginner
              tutorials suggest&mdash;it's not as permanent as you might think.
            </p>
            <p>
              This post is about understanding the fundamental ideas behind Git, unlocking some hidden features, and
              taking your version control to the next level. As such, it assumes you already have a decent grasp of
              committing, branching, and merging. It's also a helpful reference for me personally&mdash;there's a few
              rarely-used but incredibly helpful commands here for which I have trouble remembering the exact syntax.
            </p>

            <h4>Global Gitignore</h4>
            <p>
              You're probably aware that if you create a file called <code>.gitignore</code> in your Git project and add
              some rules, Git will automatically ignore any files that match those rules and prevent you from committing
              them. What you may not know is that you can create a global ignore file which will apply across all your
              projects. Try creating one in your home directory that looks like this:
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="~/.gitignore">
          <SyntaxHighlighter language="sh" style={monokaiSublime}>
            {`# Global gitignore

# Build files
*.bin

# Editor-specific files
.idea/
.vscode/
`}
          </SyntaxHighlighter>
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>Note that you can name your file anything and keep it anywhere. Then, simply run:</p>

            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`git config --global core.excludesfile ~/.gitignore`}
            </SyntaxHighlighter>

            <p>
              and all files that match will be ignored in all situations. It's recommended to keep editor-specific
              ignore rules here; this prevents every team member from adding their own editor- and workspace-specific
              rules to every project.
            </p>

            <h4>Git Grep</h4>
            <p>
              In large projects, it's often very slow to use regular grep to find a piece of text in a folder.
              Fortunately, Git ships with a tool called <code>git grep</code>, which will skip untracked files to speed
              up search. Run:
            </p>

            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`git grep "search term"`}
            </SyntaxHighlighter>

            <h4>Remotes</h4>
            <p>
              You might have also heard about the distributed nature of Git, but have you ever actually taken advantage
              of it? It's good to know how to handle remotes flexibly in case you ever run into the odd situation where
              you need it. For example, if your Git server goes down for a day or you're in a place without network
              access, you can continue collaborating with your teammate by adding their machine as a remote. This can
              also be useful, for example, if you're working with a contractor developing code for you who isn't allowed
              access to the corporate intranet.
            </p>
            <p>
              If it's a new repository, rather than cloning from GitHub, you can clone from a peer machine on the same
              network over SSH using:
            </p>
            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`git clone ssh:gituser@hostname:/path/to/project`}
            </SyntaxHighlighter>
            <p>
              Then you'll have to ask the owner of the peer machine to enter their password, and you're good to go! Push
              and pull like normal. Pro-tip: Ask them to set up a new user on their machine with a shared password and
              have them push/pull to a repository owned by that user. You generally don't want to push/pull to a
              repository someone works on directly.
            </p>
            <p>
              Alternatively, the repository may already exist on your machine and you want to add your colleague's
              machine as another remote. In this case, use:
            </p>
            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`git remote add my_other_remote username@hostname[.domain.com]:path/to/project.git`}
            </SyntaxHighlighter>
            <p>
              Check to make sure it got added correctly with <code>git remote -vv</code>&mdash;you should now see two
              remotes listed. Now you can simply <code>git pull my_other_remote master</code> and{" "}
              <code>git push origin master</code> whenever you need to pull code from your colleague's machine and sync
              it with the origin.
            </p>

            <h4>Stashing</h4>
            <p>
              Git's stash is incredibly helpful. It's used to save uncommitted changes to be applied later, even to a
              completely different branch. For example, very often when you're trying to <code>git pull</code> it will
              fail because you have a conflicting change that's preventing Git from pulling. In this case, you can{" "}
              <code>git stash</code> your changes, then
              <code>git pull</code>, then run <code>git stash pop</code> or <code>git stash apply</code> (pop is the
              same as apply but also also deletes the stash unless there is a conflict). Now you can properly deal with
              merge conflicts if there are any.
            </p>
            <p>
              You can have multiple stashed changes. Run <code>git stash list</code> to see them all and{" "}
              <code>git stash show -p stash@#</code> to view the stash in diff form, replacing <code>&#35;</code> with
              the ID of the stash you want. <code>git stash drop stash@#</code> is used to delete a stash. It's very
              helpful when you have uncommitted changes preventing you from performing a Git action, e.g. checking out
              another branch. Use <code>git stash clear</code> to delete all stashes.
            </p>
            <p>
              All of these commands can be run without a stash ID&mdash;the action will simply apply to the topmost
              stash (<code>stash@{0}</code>). To keep your stashes from getting out of control, you should attach
              memorable messages when stashing. Use
            </p>

            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`git stash save "My memorable message"`}
            </SyntaxHighlighter>

            <h4>Patches</h4>
            <p>
              Sometimes you need to move code around but can't or don't want to push it to a remote. Maybe it's test
              code that you want to send your colleague to debug, and you'd rather not push it, even as a WIP commit. In
              this case, you can write your changes into a patch, which is just a text file containing the diff. Simply
              run
            </p>

            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`git diff > mypatch.patch`}
            </SyntaxHighlighter>

            <p>
              and your diff will be saved into the file. Send it to your colleague, and let them apply it to their copy
              of the project with
            </p>

            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`git apply mypatch.patch`}
            </SyntaxHighlighter>

            <h4>Branching</h4>
            <p>
              As a mindful developer you should strive to keep your Git history as maintanable as your code. There's a
              variety of techniques you can use, but be forewarned&mdash;some of them sound like heresey because they
              result in altered Git histories. It's common to hear colleagues call these techniques evil, but the truth
              is that anything can seem evil if attempting to use it without fully understanding how it works. Bear with
              me and you'll find they actually result in cleaner code bases and easier debugging when used properly.
            </p>
            <p>
              The only rule you need to follow is, if you do choose to alter your Git history, either make sure it only
              affects a local set of unpushed commits, or wait until you're about to merge and your branch will be
              deleted right after the merge. <strong>Unless you know what you're doing, do not ever use:</strong>
            </p>

            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`git push --force # Don't use this unless you really know what you're doing`}
            </SyntaxHighlighter>

            <p>
              to push your changes to the remote when collaborating. This will overwrite commits on the remote branch
              and could unintentionally destroy someone else's work, so be extremely careful.
            </p>

            <h5>Amend</h5>
            <p>
              Say you've just committed your code, only to realize it doesn't compile because you missed a semicolon
              somewhere. Should you make another commit just for the semicolon fix? Well, if you haven't pushed yet,
              you're in luck! Make the fix, stage the file(s), and use:
            </p>

            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`git commit --amend`}
            </SyntaxHighlighter>

            <p>
              You'll end up with the fix amended to your last commit. Note that the hash of that commit is no longer the
              same after the amend, which is why this technique only works if you haven't pushed&mdash;you're changing
              Git's history. Note that you can also use this technique to just edit the last commit's message.
            </p>

            <p>
              What happens if you have fast fingers and accidentally amended a commit instead of creating a new one?
              Fortunately, Git has your back. The old commit is still in Git's reflog, which keeps a history of where
              your <code>HEAD</code> was recently. View the reflog with:
            </p>

            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`git reflog`}
            </SyntaxHighlighter>

            <p>
              <code>HEAD</code> should currently be pointing to your amended commit, but <code>HEAD@{1}</code> should be
              pointing to your pre-amend commit, which still exists but is not part of any branch. To undo the amend,
              you need to reset back to <code>HEAD@{1}</code>, i.e. the commit <code>HEAD</code> was pointing to before
              now. You don't want to lose the amended changes, so we'll use a soft reset. Finally, we commit the reset
              files, but only with the details of that <code>HEAD@{1}</code> commit. This should restore you back to
              your pre-amend state:
            </p>

            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`git reset --soft HEAD@{1}
git commit -C HEAD@{1}`}
            </SyntaxHighlighter>

            <h5>Moving Commits</h5>
            <p>
              Has it ever happened to you that you've committed to the wrong branch? It's okay, it happens to the best
              of us! Just don't
              <code>git push</code> yet. Run:
            </p>

            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`git checkout topic
git cherry-pick <commit-hash>`}
            </SyntaxHighlighter>

            <p>to copy over the accidental commit to this branch. Now run</p>

            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`git checkout master
git reset --hard HEAD~`}
            </SyntaxHighlighter>

            <p>
              Now you can checkout your <code>topic</code> branch and push as normal. Phew, no problem. Cherry-pick can
              help you out of tight spots, but be aware that it's very easy to abuse and get you into even more trouble.
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="Git cherry-pick can help you out of tight spots.">
          <Image src={gitCherrypick} className="w-100 h-auto" alt="" placeholder="blur" />
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              For context, <code>git reset --hard</code> will delete commits locally&mdash;you'd have to{" "}
              <code>git pull</code> to get them back from the remote. Using <code>git reset --soft</code>, on the other
              hand, will undo the commit but leave the changes from that commit staged.
            </p>

            <h5>Rebase</h5>
            <p>
              Finally, one of the most powerful tools in Git is called rebase. It has two main uses&mdash;rebasing on
              top of another branch and interactive rebase. Both involve changing history, so should be not be used
              after you've pushed.
            </p>
            <p>
              Say you've been working locally on an unpushed branch called topic, which initially branched from master.
              You see some new commits appear on master that you'd like to have in your branch. At this point, you have
              two options&mdash;conventional wisdom would have you merge master into your branch, but this tends to make
              your commit history a tangled mess of back-and-forth merges. Instead, you can rebase if you haven't yet
              pushed. Once you've fetched the new commits on master, simply run
            </p>

            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`git rebase master`}
            </SyntaxHighlighter>

            <p>
              and voila! Your commits have now moved on top of the latest master. If you encounter a conflict, don't
              fret; just resolve it like you would for a merge, then run <code>git rebase --continue</code> (Git will
              prompt you). Now your branch history will stay clean, you'll be able to trace commit history easily across
              the project, and you'll be guaranteed to have a clean fast-forward when you merge back into master. As an
              added benefit, the commits related to your feature will stay together as a group instead of interspersed
              with many others in master.
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="Git rebase can be used instead of merge.">
          <Image src={gitRebase} className="w-100 h-auto" alt="" placeholder="blur" />
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              As an aside, if you're working on a pushed branch but have some unpushed commits, you can pull your
              teammates' changes to that branch with <code>git pull --rebase</code> to rebase your commits on top of
              theirs.
            </p>
            <p>
              Interactive rebase, on the other hand, is a great feature that comes with great power/responsibility.
              Imagine you're working again on a branch called topic. You've been diligently marking commits with WIP to
              signify that they don't necessarily build, and you're getting ready to merge back to master soon. At this
              point, you might want to combine multiple WIP commits into one that actually builds correctly. This is
              called squashing; it's a feature within Git's interactive rebase. If all your commits are unpushed, you
              can clean up your commits as you go without messing up anyone's history. Run:
            </p>

            <SyntaxHighlighter language="sh" style={monokaiSublime}>
              {`git rebase -i HEAD~#`}
            </SyntaxHighlighter>

            <p>
              replacing <code>&#35;</code> with the number of commits you want to rearrange. You'll enter the
              interactive rebase interface. You'll see instructions there for squashing, rewording, editing, etc
              commits. You can also rearrange and delete commits in this interface, but be careful not to lose any work.
              And that's it! You've changed Git history. If you do change history after it's been pushed, you can use{" "}
              <code>git push --force</code>, but be extremely careful because you risk undoing someone else's work.
            </p>

            <h5>Conclusion</h5>
            <p>
              I hope that these techniques, life-changing or not, will help make you a better developer. For a more
              thorough guide, I'd recommend checking out <a href="https://git-scm.com/book/en/v2">Pro Git</a>. I believe
              a great developer should maintain their source tree just as fastidiously as their code. Not only does a
              clean history help out your teammates, but it also helps you when bug-hunting (enter{" "}
              <code>git bisect</code>, a topic for another post). Try out the commands in a test project to get used to
              them and you'll reap the rewards. Now git outta here!
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
