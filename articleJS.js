function getCurrentURL() {
  return window.location.search;
}
const url = getCurrentURL();
const params = new URLSearchParams(url);
const articleId = params.get("articleId");

console.log(articleId);

function requestArticleCode() {
  return new Promise((callBack) => {
    setTimeout(() => {
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", "server.php?fetch=article&id=" + articleId, true);
      xhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          callBack(this.responseText);
        }
      };
      xhttp.send();
    }, 0);
  });
}

//var html = requestArticleCode();

async function loadArticle() {
  let text_and_name = await requestArticleCode();
  let html = text_and_name.split('##')[0];
  let name = text_and_name.split('##')[1];
  document.getElementById("mainSection").innerHTML = html;
  document.getElementById("articleHeading").innerHTML = name;
}


loadArticle();