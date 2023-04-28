const main = document.querySelector('main');
const pattern = [];

for (let i = 0; i < 20; i++) {
    pattern.push([0, 0])
}

function createButtons() {
    for (let i = 1; i < 21; i++) {
        let div = document.createElement('div');

        if (i < 10) {
            div.textContent = `0${i}.`;
        } else {
            div.textContent = `${i}.`;
        }

        let button = document.createElement('button');
        button.classList.add('btn');
        

        let button1 = document.createElement('button');
        button1.classList.add('btn1');
        div.appendChild(button);
        div.appendChild(button1);

        button.addEventListener('click', function(){
            button.innerText = 'x';
            button1.innerText = '';
            let n = parseInt(button.parentElement.innerText.slice(0, 2)) - 1;
            pattern[n] = ['x', 0];
        });
        button1.addEventListener('click', function(){
            button1.innerText = 'x';
            button.innerText = '';
            let m = parseInt(button.parentElement.innerText.slice(0, 2)) - 1;
            pattern[m] = [0, 'x'];
        });

        main.appendChild(div);
        let br = document.createElement('br')
        main.appendChild(br);
    }
}

createButtons();

const submitBtn = document.querySelector('#submit');
const errorText = document.querySelector('.errorsText');

const errArr = [
    'Error: not all boxes have been clicked.',
    'Error: this pattern already exists.',
    ''
];

let uniquePatterns = JSON.parse(localStorage.getItem('uniquePatterns')) || [];

submitBtn.addEventListener('click', function(){
    let currentPattern = JSON.stringify(pattern);
    // first condition
    let nrX = 0;
    for (let i = 0; i < pattern.length; i++) {
        if (pattern[i][0] === 'x') {
            nrX++;
        } else if (pattern[i][1] === 'x') {
            nrX++;
        }
    }
    if (nrX !== 20) {
        errorText.textContent = errArr[0];
        return;
    }

    // second condition
    if (uniquePatterns.includes(currentPattern)) {
        errorText.textContent = errArr[1];
        return;
    }

    // result
    uniquePatterns.unshift(currentPattern);
    errorText.textContent = errArr[2];
    document.querySelectorAll('.btn').forEach((btn, i) => {
        if (currentPattern[i][0] === 'x' && currentPattern[i][1] === 0) {
            btn.innerText = 'x';
        } else if (currentPattern[i][0] === 0 && currentPattern[i][1] === 'x') {
            btn.innerText = 'x';
        } else {
            btn.innerText = '';
        }
    });
    document.querySelectorAll('.btn1').forEach((btn1) => (btn1.innerText = ''));
    

    // reset the pattern array to all zeros
    for (let i = 0; i < pattern.length; i++) {
        pattern[i][0] = 0;
        pattern[i][1] = 0;
    };
    localStorage.setItem('uniquePatterns', JSON.stringify(uniquePatterns));
});

// menu

const menuOpenBtn = document.getElementById('menuBtn');
const menu = document.querySelector('.menu-container');
const menuCloseBtn = document.getElementById('closeModal');

menuOpenBtn.addEventListener('click', function(){
    menu.style.display = 'grid';
});
menuCloseBtn.addEventListener('click', function(){
    menu.style.display = 'none';
});

document.getElementById('resetPaternsBtn').addEventListener('click', function(){
    document.querySelector('.yesNoBtn').style.display = 'block';
});
document.querySelector('#noBtn').addEventListener('click', function(){
    document.querySelector('.yesNoBtn').style.display = 'none';
});
document.querySelector('#yesBtn').addEventListener('click', function(){
    document.querySelector('.yesNoBtn').style.display = 'none';
    uniquePatterns = [];
    localStorage.setItem('uniquePatterns', JSON.stringify(uniquePatterns));
});

document.querySelector('#viewPaternsBtn').addEventListener('click', function(){
    document.querySelector('.viewPaternsModal').style.display = 'grid';
});
document.querySelector('#closevPM').addEventListener('click', function(){
    document.querySelector('.viewPaternsModal').style.display = 'none';
});

// view

const table = document.querySelector('.table'); // main item



function createNumbers() {
    const divTable = document.createElement('div');
    divTable.classList.add('numbers');

    for (let i = 0; i < 21; i++) {
        const p = document.createElement('p');
        p.textContent = (i === 0) ? '-' : i < 10 ? `0${i}.` : `${i}.`;
        divTable.appendChild(p);
    };
    table.appendChild(divTable)
}
createNumbers();

function displayPaterns() {
    for (let i = 0; i <= uniquePatterns.length; i++) {

        const divTable = document.createElement('div');
        divTable.classList.add('patterns');

        const p = document.createElement('p');
        p.textContent = `${i + 1}`

        let arr = JSON.parse(`${uniquePatterns[i]}`)

        divTable.appendChild(p);

        for (let j = 0; j < arr.length; j++) {
            const p = document.createElement('p');
            p.textContent =  `${arr[j][0]}`
            const m = document.createElement('p');
            m.textContent =  `${arr[j][1]}`

            const divTableBox = document.createElement('div');
            divTableBox.classList.add('tableBox');

            divTableBox.appendChild(p);
            divTableBox.appendChild(m);

            divTable.appendChild(divTableBox);
        }

        table.appendChild(divTable)
    }
}
displayPaterns();