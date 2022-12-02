// let name = [
//     'jane','tom','qqqq'
// ];

// function play (item) {
//     console.log(item)
// }

// name.forEach(play);

const num = [];
const num02 = [];

for (let i=1;i<10;i++){
    num.push(i);
    for (let j=2;j<10;j++){
        num02.push(j);
    }
    
}
console.log(num);

let gugu = document.querySelector('.all-gugu div')

let play = (item) => {
    console.log(
        `${item}x${num02}=${item}`
    )
}

num.forEach(play);

gugu.addEventListener('click',play);
