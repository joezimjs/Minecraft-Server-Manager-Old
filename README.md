Minecraft Server Manager (Old)
============================

The old version of a project for starting and sending commands to Minecraft Servers via a web interface. Here's a demonstration:

[![Minecraft Server Manager Demo](http://img.youtube.com/vi/dTIv_f-Ll2g/0.jpg)](http://www.youtube.com/watch?v=dTIv_f-Ll2g)

This project is no longer maintained as I am working on an entirely new and different version. When it is ready, I will add a link to it here.

## Getting Started
1) git clone the repo to a directory accessible by a normal web server (apache, IIS, etc). You can also use `npx http-server -p 80` from the root directory to start the file server accessible at [http://localhost](http://localhost). You'll also need to start a Node server, though, so before opening it up in your browser, finish the rest of the steps

2) In console, go to /app folder

3) npm install

4) Open `/app/app.js` and edit the CWD (line 37) to point to the folder containing all the folders of your Minecraft Servers

5) Open `/app/servers.js` to configure the servers for the app. Read the comment at the top for more information.

6) You should be able to run the app now. You may start the app server by going to `/app` in your console and running 
`node app`. This isn't technically necessary because if you go the `index.html` from a normal server with PHP enabled 
instead of using `npx http-server` and the app isn't started, there should be a button on the page that will run a PHP
script (`/app/start_node.php`) that will start the Node server for you. If you do this, and it doesn't seem to do anything,
refresh the page a couple times to be sure. If it still doesn't work, start the Node server manually.

If you run into any troubles, just contact me: http://www.joezimjs.com/contact-me/
