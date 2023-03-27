<?php

$filename = $_FILES['file']['name'];

$location = "article_buffer/".$filename;


if ( move_uploaded_file($_FILES['file']['tmp_name'], $location) ) { 
    $htmlOutput = shell_exec("python extractHtml.py " . $location);
    echo($htmlOutput);
} else { 
  echo 'Failure'; 
}

?>