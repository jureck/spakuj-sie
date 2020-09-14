const add = document.querySelectorAll('.add');
const days = document.querySelectorAll('.day__lessons');
const save = document.querySelector('.save');
let input = document.querySelectorAll('.lesson')[0].cloneNode(true);
let change = document.querySelector('.change');



const weekday = new Array(7);
weekday[0] = "sun";
weekday[1] = "mon";
weekday[2] = "tue";
weekday[3] = "wed";
weekday[4] = "thu";
weekday[5] = "fri";
weekday[6] = "sat";

let currentDay = weekday[new Date().getDay()];
let nextDay = weekday[new Date().getDay() + 1];

if(currentDay === 'sat' || currentDay === 'sun') currentDay = "fri";

if(currentDay === 'fri') nextDay = "mon";

const currentDayLessons = JSON.parse(localStorage.getItem(currentDay));
const nextDayLessons = JSON.parse(localStorage.getItem(nextDay));

let toPack = [];
let toUnPack = [];

if(currentDayLessons) {
    for(const el of currentDayLessons) {
        if(!nextDayLessons.includes(el)) {
            toUnPack.push(el);
        }
    }
    
    for(const el of nextDayLessons) {
        if(!currentDayLessons.includes(el)) {
            toPack.push(el);
        }
    }
}

toPack = [...new Set(toPack)];
toUnPack = [...new Set(toUnPack)];

const addLesson = (e) => {
    const dayId = e.target.id;
    let input = document.querySelectorAll('.lesson')[0].cloneNode(true);
    input.value = "";
    days[dayId].appendChild(input);
}

const saveLessons = () => {
    let mon = [];
    let tue = [];
    let wed = [];
    let thu = [];
    let fri = [];

    mon = [...days[0].children].map((child) => child.value);
    tue = [...days[1].children].map((child) => child.value);
    wed = [...days[2].children].map((child) => child.value);
    thu = [...days[3].children].map((child) => child.value);
    fri = [...days[4].children].map((child) => child.value);

    localStorage.setItem('mon', JSON.stringify(mon));
    localStorage.setItem('tue', JSON.stringify(tue));
    localStorage.setItem('wed', JSON.stringify(wed));
    localStorage.setItem('thu', JSON.stringify(thu));
    localStorage.setItem('fri', JSON.stringify(fri));

    document.querySelector('.lessons__form').style.display = "none";
}

const toggleUnpackText = (id) => {
    document.querySelector(`#u${id}`).classList.toggle('line');
}


const togglePackText = (id) => {
    document.querySelector(`#p${id}`).classList.toggle('line');
}


if(localStorage.getItem('mon')) {
    document.querySelector('.lessons__form').style.display = "none";
}

const week = new Array(7);
week[0] = "niedziela";
week[1] = "poniedziałek";
week[2] = "wtorek";
week[3] = "środa";
week[4] = "czwartek";
week[5] = "piątek";
week[6] = "sobota";

let curr = week[new Date().getDay()];
let next = week[new Date().getDay() + 1];

if(curr === "piątek" || curr === "sobota" || curr === "niedziela") next = "poniedziałek";


document.querySelector('.current').innerHTML += "<span class='pack__day'>"+curr+"</span>";
document.querySelector('.next').innerHTML += "<span class='pack__day'>"+next+"</span>";

document.querySelector('.unpack').innerHTML = toUnPack.map((el, q) => '<p id="u'+q+'" onclick="toggleUnpackText('+q+')" class="unpack__lesson">'+el+'</p>');

document.querySelector('.pack').innerHTML = toPack.map((el, q) => '<p id="p'+q+'" onclick="togglePackText('+q+')" class="pack__lesson">'+el+'</p>');

change.addEventListener('click', () => document.querySelector('.lessons__form').style.display = "block");
save.addEventListener('click', saveLessons);

add[0].addEventListener('click', addLesson);
add[1].addEventListener('click', addLesson);
add[2].addEventListener('click', addLesson);
add[3].addEventListener('click', addLesson);
add[4].addEventListener('click', addLesson);