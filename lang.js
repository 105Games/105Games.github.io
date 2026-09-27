// One language at a time: ?lang=en|ar wins, then the saved choice, then the browser's language.
(function () {
  var html = document.documentElement;
  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "ar" || q === "en") return q;
    try { var s = localStorage.getItem("lang"); if (s === "ar" || s === "en") return s; } catch (e) {}
    return (navigator.language || "en").toLowerCase().indexOf("ar") === 0 ? "ar" : "en";
  }
  function apply(l) {
    html.setAttribute("lang", l);
    html.setAttribute("dir", l === "ar" ? "rtl" : "ltr");
    try { localStorage.setItem("lang", l); } catch (e) {}
  }
  apply(pick());
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lang]");
    if (b) apply(b.getAttribute("data-lang"));
  });
})();
