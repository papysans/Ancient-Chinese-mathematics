document.addEventListener('DOMContentLoaded', (event) => {
    var radios = document.querySelectorAll('input[type=radio][name="tabs"]');
    var savedOption = localStorage.getItem('selectedOption');
    if (savedOption) {
        radios[savedOption].checked = true;
    } else {
        radios[0].checked = true;
        savedOption = '0';
        localStorage.setItem('selectedOption', savedOption);
    }
    radios.forEach(function (radio, index) {
        radio.onclick = function () {
            localStorage.setItem('selectedOption', index);
            location.reload();
        };
    });
    loadModel(savedOption);
});

function loadModel(option) {
    var oldScript = document.getElementById('model-script');
    if (oldScript) {
        oldScript.remove();
    }
    var newScript = document.createElement('script');
    newScript.type = 'module';
    newScript.id = 'model-script';
    switch (option) {
        case '0':
            newScript.src = './src/homepage/model-1.js';
            break;
        case '1':
            newScript.src = './src/homepage/model-2.js';
            break;
        case '2':
            newScript.src = './src/homepage/model-3.js';
            break;
        case '3':
            newScript.src = './src/homepage/model-4.js';
            break;
    }
    document.head.appendChild(newScript);
}

