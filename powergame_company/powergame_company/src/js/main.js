//css
import "../css/reset.css";
import "../css/font.css";
import "../css/common.css";
import "../css/main_mobile.css";
import "../css/main_pc.css";

//Gsap
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

//AOS
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

// 모바일 주소창 높이 대응
function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setScreenSize();
window.addEventListener("resize", setScreenSize);

//새로고침시 복원 안하기
window.addEventListener("load", function () {
  history.scrollRestoration = "manual";
});

//Header
ScrollTrigger.create({
  start: "23% 6%",
  trigger: "body",
  toggleClass: { targets: "header", className: "active" },
  // markers: true,
});

//Video Section
function video_section() {
  const tl_intro = gsap.timeline({ defaults: { opacity: 0, duration: 0.3 } });
  tl_intro
    .from(".video-section", { ease: "linear", autoAlpha: 0 })
    .from(".black-box1", { x: -60 })
    .from(".main-text span, .scroll-icon", {}, "+=0.1")
    .from(".black-box4", { y: 60 }, "-=0.4")
    .from(".main-text b", {})
    .from(".black-box3", { y: -60 }, "-=0.4")
    .from(".black-box2", { x: 60 });
}

// video_seciton FOUC
window.addEventListener("load", function () {
  video_section();
});

const tl_black_box = gsap.timeline();

tl_black_box
  .to(".black-box1", { xPercent: -130, scale: 1.5 })
  .to(".black-box2", { xPercent: 130, scale: 1.5 }, "<")
  .to(".black-box3", { yPercent: -160, xPercent: -30, scale: 1.5 }, "<")
  .to(".black-box4", { yPercent: 140, scale: 1.5 }, "<")
  .to(".main-text span", { y: 100, opacity: 0 }, "<")
  .to(".main-text b", { y: -100, opacity: 0 }, "<")
  .to(".scroll-icon", { opacity: 0 }, "<");

ScrollTrigger.create({
  animation: tl_black_box,
  trigger: ".video-section",
  start: "top top",
  scrub: 1,
  end: "bottom",
  pin: true,
  // pinSpacing: false,
  // markers: true,
});

//Info Section
gsap.utils.toArray(".work-contents li").forEach((item) => {
  ScrollTrigger.create({
    trigger: item,
    start: "top 60%",
    end: "100% end",
    onEnter: () => item.classList.add("active"),
    // markers: true,
  });
});

gsap.utils.toArray(".game-contents li").forEach((item) => {
  ScrollTrigger.create({
    trigger: item,
    start: "top 55%",
    end: "100% end",
    onEnter: () => item.classList.add("active"),
    // markers: true,
  });
});

let startValue;
if (window.innerWidth < 1023) {
  startValue = "30% 40%";
} else {
  startValue = "30% 52%";
}

gsap.utils.toArray(".event-contents li").forEach((item) => {
  ScrollTrigger.create({
    trigger: item,
    start: startValue,
    end: "100% end",
    onEnter: () => item.classList.add("active"),
    // markers: true,
  });
});
