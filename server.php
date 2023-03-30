<?php

error_reporting(E_ALL & ~E_NOTICE);
define("DB_HOST", "localhost");
define("DB_NAME", "dzv_parlaments");
define("DB_CHARSET", "utf8");
define("DB_USER", "root");
define("DB_PASSWORD", "arioliev3");


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
    $e=$table["dateCreated"];


    $retVal = "pollTitle=" . $a . "%pollId=" . $b . "%pollOptions=" . $c . "%pollResults=" . $d . "%dateCreated=" . $e;

    return $retVal;
}


function getComments($target){
  $pdo;
  try {
    $pdo = new PDO(
      "mysql:host=" . DB_HOST . ";charset=" . DB_CHARSET . ";dbname=" . DB_NAME, 
      DB_USER, DB_PASSWORD
    );
  } catch (Exception $ex) { exit($ex->getMessage()); }
  $stmt = $pdo->prepare("SELECT * FROM `comments` where commentTarget='{$target}'");
  $stmt->execute();
  $table = $stmt->fetchAll();
  $returnString="";
  foreach($table as $comment)
  {
    $commentAuthor=$comment["commentAuthor"];
    $commentText=$comment["commentText"];
    $commentDate=$comment["commentDate"];
    $returnString = $returnString . ($commentAuthor . "##" . $commentText . "##" . $commentDate) . ">>>";
  }


  return $returnString;

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

function getArticle($articleId){
  $fileName = "article_" . $articleId . ".html";

  $fileToOpen = fopen('articles/' . $fileName, "r");
  $text = fread($fileToOpen, filesize('articles/' . $fileName));
  fclose($fileToOpen);
  $name = "aa";
  $xml=simplexml_load_file("articles/article_data.xml");
  foreach($xml->children() as $article){
    if ($article['id']==$articleId)
    {
      $name = $article;
    }
  }
  return ($text . '##' . $name);
}

if($get["write"]=="poll")
{
  writeToPoll($get["pollId"], $get["writeVal"], $get["value"]);
}

if($get["fetch"]=="poll")
{
    print_r(getPoll($get["id"]));
}else if ($get["fetch"]=="article")
{
  print_r(getArticle($get["id"]));
}else if ($get["fetch"]=="comments")
{
  print_r(getComments("NO"));
}