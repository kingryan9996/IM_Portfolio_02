console.log('안녕하세요');

const apple = document.getElementById("company-info");

let mouseover = () => {
    apple.style = "border:5px solid yellow;"
    // console.log('반갑습니다.');
}

let mouseout = () => {
    apple.style = "border:none;"
    // console.log('반갑습니다.');
}

apple.addEventListener("mouseover",mouseover);
apple.addEventListener("mouseout",mouseout);

let hide = () => {
    // console.log(window.pageYOffset)
    let hoc = document.getElementsByTagName("header")[0];
    let i = window.pageYOffset;
    // Math.floor(
    //     document.querySelector("body").scrollHeight        
    // )
    // console.log(i);
    // ((document.querySelector("body").scrollTop /
    //     (document.querySelector("body").scrollHeight - 
    //         document.querySelector("body").clientHeight)) * 100);
            
    // i>0?(hoc.style.add = border:5px solid yellow:false
    // console.log(i>0?true:false);
    i>0?hoc.style.backgroundColor = '#000':hoc.style.backgroundColor = 'transparent';
}

// window.innerHeight>0?.style = "background-color:#000;":false;

window.addEventListener('scroll',hide);






// let player = (e) => {
//     lia.innerHTML = "<div>adwwe</div>";
// }