function loadPlans(loadIn){


    if (loadIn===true)
    {
      anime.timeline({ loop: false }).add({
        targets: ".planItem",
        marginTop:10,
        easing: "easeOutExpo",
        duration: 2200,
        delay: (el, i) => 210 * i,
      });
    }
  
  }
  
  function swtichPages(page)
  {
  
    //displayNews(false)
  
    setTimeout(() => {loadPlans(true)}, 1800);
  
  
  }
  
  swtichPages("plani")