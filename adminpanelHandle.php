<?php

$filename = $_FILES['file']['name'];

$location = "article_buffer/".$filename;


$PATH_TO_PYTHON = "C:\Users\User\AppData\Local\Programs\Python\Python310\python.exe";

if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) { 
  try{
    $htmlOutput = shell_exec($PATH_TO_PYTHON . " extractHtml.py " . realpath($location) . " " . $filename . " 2>&1");
    echo($htmlOutput);
  }catch(exception $e){
    echo($e);
  }

} else { 
  echo 'Failure'; 
}

?>