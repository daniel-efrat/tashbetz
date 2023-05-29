gsap.set("#drawer", { xPercent: 100 })
gsap.set(".curtain", { yPercent: -100 })
gsap.set(".mehashev", { x: "-100vw" })
gsap.set(".metashbetz", { x: "-100vw" })
let isOpen = false

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

function setqcount(n) {
  appdata.qcount = n
  saveData()
  location.reload()
}

function resetsettings() {
  localStorage.clear()
  location.reload()
}

function tsep(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function vtext(text) {
  var letters = /^[A-Za-z0-9]+$/
  if (text.match(letters)) return true
  else return false
}
function toggledrawer() {
  if (!isOpen) {
    gsap.to("#drawer", { xPercent: 0 })
    isOpen = true
  } else {
    gsap.to("#drawer", { xPercent: 100 })
    isOpen = false
  }
}
$(".fa-eye-slash").hide()
var canswershown = false
function toggleAnswer() {
  if (canswershown) {
    $(".canswer").hide()
    $(".uanswer").show()
    $(".fa-eye-slash").hide()
    $(".fa-eye").show()
    $(".solution").html("הצג פתרון")

    canswershown = false
  } else {
    $(".canswer").show()
    $(".uanswer").hide()
    $(".fa-eye-slash").show()
    $(".fa-eye").hide()
    $(".solution").html("הסתר פתרון")

    canswershown = true
  }
}
function activatetts() {
  $("td").each(function () {
    $(this).attr("tabindex", "0")
    $(this).attr("contentEditable", "true")

    $(this).on("keydown", function (event) {
      var key = event.key

      // Regular expression to detect a Hebrew character
      var hebrewCharRegex = /[\u0590-\u05FF]/

      // If the key is a single Hebrew letter (and not a control key), or the Backspace/Delete key
      if (
        (key.length === 1 && key.match(hebrewCharRegex)) ||
        key === "Backspace" ||
        key === "Delete"
      ) {
        // If a Hebrew letter key was pressed, replace the cell's content with the new letter.
        // If the Backspace or Delete key was pressed, clear the cell's content.
        $(this).text("")
        if (key.length === 1 && key.match(hebrewCharRegex)) {
          $(this).append(key)
        }
      }

      // Handle arrow keys for cell navigation
      if (
        key === "ArrowUp" ||
        key === "ArrowDown" ||
        key === "ArrowLeft" ||
        key === "ArrowRight"
      ) {
        var focused = $(":focus")
        switch (key) {
          case "ArrowUp":
            focused
              .closest("tr")
              .prev()
              .find("td:eq(" + focused.index() + ")")
              .focus()
            break
          case "ArrowDown":
            focused
              .closest("tr")
              .next()
              .find("td:eq(" + focused.index() + ")")
              .focus()
            break
          case "ArrowLeft":
            focused.next().focus()
            break
          case "ArrowRight":
            focused.prev().focus()
            break
        }
      }

      // Prevent propagation of the event, so the letter doesn't get appended twice (or deleted twice)
      event.preventDefault()
    })
  })
}

var selectedua = -1
function typechar(c) {
  $("#" + selectedua).html(c)
  $("#vkeyboard").hide()
}

function initvkeyboard() {
  var chars = [
    "א",
    "ב",
    "ג",
    "ד",
    "ה",
    "ו",
    "ז",
    "ח",
    "ט",
    "י",
    "כ",
    "ל",
    "מ",
    "נ",
    "ס",
    "ע",
    "פ",
    "צ",
    "ק",
    "ר",
    "ש",
    "ת",
  ]
  for (var i = 0; i < chars.length; i++) {
    $("#kbtnlist").append(
      "<div class='kbtn' onclick=typechar('" +
        chars[i] +
        "')>" +
        chars[i] +
        "</div>"
    )
  }
}
setTimeout(function () {
  startttsgame()
  activatetts()
  initvkeyboard()
  $("#crossword").css({
    width: $("tbody:eq(0)").find("tr:eq(0)").find("td").length * 32 + "px",
  })
  $("#game").show()
}, 500)
