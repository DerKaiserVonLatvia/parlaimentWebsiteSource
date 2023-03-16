function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

var CURRENTPAGE = "home";

function fadeOutAtvisible() {
  const section = document.getElementById("newCommentContent");

  if (isHidden(section)) {
    anime.timeline({ loop: false }).add({
      targets: ".newCommentImage",
      opacity: 0,
      easing: "easeOutExpo",
      duration: 1000,
      delay: (el, i) => 20 * i,
    });
  } else {
    anime.timeline({ loop: false }).add({
      targets: ".newCommentImage",
      opacity: 1,
      easing: "easeOutExpo",
      duration: 1000,
      delay: (el, i) => 20 * i,
    });
  }
}

function isHidden(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const LOCATION = location.href;

function transitionScreen() {
  let whitePanel = document.getElementById("whiteBody");

  whitePanel.style.animation =
    "screenTransition cubic-bezier(.5, .1, .5, .1) 1.5s 1 forwards";
}

var beginButton = document.getElementById("beginButton");
var oldMousedown = beginButton.onmousedown;
beginButton.onmousedown = function () {
  transitionScreen();
  animateText();
  if (oldMousedown) oldMousedown();
};

var commentButton = document.getElementById("commentButton");
commentButton.onmousedown = function () {
  switchPages("comments");
};

var planiButton = document.getElementById("planiButton");
planiButton.onmousedown = function () {
  switchPages("plani");
};

var infoButton = document.getElementById("infoButton");

infoButton.onmousedown = function () {
  switchPages("info");
};


function setButtons(on) {
  if (on) {
    commentButton = document.getElementById("commentButton");
    commentButton.onmousedown = function () {
      switchPages("comments");
    };

    planiButton = document.getElementById("planiButton");
    planiButton.onmousedown = function () {
      switchPages("plani");
    };

    var infoButton = document.getElementById("infoButton");

    infoButton.onmousedown = function () {
      switchPages("info");
    };
  } else {
    infoButton = null;
    commentButton = null;
    planiButton = null;
  }
}

beginButton.onmouseenter = function () {
  onHover(true);
};
beginButton.onmouseleave = function () {
  onHover(false);
};

function onHover(enter) {
  // Wrap every letter in a span

  var textWrapper = document.querySelector(".openButton");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  let size = 20;
  if (enter) {
    size = 23;
  }
  anime.timeline({ loop: false }).add({
    targets: ".openButton .letter",
    fontSize: size,
    easing: "easeOutExpo",
    duration: 100,
    delay: (el, i) => 40 * i,
  });
}

function fetchHtml(htmlTitle) {
  var html = "";
  if (htmlTitle === "plans") {
    html = `
    <div class="planTab">

    <button class="backButton" id="backButton" onclick="switchPages('home')">
      Atpakaļ
    </button>

      <div class="planItem">
        <span class="planHeading">
          PlanHeading
        </span>
        <p class="planDetails">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        </p>
      </div>
      <div class="planItem">
        <span class="planHeading">
          PlanHeading
        </span>
        <p class="planDetails">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        </p>
      </div>
      <div class="planItem">
      <span class="planHeading">
        PlanHeading
      </span>
      <p class="planDetails">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      </p>
    </div>
    <div class="planItem">
    <span class="planHeading">
      PlanHeading
    </span>
    <p class="planDetails">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    </p>
  </div>
      </div>
    `;
  } else if (htmlTitle === "comments") {
    html = `
    <div class="newComment">
    <img class="newCommentImage" id="newCommentImage" src="images/newComment.png"/>
</div>

<div class="commentsZone">
<button class="backButton" id="backButton" onclick="switchPages('home')">
Atpakaļ
</button>
    <div class="comment">
        <p class="commentContent">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>    

        <p class="commentAuthor">
            Author123
        </p>
        <p class="commentDate">
            01/01/2005
        </p>
    </div>

    <div class="comment">
        <p class="commentContent">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>    

        <p class="commentAuthor">
            Author123
        </p>
        <p class="commentDate">
            01/01/2005
        </p>
    </div>

    <div class="comment">
        <p class="commentContent">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>    

        <p class="commentAuthor">
            Author123
        </p>
        <p class="commentDate">
            01/01/2005
        </p>
    </div>
</div>
<div class="commentCreate" id="createComments">
    <p class="commentCreateInfo">
        Katrs atsūtīts komentārs tiks pārbaudīts.
    </p>
    <textarea maxlength="200" class="mainCommentInput" id="newCommentContent"></textarea>
    <span class="symbolCounter" id="counter">0/200</span>
    <p class="info">
        Kā Jūs saukt?
    </p>
    <input type="text" class="commentName" id="newCommentName"/>
    <button class="sendComment">Sūtīt</button>
</div>
<script>
console.log("aaa");
</script>
    `;
  } else if (htmlTitle === "info") {
    html = `
    <div class="centerButton">
    <button class="backButton" id="backButton" onclick="switchPages('home')">
Atpakaļ
</button>
</div>
    <div class="information">
    <h2 class="infoTitle">
        Īsi par mums:
    </h2>
    <p class="informationAboutParlaiment">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    
    <h2 class="membersTitle">
        Parlamenta biedri:
    </h2>
    <ul class="members">
    <li><span class="name">Evelīna Danileviča</span> - <span class="position">pašparvaldes prezidents</span></li>
    <li><span class="name">Evelīna Danileviča</span> - <span class="position">pašparvaldes prezidents</span></li>
    <li><span class="name">Evelīna Danileviča</span> - <span class="position">pašparvaldes prezidents</span></li>
    <li><span class="name">Evelīna Danileviča</span> - <span class="position">pašparvaldes prezidents</span></li>
    <li><span class="name">Evelīna Danileviča</span> - <span class="position">pašparvaldes prezidents</span></li>
    <li><span class="name">Evelīna Danileviča</span> - <span class="position">pašparvaldes prezidents</span></li>
    <li><span class="name">Evelīna Danileviča</span> - <span class="position">pašparvaldes prezidents</span></li>
    <li><span class="name">Evelīna Danileviča</span> - <span class="position">pašparvaldes prezidents</span></li>
    <li><span class="name">Evelīna Danileviča</span> - <span class="position">pašparvaldes prezidents</span></li>
    <li><span class="name">Evelīna Danileviča</span> - <span class="position">pašparvaldes prezidents</span></li>
    </ul>
</div>`;
  } else if (htmlTitle === "home") {
    html = `
    <div class="buttons">
    <div class="menuButton" id="infoButton">Informācija</div>
    <div class="menuButton" id="commentButton">Komentāri</div>
    <div class="menuButton" id="planiButton">Plāni</div>
  </div>
  <div class="newsElementGroup">
    <div class="newsElement">
      <div class="newsHeading">
        <a>Poll test</a>
      </div>

      <div class="newsDesc">
        Aktuālako ziņu apraksts aisusdgaledecuiacyfkef dufhlcsdfl
        ufigSCFNGSDKjgf OSDfglsug
      </div>

      <div class="newsImage">
        <img class="mainImageDesc" src="images/polls.png" />
      </div>
    </div>
    <div class="newsElement">
      <div class="newsHeading">
        <a>Aktuālakas Ziņas</a>
      </div>

      <div class="newsDesc">
        Aktuālako ziņu apraksts aisusdgaledecuiacyfkef dufhlcsdfl
        ufigSCFNGSDKjgf OSDfglsug
      </div>

      <div class="newsImage">
        <img class="mainImageDesc" src="images/logog.png" />
      </div>
    </div>
    <div class="newsElement">
      <div class="newsHeading">
        <a>Aktuālakas Ziņas</a>
      </div>

      <div class="newsDesc">
        Aktuālako ziņu apraksts aisusdgaledecuiacyfkef dufhlcsdfl
        ufigSCFNGSDKjgf OSDfglsug
      </div>

      <div class="newsImage">
        <img class="mainImageDesc" src="images/logog.png" />
      </div>
    </div>
  </div>
</div>
    `;
  }
  return html;
}

function animateText() {
  beginButton.onmouseleave = function () {
    return false;
  };
  beginButton.onmouseenter = function () {
    return false;
  };

  beginButton.onmousedown = function () {
    return false;
  };

  // Wrap every letter in a span
  var textWrapper = document.querySelector(".openButton");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  anime.timeline({ loop: false }).add({
    targets: ".openButton .letter",
    fontSize: 0,
    easing: "easeOutExpo",
    duration: 1500,
    delay: (el, i) => 30 * i,
  });

  setTimeout(() => {
    displayNews(true);
  }, 1800);
}

function displayNews(animateIn) {//DISPLAY NEWS
  console.log(animateIn);

  if (animateIn === true) {
    let container = document.getElementById("mainSection");
    if (container.innerHTML.length < 10) {
      console.log("b");
      let html = fetchHtml("home");
      container.innerHTML = html;
      setButtons(true);

      beginButton = null;
    } else {
      beginButton.style.zIndex = "-10";
    }

    anime.timeline({ loop: false }).add({
      targets: ".newsElement",
      right: 10,
      easing: "easeOutExpo",
      duration: 1000,
      delay: (el, i) => 200 * i,
    });
    anime.timeline({ loop: false }).add({
      targets: ".menuButton",
      left: 10,
      easing: "easeOutExpo",
      duration: 1000,
      delay: (el, i) => 200 * i,
    });
  } else {
    anime.timeline({ loop: false }).add({
      targets: ".newsElement",
      right: -1750,
      easing: "easeInExpo",
      duration: 1000,
      delay: (el, i) => 200 * i,
    });
    anime.timeline({ loop: false }).add({
      targets: ".menuButton",
      left: -1000,
      easing: "easeInExpo",
      duration: 1000,
      delay: (el, i) => 200 * i,
    });
    setButtons(false);
    setTimeout(() => {
      console.log("ab");
      document.getElementById("mainSection").innerHTML = "";
    }, 2000);
  }

  body.style = "overflow: auto";
}

function loadInfo(loadIn) {
  if (loadIn === true) {
    let domInser = fetchHtml("info");

    if (domInser) {
      document.getElementById("infoSection").innerHTML += domInser;
    } else {
      throw new Error("No file was detected");
    }

    var targets = [
      ".infoTitle",
      ".informationAboutParlaiment",
      ".membersTitle",
      ".members",
      ".backButton",
    ];

    targets.forEach((element) => {
      if (element !== ".backButton") {
        anime.timeline({ loop: false }).add({
          targets: element,
          opacity: 1,
          easing: "easeOutExpo",
          duration: 1000,
          delay: (el, i) => 20 * i,
        });
      } else {
        anime.timeline({ loop: false }).add({
          targets: element,
          marginTop: 10,
          easing: "easeOutExpo",
          duration: 1000,
          delay: (el, i) => 20 * i,
        });
      }
    });
  } else {
    var targets = [
      ".infoTitle",
      ".informationAboutParlaiment",
      ".membersTitle",
      ".members",
      ".backButton",
    ];

    targets.forEach((element) => {
      if (element !== ".backButton") {
        anime.timeline({ loop: false }).add({
          targets: element,
          opacity: 0,
          easing: "easeOutExpo",
          duration: 1000,
          delay: (el, i) => 20 * i,
        });
      } else {
        anime.timeline({ loop: false }).add({
          targets: element,
          marginTop: -2000,
          easing: "easeOutExpo",
          duration: 1000,
          delay: (el, i) => 20 * i,
        });
      }
    });
    setTimeout(() => {
      document.getElementById("infoSection").innerHTML = "";
    }, 1200);
  }
}

function loadPlans(loadIn) {
  if (loadIn === true) {
    let domInser = fetchHtml("plans");
    if (domInser) {
      document.getElementById("planSection").innerHTML += domInser;
    } else {
      throw new Error("No file was detected");
    }
    var targets = [".planItem", ".backButton"];
    targets.forEach((element) => {
      anime.timeline({ loop: false }).add({
        targets: element,
        marginTop: 10,
        easing: "easeOutExpo",
        duration: 2000,
        delay: (el, i) => 200 * i,
      });
    });
  } else {
    var targets = [".planItem", ".backButton"];
    targets.forEach((element) => {
      anime.timeline({ loop: false }).add({
        targets: element,
        marginTop: -2000,
        easing: "easeInExpo",
        duration: 1000,
        delay: (el, i) => 200 * i,
      });
    });
    setTimeout(() => {
      document.getElementById("planSection").innerHTML = "";
    }, 1800);
  }
}

function loadComments(loadIn) {
  if (loadIn === true) {
    let domInser = fetchHtml("comments");

    if (domInser) {
      document.getElementById("commentSection").innerHTML += domInser;
    } else {
      throw new Error("No file was detected");
    }

    var targets = [".comment", ".commentCreate", ".backButton"];
    targets.forEach((element) => {
      anime.timeline({ loop: false }).add({
        targets: element,
        marginTop: 10,
        easing: "easeOutQuint",
        duration: 2000,
        delay: (el, i) => 50 * i,
      });
    });
    const scrollButton = document.getElementById("newCommentImage");
    scrollButton.onmousedown = function () {
      window.scroll({
        top: 5000000,
        behavior: "smooth",
      });
    };

    onscroll = function () {
      fadeOutAtvisible();
    };

    var textarea = document.getElementById("newCommentContent");
    textarea.oninput = function () {
      const target = event.currentTarget;
      const currentLength = target.value.length;

      document.getElementById("counter").innerText = currentLength + "/200";
    };
  } else {
    var targets = [".comment", ".commentCreate", ".backButton"];

    targets.forEach((element) => {
      anime.timeline({ loop: false }).add({
        targets: element,
        marginTop: -2000,
        easing: "easeInExpo",
        duration: 1500,
        delay: (el, i) => 50 * i,
      });
    });

    setTimeout(() => {
      document.getElementById("commentSection").innerHTML = "";
    }, 1800);
  }
}

function moveSchoolLogo(moveIn) {
  if (moveIn) {
    anime.timeline({ loop: false }).add({
      targets: ".skolasLogo",
      opacity: 1,
      easing: "easeOutExpo",
      duration: 2000,
      delay: (el, i) => 20 * i,
    });
  } else {
    anime.timeline({ loop: false }).add({
      targets: ".skolasLogo",
      opacity: 0.1,
      easing: "easeOutExpo",
      duration: 2000,
      delay: (el, i) => 20 * i,
    });
  }
}

function switchPages(page) {
  //displayNews(false)

  console.log("a");
  if (page == "home") {
    if (CURRENTPAGE === "plans") {
      loadPlans(false);
    } else if (CURRENTPAGE === "comments") {
      loadComments(false);
    } else if (CURRENTPAGE === "info") {
      loadInfo(false);
    }

    setTimeout(() => {
      displayNews(true);
    }, 1800);
    setTimeout(() => {
      moveSchoolLogo(true);
    }, 1800);
    CURRENTPAGE = "home";
  }

  if (page == "plani" && CURRENTPAGE !== "plans") {
    CURRENTPAGE = "plans";

    displayNews(false);

    setTimeout(() => {
      loadPlans(true);
    }, 1800);
    setTimeout(() => {
      moveSchoolLogo(false);
    }, 1800);
  }

  if (page == "comments" && CURRENTPAGE !== "comments") {
    CURRENTPAGE = "comments";

    displayNews(false);

    setTimeout(() => {
      loadComments(true);
    }, 1800);

    setTimeout(() => {
      moveSchoolLogo(false);
    }, 1800);
  }
  if (page === "info" && CURRENTPAGE !== "info") {
    CURRENTPAGE = "info";
    displayNews(false);

    setTimeout(() => {
      loadInfo(true);
    }, 1800);
  }
}
