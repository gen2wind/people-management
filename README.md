# People Management System 

This is a simple people management system, check the demo here https://gen2wind-pms.herokuapp.com/


## For Local Server
## ----------------------------------

Open Terminal/Cmd and go to PHP server root folder then enter "git clone https://github.com/gen2wind/people-management.git", then you should have folder "people-management" in your server root folder eg. on xampp, xampp/htdocs/people-management rename "people-management" into "people" so api-request will work, (you can ignore this if you know what you are doing)

====== For React application ========
- In Terminal/Cmd go to "react" folder inside "people"
- Make sure npm or yarn is install on your system
- run npm install  or yarn install (Your choice)
- then run npm start or yarn start (Also your choice)
- Note that the CRUD operation might not work without setting up the Server API folder first (Used PHP) 

====== For the API Requests ========
- In the api folder do the following
	- If you want to use mysql - Create a Mysql/MariaDB database and import the schema db/mysql.sql into it
	- Open inc/config.php and set "define('DB_DRIVER', 'mysql');" and make sure you database details are correct
	
- If you want to use sqlite3 just open inc/config.php and set "define('DB_DRIVER', 'sqlite');"


If somehow the api request is not going through, it can be that the whole process wasn't as described above then

- Open the file "constants.js" from the folder "src" in the react folder and edit const "APP_URL" eg. const APP_URL = 'http://localhost/people/api/' for the localhost;





## For Remote Server
## ----------------------------------

Open Terminal/Cmd and go to PHP-server-root-folder/people/react and enter "yarn build" or "npm run build" (Your choice)

Inside the build folder do the following
- copy the api folder into the build folder
- Add .htaccess into the build folder and add the below content into it
- `Options -MultiViews
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.html [QSA,L]`
	
- Then put everything inside the build folder into the server,

### That is it



My Pet project, I did it while I was bored


