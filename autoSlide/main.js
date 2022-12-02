var slides = document.querySelector(".slides"),
  slide = document.querySelectorAll(".slides li"),
  slideCount = slide.length,
  slideWidth = slide[0].offsetWidth,
  slideMargin = 20,
  moveAmt = slideWidth + slideMargin,
  maxSlides = 3,
  prevBtn = document.querySelector(".prev"),
  nextBtn = document.querySelector(".next");

var currentIdx = 0;



//복사본생성
//돌아갈때 트렌지션 삭제
// <<  ㅣㅣ >  >>
//앞뒤 클론생성


function play () {
    for (let i = 0; i < maxSlides + 2; i++) {
        let cloneSlide = slide[i].cloneNode(true);
        cloneSlide.classList.add("clone");
        slides.appendChild(cloneSlide);
        
      
          for (let i = slideCount -5; i >= 0; i--) {
            let cloneSlide = slide[i].cloneNode(true);
            cloneSlide.classList.add("clone");
            slides.prepend(cloneSlide);
          }
      }
}

// 가로배열
// function slideLayout() {
//   let newslide = document.querySelectorAll(".slides li");
//   newslide.forEach(function (item, index) {
//     item.style.left = moveAmt * index + "px";
//   });
// }
// slideLayout();

// 중앙배치
// function setSlide() {
//   let ulMoveAmt = -slideCount * moveAmt + "px";
//   slides.style.transform = "translateX(" + ulMoveAmt + ")";
//   slides.classList.add("animated");
// }
//좌우버튼이동
nextBtn.addEventListener("click", function () {
  console.log("aaa");
  moveSlide(currentIdx + 1);
});
prevBtn.addEventListener("click", function () {
  moveSlide(currentIdx - 1);
});

//moveSlide함수
function moveSlide(num) {
  slides.style.left = moveAmt * -num + "px";
  currentIdx = num;
  console.log(currentIdx, slideCount);
    // num = currentIdx;
    // currentIdx = 6;
//   slide.style.left = slide.style.left;

  if (currentIdx == slideCount || currentIdx == -slideCount) {
    setTimeout(function () {
        slides.classList.remove("animated");
        slides.style.left = "0px";
    //   currentIdx = 0;
    
    }, 600);

    setTimeout(function () {
    //   slides.classList.add("animated");
    }, 600);
    
  }
  
}
//자동슬라이드

var timer = undefined;
var slideWrapper = document.querySelector(".slide_wraper");

function autoSlide() {
  if (timer == undefined) {
    timer = setInterval(function () {
      moveSlide(currentIdx + 1);
    }, 3000);
    timer = undefined;
  }
  play();
}

autoSlide();

function stopSlide() {
  clearInterval(timer);
  timer = undefined;
}

// slideWrapper.addEventListener("mouseenter", function () {
//   stopSlide();
// });
// slideWrapper.addEventListener("mouseleave", function () {
//   autoSlide();
// });

//반응형 슬라이드

// window.addEventListener("resize", function () {
//   this.clearInterval(timer);
//   var currentWidth = this.document.body.offsetWidth;
//   if (currentWidth < 700) {
//     var slidesWidth = slide.offsetWidth;
//     var slideWidth = slidesWidth - (responsiveMargin * maxSlides - 1) / 3;
//     moveAmt = responsiveMargin + slideWidth;

//     var newSlide = document.querySelectorAll(".slides > li");

//     newSlide.forEach(function (item, index) {
//       item.style.width = slideWidth + "px";
//     });
//   }

//   slideLayout();
//   setSlide();
//   this.clearInterval(timer);
// });
