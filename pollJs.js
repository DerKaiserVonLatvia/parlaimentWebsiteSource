const urlParams = new URLSearchParams(window.location.search);
const pollId = urlParams.get('pollId');
var POLL_RESULTS = "";

function fetchVotes(pollId) {
  if (pollId && pollId !== "") {
    try {
      console.log(POLL_RESULTS)
      let results =  POLL_RESULTS;
      results.forEach(element => {
        results[results.indexOf(element)]=parseInt(element);
      });
      console.log(results);
      return results;
    } catch (error) {console.log(error)}
  } else {
    return [0];
  }
}

function getCurrentURL () {
  return window.location.search;
}
const url = getCurrentURL()
const params = new URLSearchParams(url);
const POLL_ID = params.get("pollId")

function addVoteToPoll(pollId, voteNum) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "server.php?fetch=poll&id="+pollId, true);
  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText); 
     }
  };
  xhttp.send();
}


var THIS_POLL_ID = 0;


function getPollInfo(pollId)
{
  return new Promise((callBack) => {
    setTimeout(() => {
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", "server.php?fetch=poll&id="+pollId, true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //console.log(this.responseText)
          callBack(this.responseText);
        }
     };
     xhttp.send();
    }, 0);
  });
}

async function loadPoll(pollId) {
  


  console.log(pollId)

  var r= await getPollInfo(pollId);

  console.log(r);

  let pollData = r.split('%');//pollTitle=Vai jūs piedalītos skolas talantu šovā?%pollId=0%pollOptions=Jā&Nē%pollResults=0&0
  var pollTitle = pollData[0].split('=')[1];
  var pollId =  pollData[1].split('=')[1];
  var pollOptions =  pollData[2].split('=')[1];
  var pollResults = pollData[3].split('=')[1].split('&');
  POLL_RESULTS=pollResults;

  document.getElementById('pollTitle').innerText = pollTitle;

  THIS_POLL_ID = parseInt(pollId);

  let html = ``;

  let allOptions = pollOptions.split('&');
  allOptions.forEach(element => {
    let number = allOptions.indexOf(element);
    let option = allOptions[number];
    html+=`        
    <div id="${number}" class="option">
        ${option} - ?
        <div id="filled${number}" class="filled" results="${pollResults[number]}"></div>
  </div>`;
  });
  document.getElementById("allOptions").innerHTML=html;
  document.getElementById("pollTitle").innerText=pollTitle;
  detectClicksOnOptions();

}

function sendVotes(optionToAddTo, pollId) {}

function checkIfVoted(pollId) {
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  ca.forEach((element) => {
    if (element.split("=")[0] === "lastVote") {
      if (element.split("=")[1] == pollId) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  });
}

function revealVotes(voteResults, votesum, allOptions) {
  let allFills = document.querySelectorAll(".filled");
  console.warn(allFills);
  let j = 0;
  allOptions.forEach((e) => {
    e.innerHTML = e.innerHTML.replace("?", voteResults[j]);
    j++;
  });

  let k = 0;
  allFills.forEach((e) => {
    let percent = (voteResults[k] / votesum) * 100;
    k++;
    anime.timeline({ loop: false }).add({
      targets: "#" + e.id,
      width: percent.toString() + "%",
      easing: "easeOutExpo",
      duration: 3300,
      delay: (el, i) => 100 * i,
    });
  });
}

function detectClicksOnOptions() {
  let allOptions = document.querySelectorAll(".option");
  console.log(allOptions);
  var optionVotes = fetchVotes("vote1");
  let votesum = 0;
  //console.log(votesum);
  var i = 0;

  if (checkIfVoted("vote"+THIS_POLL_ID)) {
    optionVotes.forEach((element) => {
      votesum += element;
    });
    revealVotes(optionVotes, votesum, allOptions);
  } else {
    allOptions.forEach((element) => {
      element.onmousedown = function () {
        console.log(parseInt(element.id));
        console.log(optionVotes);
        optionVotes[parseInt(element.id)]++;
        optionVotes.forEach((element) => {
          votesum += element;
        });

        revealVotes(optionVotes, votesum, allOptions);
        allOptions.forEach((el2) => {
          el2.onmousedown = function () {
            return 0;
          };
        });
      };
      i++;
    });
  }
}


loadPoll(POLL_ID);
