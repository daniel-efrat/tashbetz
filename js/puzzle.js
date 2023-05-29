var appdata = {
  maincolor: "2a797a",
  qcount: 5,
}

if (localStorage.getItem("ttsasyik") === null) {
  saveData()
} else {
  appdata = JSON.parse(localStorage.getItem("ttsasyik"))
}

function saveData() {
  localStorage.setItem("ttsasyik", JSON.stringify(appdata))
}

function startttsgame() {
  const tl = gsap.timeline()

  tl.to(".curtain", { yPercent: 0, duration: 0 })
    .to(".c", { x: "100vw", stagger: 0.1 })
    .to(".c", { x: "-100vw" }, "+=.25")
    .to(".lds-grid", { rotate: 360 }, "-=.5")
    .to(".cc", { x: "100vw", stagger: 0.1 })
    .to(".lds-grid", { rotate: 720 }, "+=.25")
    .to(".curtain", { yPercent: -100 })
    .to(".cc", { x: "-100vw" }, "+=.25")
  // words[i] correlates to clues[i]
  var words = []
  var clues = []

  for (var i = 0; i < appdata.qcount; i++) {
    var rn = genrandom(ttss.length - 1)
    var q = ttss[rn]
    words.push(q.word)
    clues.push(q.clue)
    ttss.splice(rn, 1)
  }

  function genrandom(maxnum) {
    return Math.floor(Math.random() * maxnum)
  }

  // Create crossword object with the words and clues
  var cw = new Crossword(words, clues)

  // create the crossword grid (try to make it have a 1:1 width to height ratio in 10 tries)
  var tries = 30
  var grid = cw.getSquareGrid(tries)

  // report a problem with the words in the crossword
  if (grid == null) {
    var bad_words = cw.getBadWords()
    var str = []
    for (var i = 0; i < bad_words.length; i++) {
      str.push(bad_words[i].word)
    }
    //alert("Shoot! A grid could not be created with these words:\n" + str.join("\n"));
    location.reload()
    return
  }

  // turn the crossword grid into HTML
  var show_answers = true
  document.getElementById("crossword").innerHTML = CrosswordUtils.toHtml(
    grid,
    show_answers
  )

  // make a nice legend for the clues
  var legend = cw.getLegend(grid)
  addLegendToPage(legend)

  function addLegendToPage(groups) {
    for (var k in groups) {
      var html = []
      for (var i = 0; i < groups[k].length; i++) {
        html.push(
          "<li><strong>" +
            groups[k][i]["position"] +
            ".</strong> " +
            groups[k][i]["clue"] +
            "</li>"
        )
      }
      document.getElementById(k).innerHTML = html.join("\n")
    }
  }
}
