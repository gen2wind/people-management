<?php

define( 'DB_DRIVER', 'sqlite' ); // mysql/sqlite

if(DB_DRIVER == 'mysql'){
    define('DB_HOST', 'localhost'); // set database host
    define('DB_USER', 'root'); // set database user
    define('DB_PASS', ''); // set database password
    define('DB_NAME', 'people'); // set database name
    define('DB_PORT', '3306'); // set database port

    define( 'APP_ENV', 'production' ); //production/development
    define( 'DISPLAY_DEBUG', true ); //display db errors?
}else if(DB_DRIVER == 'sqlite'){
    $dbFile =dirname( __DIR__).'/db/sqlite.db';
    if(!file_exists($dbFile)){
        touch($dbFile);
    }
    define('DB_FILE', $dbFile); //display db errors?
}