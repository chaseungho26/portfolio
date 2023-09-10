import "../css/reset.css";
import "../css/common.scss";
import "../css/main_mobile.scss";
import "../css/main_pc.scss";

//Fullpage
import fullpage from "fullpage.js";

//Animate
import "animate.css";

//Jquery
import $ from "jquery";

// 모바일 주소창 높이 대응
function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setScreenSize();
window.addEventListener("resize", setScreenSize);

//////Fullpage///////
$("#fullpage").fullpage({
  autoScrolling: true,
  responsiveWidth: 1023, //1023 미만일때 해제
  anchors: ["section1", "section2", "section3", "section4", "section5"],
  afterLoad: function () {
    if (window.innerWidth > 1023) {
      //Animate
      const item = $(this).find(".animate-tag");
      const animation_array = [];
      const delay_array = [];
      const duration_array = [];
      for (let i = 0; i < item.length; i++) {
        const animation_name = $(item[i]).attr("data-animate");
        const animation_delay = $(item[i]).attr("data-delay");
        const animation_duration = $(item[i]).attr("data-duration");
        animation_array.push(animation_name);
        delay_array.push(animation_delay);
        duration_array.push(animation_duration);
        $(item[i]).addClass(`animate__${animation_array[i]}`);
        $(item[i]).css("animation-delay", `${delay_array[i]}s`);
        $(item[i]).css("animation-duration", `${duration_array[i]}s`);
      }
      $(this).addClass("motion");
    }
  },
  onLeave: function (leave, enter) {
    if (window.innerWidth > 1023) {
      //Animate
      if (leave <= 4 && enter <= 4) {
        setTimeout(() => {
          const item = $(this).find(".animate-tag");
          const animation_array = [];
          for (let i = 0; i < item.length; i++) {
            const animation_name = $(item[i]).attr("data-animate");
            animation_array.push(animation_name);
            $(item[i]).removeClass(`animate__${animation_array[i]}`);
          }
        }, 400);
      }

      //Fullpage Navigation
      const fp_nav_box = $(".fp_nav_box");
      const fp_nav_border = $(".fp_nav_box .current-border");
      $(".fp_nav_box li").removeClass("current");
      if (enter === 2) {
        $(fp_nav_box).addClass("active");
        $(fp_nav_border).css("top", "0");
        $(".fp_nav_box .microbiome").addClass("current");
      } else if (enter === 3) {
        $(fp_nav_box).addClass("active");
        $(fp_nav_border).css("top", `${fp_nav_border.outerHeight()}px`);
        $(".fp_nav_box .health").addClass("current");
      } else if (enter === 4) {
        $(fp_nav_box).addClass("active");
        $(fp_nav_border).css("top", `${fp_nav_border.outerHeight() * 2}px`);
        $(".fp_nav_box .natural").addClass("current");
      } else if (enter === 1 || enter === 5) {
        $(fp_nav_box).removeClass("active");
      }

      setTimeout(() => {
        $(this).removeClass("motion");
      }, 400);
    }
  },
});

//Header

$(".language").click(function () {
  $(this).toggleClass("active");
});

$("#fullpage").click(function () {
  $(".language").removeClass("active");
});

$(".menu-trigger").click(function () {
  $(".menu-wrap").addClass("active");
  $("body").addClass("hidden");
});

$(".close-btn").click(function () {
  $(".menu-wrap").removeClass("active");
  $("body").removeClass("hidden");
});
