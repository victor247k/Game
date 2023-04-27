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

const uniquePatterns = JSON.parse(localStorage.getItem('uniquePatterns')) || [];

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