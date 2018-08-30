
<h1 id="cloud9-environment-setup">Cloud9 Environment Setup</h1>
<p>Follow the instructions below to get your:</p>
<ul>
<li>GitHub account setup</li>
<li>Invite link to the contact-manager repository</li>
<li>Cloud9 account setup</li>
<li>Connect your GitHub to Cloud9</li>
<li>Create your Cloud9 workspace</li>
<li>Install MongoDB in your workspace<br>
<br></li>
</ul>
<h2 id="github">GitHub</h2>
<p>Visit <a href="http://GitHub.com">GitHub.com</a> and create an account using your Knights email.</p>
<ul>
<li>Signing up with a student email gives you free access to certain Developer Tools through GitHub’s Student Developer Pack</li>
</ul>
<p>Once you’ve created an account, text Steeve your GitHub username and he will send you an invite link to the contact-manager repository. Check your email for the invite link.<br>
<br></p>
<h2 id="cloud9-account-creation">Cloud9 Account Creation</h2>
<p>Visit the <a href="https://wdb-c9-invite.herokuapp.com/">Cloud9 invite link</a></p>
<ul>
<li>Enter your Email and <strong>Submit</strong>. You’ll receive an email from <a href="mailto:support@c9.io">support@c9.io</a></li>
<li>Click the link in the email</li>
<li><strong>Create Account</strong> and answer all the questions<br>
<br></li>
</ul>
<p>Once you create an account, you will see a Welcome screen</p>
<ul>
<li>Click on the <strong>Dashboard</strong>  button in the top right corner. Do Not click on Join Team</li>
</ul>
<br>
You've successfully created a Cloud9 account! 
<br>
<br>
<h2 id="connect-your-github-to-cloud9">Connect your GitHub to Cloud9</h2>
<p>Login to Cloud9</p>
<p>Go to <strong>Repositories</strong> on the left-hand side of your dashboard</p>
<p><strong>Connect</strong> by signing in to your GitHub</p>
<p>You should now see contact-manager as one of your listed repositories<br>
<br></p>
<h2 id="creating-your-workspace--installing-mongodb">Creating your workspace &amp; installing MongoDB</h2>
<p>Go to your Cloud9 dashboard and <strong>Create a new workspace</strong></p>
<ul>
<li>Name it <strong>contact-manager-YourName</strong> or whatever you want</li>
<li>Choose Public or Private, then choose your template (Node.js)<br>
<br></li>
</ul>
<p>Once your workspace is created, in your bash terminal enter the following commands in order</p>
<p>Copy the contact-manager repository</p>
<blockquote>
<p>git clone h<span>ttps://github.com/steevejoseph/contact-manager</span></p>
</blockquote>
<p>Install MongoDB in your workspace</p>
<blockquote>
<p>sudo apt-get install -y mongodb-org</p>
</blockquote>
<p>Running  MongoDB</p>
<blockquote>
<p>mkdir data</p>
<p>echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' &gt; mongod</p>
<p>chmod a+x mongod</p>
</blockquote>
<p>Start Mongod</p>
<blockquote>
<p>./mongod</p>
</blockquote>
<p>Ctrl+c to kill the process</p>
