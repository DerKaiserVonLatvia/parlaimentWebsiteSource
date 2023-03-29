<?php

error_reporting(E_ALL & ~E_NOTICE);
define("DB_HOST", "localhost");
define("DB_NAME", "dzv_parlaments");
define("DB_CHARSET", "utf8");
define("DB_USER", "root");
define("DB_PASSWORD", "db_pass");


$get = $_GET;

function getPoll($itemId){
    $pdo;
    try {
      $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";charset=" . DB_CHARSET . ";dbname=" . DB_NAME, 
        DB_USER, DB_PASSWORD
      );
    } catch (Exception $ex) { exit($ex->getMessage()); }
  
    $stmt = $pdo->prepare("SELECT * FROM `polls` where pollId={$itemId}");
    $stmt->execute();
    //echo("SELECT * FROM polls where pollId={$itemId}");
    $table = $stmt->fetchAll();
    $table=$table[0];
    $retVal="";
    $a=$table["pollTitle"];
    $b=$table["pollId"];
    $c=$table["pollOptions"];
    $d=$table["pollResults"];


    $retVal = "pollTitle=" . $a . "%pollId=" . $b . "%pollOptions=" . $c . "%pollResults=" . $d;

    return $retVal;
}


function writeToPoll($pollId, $valueToChange, $value){
  $pdo;
  try {
    $pdo = new PDO(
      "mysql:host=" . DB_HOST . ";charset=" . DB_CHARSET . ";dbname=" . DB_NAME, 
      DB_USER, DB_PASSWORD
    );
  } catch (Exception $ex) { exit($ex->getMessage()); }

  $stmt = $pdo->prepare("UPDATE polls SET {$valueToChange}='{$value}' WHERE pollId={$pollId};");
  $stmt->execute();
  $table = $stmt->fetchAll();
}


if($get["write"]=="poll")
{
  writeToPoll($get["pollId"], $get["writeVal"], $get["value"]);
}

if($get["fetch"]=="poll")
{
    print_r(getPoll(0));
}
