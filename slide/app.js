const slides = document.querySelector('.slide'),
slide = document.querySelectorAll('.slide li'),
currentIdx = 0,
slideCount = slide.length,
slideWidth = 200,
slideMargin = 20;

makeClone ();

function makeClone(){
    for (let i = 0;i<slideCount;i++){
        let cloneSlide = slide[i].cloneNode(true);
        // cloneSlide.classList.add('clone');
        slides.appendChild(cloneSlide);
    }
    for (let i = slideCount -1;i>=0;i--){
        let cloneSlide = slide[i].cloneNode(true);
        // cloneSlide.classList.add('clone');
        slides.prepend(cloneSlide);
    }

    updateWidth();
}

function updateWidth(){
    let currentSlides = slide;
    let newSlideCount = currentSlides.length;

    let newWidth = (slideWidth+slideMargin)*newSlideCount - slideMargin+'px';
    slides.style.width = newWidth;
}

let p = document.getElementById('slide02')

let o = p.pageXClient;
let t = window.pageYClient;

let i = window.pageXOffset;

console.log(i);
console.log(o);

var target = document.getElementById("slide02");

var targetTop = target.getBoundingClientRect().top;

var abTop = window.pageYOffset + target.getBoundingClientRect().top;

console.log(abTop);

var div = document.getElementById("slide02");
var divTop = div.getBoundingClientRect().top;
var divBottom = div.getBoundingClientRect().bottom;
var divLeft = div.getBoundingClientRect().left;
var divRight = div.getBoundingClientRect().right;

console.log(divTop)
console.log(divBottom)
console.log(divLeft) //요소의 브라우저기준 왼쪽값
console.log(divRight)

if(0>divLeft){
    makeClone ();
}