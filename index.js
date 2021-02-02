//изменение цвета при клике на кнопку
const buttonActiveL = document.querySelectorAll('button.converter__left-side, select.converter__left-side ');
const buttonActiveR = document.querySelectorAll('button.converter__right-side, select.converter__right-side');
const url = ('https://api.ratesapi.io/api/latest?')
let textInnerPL = document.querySelector('.converter__left-side p');
let textInnerPR = document.querySelector('.converter__right-side p');
let valueInButtonL = 'RUB';
let valueInButtonR = 'USD';
const swapButton = document.querySelector('.converter__midle-side');
const from = document.querySelector('.converter__left-side_choose-value');
const to = document.querySelector('.converter__right-side_choose-value');
const currencyFrom = from.querySelectorAll('.converter__left-side');
const currencyTo = to.querySelectorAll('.converter__right-side');
const inputLeft = document.querySelector('input.converter__left-side');
const inputRight = document.querySelector('input.converter__right-side');

//изначальные валюты при загрузке
loadData(valueInButtonL, valueInButtonR);

//присваивание класса левой и правой кнопкам
buttonActiveL.forEach((item)=>{
    item.addEventListener('click', ()=> {
        const oldActive= document.querySelector('.converter__left-side .active');
        if (oldActive) {
            oldActive.classList.remove('active');
        } 
        item.classList.add('active');

        if(item.tagName === 'BUTTON') {
            valueInButtonL = item.textContent
        } else {
            valueInButtonL = item.value
        }
        
        
        loadData(valueInButtonL, valueInButtonR);


        fetch(`https://api.ratesapi.io/api/latest?base=${valueInButtonL}&symbols=${valueInButtonR}`)
        .then((response)=>response.json())
        .then((data)=>{
            inputRight.value = inputLeft.value * data.rates[`${valueInButtonR}`];
        })
        
    });
});

buttonActiveR.forEach((item)=>{
    item.addEventListener('click', ()=> {
        const oldActive= document.querySelector('.converter__right-side .active');
        if (oldActive) {
            oldActive.classList.remove('active');
        } 
        item.classList.add('active');
    
        if(item.tagName === 'BUTTON') {
            valueInButtonR = item.textContent
        } else {
            valueInButtonR = item.value
        }
        loadData(valueInButtonL, valueInButtonR);

        fetch(`https://api.ratesapi.io/api/latest?base=${valueInButtonL}&symbols=${valueInButtonR}`)
        .then((response)=>response.json())
        .then((data)=>{
            inputRight.value = inputLeft.value * data.rates[`${valueInButtonR}`];
        })
        
    });
});

//запрос к серверу о курсе валют
function loadData(left, right){
    
    fetch(`https://api.ratesapi.io/api/latest?base=${left}&symbols=${right}`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            textInnerPL.textContent = `1 ${data.base} = ${data.rates[`${right}`]} ${right}`
        })
        .catch((err) =>{
            alert('что-то пошло не так')
        })
    fetch(`https://api.ratesapi.io/api/latest?base=${right}&symbols=${left}`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            textInnerPR.textContent = `1 ${data.base} = ${data.rates[`${left}`]} ${left}`
        })
}
//inputs


inputLeft.addEventListener('input', ()=>{
    fetch(`https://api.ratesapi.io/api/latest?base=${valueInButtonL}&symbols=${valueInButtonR}`)
    .then((response)=>response.json())
    .then((data)=>{
        inputRight.value = inputLeft.value * data.rates[`${valueInButtonR}`];
    })
})

//кнопка меняющая значения сторон
swapButton.addEventListener('click', ()=>{
    let newTextInnerP = textInnerPL.innerHTML;
    textInnerPL.innerHTML = textInnerPR.innerHTML;
    textInnerPR.innerHTML = newTextInnerP;

    let newInput = inputLeft.value;
    inputLeft.value = inputRight.value;
    inputRight.value = newInput;
    
    let leftActive = from.querySelector('.active');
    let rightActive = to.querySelector('.active');

    
//debugger
    if(leftActive.textContent != rightActive.textContent){
        
        if(leftActive.tagName != 'SELECT' || rightActive.tagName != 'SELECT'){
            buttonActiveL.forEach((item)=>{
                if(item.textContent == rightActive.textContent){
                    item.classList.add('active');
                }
                if(rightActive.tagName == 'SELECT') {
                    item.value = rightActive.value;
                    if(item.tagName == 'SELECT'){
                        item.classList.add('active');
                    }
                    
                }           
            })
            buttonActiveR.forEach((item)=>{
                if(item.textContent == leftActive.textContent){
                    item.classList.add('active');
                }
                if(leftActive.tagName == 'SELECT') {
                    item.value = leftActive.value;   
                    if(item.tagName == 'SELECT'){
                        item.classList.add('active');
                    }
                }  

            })

            leftActive.classList.remove('active');
            rightActive.classList.remove('active');
        } else {
            let newRandomValue = rightActive.value; 
            rightActive.value = leftActive.value;
            leftActive.value = newRandomValue;
        }

        
    }

    
    
});