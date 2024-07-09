const _ = (string) => document.querySelector(string)

const text = _('#text');
const btn = _('.dice');
const head = _('#headText');
const keyword = _('#keyword');
const output = _('#output');
const search =_('#search-btn');
const cards=_('#cards')
// const search-btn =_('#search-btn');

const fetchData = async ()=> 
{
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    console.log(data);

    const textString =`${data?.slip?.advice}`;
    text.innerHTML = textString;

    const num = `ADVICE #${data?.slip?.id}`
    head.innerHTML = num;
    return
}

async function display(){
    const word = keyword.value;
    output.innerText = `Currently searching for : ${word}`;

    const res = await fetch(`https://api.adviceslip.com/advice/search/${word}`);
    const data = await res.json();
    console.log(data);

    const card_container = document.querySelector("div.card-container");

    const Result = data.slips.map(slip => {
        return `<div class="cards" id="cards">
        <div id="small-date"><b>${slip.date}</b></div>
        <p id="card-content" >${slip.advice}</p>
        <div id="small-number"><b>${slip.id}</b></div>
    </div>`
    });

    card_container.innerHTML= Result.join("");

    console.log(Result);
}



search.addEventListener('click',display)
btn.addEventListener('click', () => fetchData())





