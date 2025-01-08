console.log('dfghjk')let question_field = document.querySelector('.question')
let answer_buttons = document.querySelectorAll('.answer')
let container_h3 = document.querySelector('.container-h3')
let container_start = document.querySelector('.container-start')
let start_btn = document.querySelector('.start-btn')
let container_main = document.querySelector('.container')

function randint(min,max){
    return Math.round(Math.random() * ( max - min) + min)
}

let signs = ['+','-','*','/']
function getRandomSign(){
    return signs[randint(0,3)]
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {  // Цикл проходиться по всіх елементах з кінця до початку
    let j = Math.floor(Math.random() * (i + 1));  // Вибираємо індекс рандомного елемента
    [array[i], array[j]] = [array[j], array[i]] // Міняємо місцями з поточним елементом.
  } 
}

let cookie = false
let cookies = document.cookie.split(';')
console.log(cookies)
for(let i = 0;i<cookies.length;i++){
    if(cookies[i].split('=')[0] == 'score'){
        cookie = cookies[i].split('=')[1]
        break
    }
}
if(cookie){
    let data = cookie.split('/')
    container_h3.innerHTML = `Минулого разу ви дали ${data[1]}правильних відповідей із ${data[0]}.Точність - ${Math.round(data[1]*100/data[0])}%`

}

class Question {
    constructor(question, answer_1, answer_2, correct, answer_4, answer_5 ){
        let a = randint(1,30)
        let b = randint(1,30)
        let randomSign = getRandomSign()
        this.question = `${a} ${randomSign} ${b}`
        

        if(randomSign == '+'){
            this.correct = a+b
        }
        if(randomSign == '-'){
            this.correct = a-b
        }
        if(randomSign == '*'){
            this.correct = a*b
        }
        if(randomSign == '/'){
            this.correct = a/b
        }
        this.answers = [
            randint(this.correct - 15,this.correct + 1),
            randint(this.correct - 15,this.correct + 1),
            this.correct,
            randint(this.correct - 15,this.correct + 1),
            randint(this.correct - 15,this.correct + 1),
        ]
        shuffle(this.answers)
    }
    display(){
        question_field.innerHTML = this.question
        for(let i = 0;i < this.answers.length;i++){//i = i + 1
            answer_buttons[i].innerHTML = this.answers[i]
               
        }
    }
}

// let current_questions = [
//     new Question('40+15','45','50','55','60','65'),
//     new Question('25+22','45','55','47','70','40'),
//     new Question('40-15','45','20','25','22','30'),
//     new Question('20-25','45','50','-5','-10','0'),
//     new Question('60+30','100','95','90','65','75'),
// ]
container_main.style.display = 'none'
let correct_answers_given = 0
let total_answers_given = 0
let current_question
let time = 10
let timer = document.querySelector('.time');

start_btn.addEventListener('click', function(){
    // start_btn.style.boxShadow ="-10px -8px 5px #9c9c9c" 
    container_start.style.display = 'none'
    container_main.style.display = 'flex'
    current_question = new Question()
    current_question.display()
    correct_answers_given = 0
    total_answers_given = 0
    time = 10
    timer.innerHTML = time
    let interval = setInterval(() => {
        time--;
        timer.innerHTML = time
    },1000)
    setTimeout(function(){
        clearInterval(interval)
        let new_cookie = `score=${total_answers_given}/${correct_answers_given};max-age=1000000000000000000000000000000000`
        document.cookie = new_cookie
        container_start.style.display = 'flex'
        container_main.style.display = 'none'
        container_h3.innerHTML = `Ви дали 
        ${correct_answers_given} з
        ${total_answers_given}.
        Точність 
        ${Math.round(correct_answers_given *100/total_answers_given)}`
},time * 1000)
})


for (let i = 0;i < answer_buttons.length;i++){
    answer_buttons[i].addEventListener('click', function(){
        if(answer_buttons[i].innerHTML == current_question.correct){
            correct_answers_given++
            answer_buttons[i].style.background = '#92ff94'
            total_answers_given++
            anime({
                targets:answer_buttons[i],
                background:'#f8e8ff',
                duration:500,
                delay:500,
                easing:'linear',
            }).finished.then(() => {
                current_question = new Question()
                current_question.display()
            })
            console.log('Правильно :)')
        }else{
            answer_buttons[i].style.background = '#ff6776'
            total_answers_given++
            anime({
                targets:answer_buttons[i],
                background:'#f8e8ff',
                duration:500,
                delay:100,
                easing:'linear',
            }).finished.then(() => {
                current_question = new Question()
                current_question.display()
            })
            console.log('Не правильно :(')
        }
    })
}


start_btn.addEventListener('mouseenter', function(){
    anime({
        targets: '.start-btn', 
        duration:500,
        scale: 2,
        rotate: '1turn'
    })
})

start_btn.addEventListener('mouseleave', function(){
    anime({
        targets: '.start-btn', 
        scale: 1,
        rotate:-2
    })
})
