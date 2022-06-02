const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector('#result');
const endPoint = 10;

const select = [0,0,0,0];

function addAnswer(answerText,qIdx,idx){
    var a = document.querySelector(".aBox");
    var answer = document.createElement("button"); //버튼 생성 
    
    //답변마다 클래스 추가 
    answer.classList.add('answerList');
    answer.classList.add('my-5');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');

    //버튼에 애니메이션 부가 
    answer.classList.add('fadeIn');
    //answer가 a에 소속될 수 있도록 만들어야함 
    a.appendChild(answer);
    answer.innerHTML = answerText;
    answer.addEventListener("click",function(){
        var children = document.querySelectorAll('.answerList');
        for(let i =0;i<children.length;i++){
            children[i].disabled= true; //버튼 비활성화 
            //버튼 사라지는 애니메이션 
            children[i].style.WebkitAnimation = 'fadeOut 0.5s';
            children[i].style.animation = 'fadeOut 0.5s';
        }
        //사라지는 순간 바로 none 되면 안됨 그래서 setTimeout 함수 
        setTimeout(()=>{
            //타겟 타입별 늘려주기 
            var target = qnaList[qIdx].a[idx].type;

            //타겟에 들어있는 모든 타입 1 씩 추가 
            for(let i =0;i<target.length;i++){
                select[target[i]]+=1
            }

            for(let i =0 ;i< children.length;i++){
                children[i].style.display= "none"; //버튼 안보이게 
            }
            goNext(++qIdx);
            },450)
        },false)
}

function calResult(){
    /* 전개구문 : 선택한 배열을 펼치게 해줌 
    최대값을 가지고 있는 인덱스를 반환해줌 */
    var result = select.indexOf(Math.max(...select)); // 셀렉트의 최대값 인덱스 
    return result;
}

function setResult(){
    let point = calResult();
    const resultNameIntro = document.querySelector('.resultIntro');
    resultNameIntro.innerHTML = infoList[point].nameIntro;

    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';

    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc1 = document.querySelector('.resultDesc1');
    const resultDescTitle1 = document.querySelector('.resultDescTitle1');
    resultDescTitle1.innerHTML = infoList[point].descTitle1;
    resultDesc1.innerHTML = infoList[point].desc1;
    
    const resultDesc2 = document.querySelector('.resultDesc2');
    const resultDescTitle2 = document.querySelector('.resultDescTitle2');
    resultDescTitle2.innerHTML = infoList[point].descTitle2;
    resultDesc2.innerHTML = infoList[point].desc2;
}
//결과로 가기 
function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    /* setTimeOut 함수 안에 있는 실행되고 인수로 초를 받아서 몇초뒤 실행할지  */
    setTimeout(()=>{
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            qna.style.display = "none";
            result.style.display = "block";
        },450);
       
    },450);
    setResult();
}

function goNext(qIdx){
    if(qIdx == endPoint){
        goResult();
        return;
    }

    var q = document.querySelector('.qBox');
    q.innerHTML= qnaList[qIdx].q;

    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer,qIdx,i); //질문 더하는 함수 
    }
    var countStatusNum = document.querySelector('.countStatus');
    countStatusNum.innerHTML = (qIdx+1)+"/"+endPoint;
    //상태바 
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint)*(qIdx+1)+"%"
}

function start(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    /* setTimeOut 함수 안에 있는 실행되고 인수로 초를 받아서 몇초뒤 실행할지  */
    setTimeout(()=>{
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            main.style.display = "none";
            qna.style.display = "block";
        },450);
        let qIdx = 0;
        goNext(qIdx);
    },450);
    
    
}

/* 메인이 사라지고 qna가 나오게 , 애니메이션을 추가해서 
키프레임형식으로 했음 . 크롬같은 경우 webkit 추가해야함 
타이머 추가해서 만들었음 
가장 중요한건 main, qna를 선택하는거 , 쿼리셀럭터로 가져옴  */


