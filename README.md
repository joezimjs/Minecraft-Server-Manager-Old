Minecraft-Server-Manager-Old
============================

The old version of a project for starting and sending commands to Minecraft Servers via a web interface.

##Getting Started
1) git clone the repo to a directory accessible by a normal web server (apache, IIS, etc)

2) In console, go to /app folder

3) npm install

4) Open /app/app.js and edit the CWD (line 37) to point to the folder containing all the folders of your Minecraft Servers

5) Open /app/servers.js to configure the servers for the app. Read the comment at the top for more information.

You should be able to run the app now. You may start the app server by going to /app in your console and running 
`node app`. This isn't technically necessary because if you go the index.html from a normal server and the app isn't
started, there should be a button on the page that will run a PHP script (/app/start_node.php) that will start the
Node server for you. If you do this, and it doesn't seem to do anything, refresh the page a couple times to be sure.
If it still doesn't work, start the Node server manually.

If you run into any troubles, just contact me: http://www.joezimjs.com/contact-me/
