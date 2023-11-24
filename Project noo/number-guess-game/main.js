//랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호가 < 유저번호 Down!!
//랜덤번호가 > 유저번호 Up!!
//Reset버튼을 누르면 게임이 리셋된다.
//5번의 기회를 다쓰면 게임이 끝난다 ( 더이상 추측 불가, 버튼이 disable)
//유저가 1~100범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깎지 않는다.


let computerNum = 0;
let playButton = document.getElementById("play-button");
    //document는 웹사이트 그 자체.
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5
let gameOver = false
let chanceArea = document.getElementById("coin");
let history = [] //배열로 만들어주는 이유는, 값이 여러개가 들어갈것이기때문

playButton.addEventListener("click",play);
//(이벤트 이름, 이벤트발생시 실행함수)
//함수도 매게변수로 넘길 수 있음.

userInput.addEventListener("focus", function(){
    userInput.value = "";
}); // userInput.addEventListener("focus",textreset); 83~85번째줄
//익명의 함수를 사용함. 왜냐하면, 위 함수는 이벤트의 발생만을 목적으로 하여 크게 여러 내용이
//들어있지 않기 때문에 굳이 함수이름을 선언하지 않아도 된다.(선언하면 메모리만 차지)
//사용할 조건은, 위 함수가 다른곳에 사용되지 아니하고, 로직이 단순할때만 사용


resetButton.addEventListener("click",reset);

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100)+1; 
    //Math.floor() 소수점을 버리고 나머지만 보여줌 
    //Math.random() 0~1사이의 난수를 랜덤생성
    //마지막에 +1을 한 이유 : 랜덤난수는 0~1까지를 생성하지만 1은 포함이 되지않는다.
    //생성해야할 조건은 1~100인데, 랜덤난수로는 99까지만 생성할 수 있으므로, 마지막에 +1을 붙여준것.
    console.log("정답", computerNum);
}

function play() {
    let userValue = userInput.value;

    if(userValue<1 || userValue>100){
        resultArea.textContent="1과 100사이 숫자를 입력해주세요"
        event.preventDefault();
        return;
    }

    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력하세요";
        event.preventDefault();
        return;
    }
    chances --;
    chanceArea.textContent = `남은 기회:${chances}`;
    console.log("chances",chances);

    //value : userInput.의 값
    if(userValue < computerNum){
        resultArea.textContent = "Up!!"
        
    }else if(userValue > computerNum){
        resultArea.textContent = "Down!!"
        
    }else {
        resultArea.textContent = "정답!!"
        gameOver=true;
    }

    history.push(userValue); //입력한 결과값을 history라는 변수에게 보낸다.
    console.log(history);

    if(chances < 1){
        gameOver = true;
    }

    if (gameOver == true) {
        playButton.disabled = true;
    }
    event.preventDefault();
}

// function textreset() {
//     userInput.value = "";
// } 27번째줄

function reset() {
    userInput.value = "";
    // user input창이 깨끗하게 정리되고
    pickRandomNum();
    //새로운 번호가 생성되고
    chanceArea.textContent = "남은 기회:5";

    resultArea.textContent = "결과값이 여기에 나옵니다.";
}

pickRandomNum();

console.log(play());
