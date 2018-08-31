# Cloud9 Environment Setup

Follow the instructions below to get:

* GitHub account setup
* Invite link to the contact-manager repository
* Cloud9 account setup
* Connect your GitHub to Cloud9
* Create your Cloud9 workspace
* Install MongoDB in your workspace

## GitHub

Visit [GitHub](http://github.com) and create an account using your Knights email.
* Signing up with a student email gives you free access to certain Developer Tools through GitHub’s Student Developer Pack

Once you’ve created an account, text Steeve your GitHub username and he will send you an invite link to the contact-manager repository. Check your email for the invite link.

## Cloud9 Account Creation

Visit the [Cloud9 invite link](https://wdb-c9-invite.herokuapp.com/)
* Enter your Email and **Submit**. You’ll receive an email from support@c9.io
* Click the link in the email
* **Create Account** and answer all the questions
<br></br>

Once you create an account, you will see a Welcome screen
* Click on the **Dashboard** button in the top right corner. Do Not click on Join Team
<br></br>

You've successfully created a Cloud9 account!

## Connect your GitHub on Cloud9

Login to Cloud9
* Go to **Repositories** on the left-hand side of your dashboard
* **Connect** by signing in to your GitHub
* You should now see contact-manager as one of your listed repositories

## Creating your workspace & installing MongoDB

Go to your Cloud9 dashboard and **Create a new workspace**
* Name it **contact-manager-YourName** or whatever you want
* Choose Public or Private, then choose your template (Node.js)
<br></br>

Once your workspace is created, in your bash terminal enter the following commands in order

Copy the contact-manager repository
> git clone git clone ht<span>tps://github.com/steevejoseph/contact-manager</span>


Install MongoDB in your workspace
> sudo apt-get install -y mongodb-org

Running MongoDB
* when you paste the echo command into the terminal, if you notice the single and double quotation style in the command looks odd, you will have to retype the quotes after pasting the command. If you don't, the command will not run properly

> mkdir data

> echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
> chmod a+x mongod


Start Mongod
> ./mongod

Ctrl+c to kill the process
