function isHidden(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function fadeOutAtvisible(){
    const section = document.getElementById("newCommentContent")

    if (isHidden(section))
    {
        anime.timeline({ loop: false }).add({
            targets: ".newCommentImage",
            opacity: 0,
            easing: "easeOutExpo",
            duration: 1000,
            delay: (el, i) => 20 * i,
          });
    }else{
        anime.timeline({ loop: false }).add({
            targets: ".newCommentImage",
            opacity: 1,
            easing: "easeOutExpo",
            duration: 1000,
            delay: (el, i) => 20 * i,
          });
    }
}


const scrollButton = document.getElementById("newCommentImage");
scrollButton.onmousedown = function () {
    window.scroll({
        top: 5000000,
        behavior: 'smooth'
      });
};

addEventListener("scroll", () => {fadeOutAtvisible()});

var textarea = document.getElementById("newCommentContent")
textarea.addEventListener("input", event => {
    const target = event.currentTarget;
    const currentLength = target.value.length;

    document.getElementById("counter").innerText=currentLength+'/200';
});