import "../css/reset.css";
import "../css/common.scss";
import "../css/main_mobile.scss";
import "../css/main_pc.scss";

//Animate
import "animate.css";

//Gsap
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

//새로고침시 복원 안하기
window.addEventListener("load", function () {
  history.scrollRestoration = "manual";
});

//Jquery
import $ from "jquery";

//로딩중
window.addEventListener("load", () => {
  document.body.classList.remove("before-load");
  $("#video-section .left-box").addClass("active");
  $("#video-section .right-box").addClass("active");
});
document.querySelector(".loading").addEventListener("transitionend", function () {
  this.remove();
});

//마우스 따라다니기
(function () {
  let $cursor = document.querySelector(".cursor");

  let xTo = gsap.quickTo($cursor, "x", { duration: 0.4, ease: "power3" }),
    yTo = gsap.quickTo($cursor, "y", { duration: 0.4, ease: "power3" });

  document.addEventListener("mousemove", ({ screenX: x, screenY: y }) => {
    xTo(x - $cursor.offsetWidth * 1);
    yTo(y - $cursor.offsetHeight * 1.5);
  });
})();

//popup common
$(".popup .close-btn").click(function () {
  $(".popup").removeClass("active");
  $("body").removeClass("popup-hidden");
});
$(document).mouseup(function (e) {
  var LayerPopup = $(".popup");
  if (LayerPopup.has(e.target).length === 0) {
    LayerPopup.removeClass("active");
    $("body").removeClass("popup-hidden");
  }
});

//Header
$(".trigger").click(function () {
  $(this).toggleClass("active");
  $(".menu-wrap").fadeToggle("active");
  $(".header-logo").toggleClass("active");
  $("body").toggleClass("hidden");
});
$("nav a, .header-logo a").click(function () {
  $(".trigger").removeClass("active");
  if (window.innerWidth < 1024) {
    $(".menu-wrap").fadeOut();
  }
  $(".header-logo").removeClass("active");
  $("body").removeClass("hidden");
});
ScrollTrigger.create({
  start: "2.3% 6%",
  trigger: "body",
  toggleClass: { targets: "header", className: "active" },
  // markers: true,
});

//aboutme-section
gsap.utils.toArray("#aboutme-section .text-box span").forEach((span) => {
  ScrollTrigger.create({
    trigger: span,
    start: "top 65%",
    onEnter: () => span.classList.add("active"),
    onLeaveBack: () => span.classList.remove("active"),
    // markers: true,
  });
});
gsap.to("#aboutme-section .img-box, #aboutme-section .text-box", {
  opacity: 1,
  duration: 0.3,
  scrollTrigger: {
    trigger: "#aboutme-section .inner",
    toggleActions: "restart none none reverse",
    onEnter: () =>
      $("#aboutme-section .animate-tag").each(function (index, item) {
        const name = $(item).attr("data-animate");
        $(this).addClass("animate__" + name);
      }),
    onLeaveBack: () =>
      $("#aboutme-section .animate-tag").each(function (index, item) {
        const name = $(item).attr("data-animate");
        $(this).removeClass("animate__" + name);
      }),
    start: "top 60%",
    // markers: true,
  },
});

//skill-section
$("#skill-section .skills li").click(function () {
  $(".skill-popup").addClass("active");
  const txt = $(this).find(".skill-info").text();
  $(".skill-popup .popup-info").text(txt);
  $("body").addClass("popup-hidden");
});

//portfolio-section
gsap.utils.toArray(".portfolio-list li").forEach((li) => {
  ScrollTrigger.create({
    trigger: li,
    start: "top 60%",
    onEnter: () => li.classList.add("active"),
    onLeaveBack: () => li.classList.remove("active"),
    // markers: true,
  });
});
$("#portfolio-section .notice").click(function () {
  $(".portfolio-popup").addClass("active");
  const txt = $(this).find(".detail-info").text();
  $(".portfolio-popup .popup-info").text(txt);
  $("body").addClass("popup-hidden");
});
