var headlineColor = getComputedStyle(document.documentElement).getPropertyValue('--headline-color').trim();

function changeColor() {
    var headlineColor = getComputedStyle(document.documentElement).getPropertyValue('--headline-color').trim();
    var textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();
    var button = document.getElementById('change-button');

    if (headlineColor === 'transparent' && textColor === 'transparent') {
        document.documentElement.style.setProperty('--headline-color', '#BEBEBE');
        document.documentElement.style.setProperty('--text-color', '#BEBEBE');
        button.textContent = '隐藏文字';
        localStorage.setItem('textState', 'visible');
    } else {
        document.documentElement.style.setProperty('--headline-color', 'transparent');
        document.documentElement.style.setProperty('--text-color', 'transparent');
        button.textContent = '显示文字';
        localStorage.setItem('textState', 'hidden');
    }
}

window.onload = function() {
    var textState = localStorage.getItem('textState');
    if (textState === 'hidden') {
        document.documentElement.style.setProperty('--headline-color', 'transparent');
        document.documentElement.style.setProperty('--text-color', 'transparent');
        document.getElementById('change-button').textContent = '显示文字';
    } else {
        document.documentElement.style.setProperty('--headline-color', '#BEBEBE');
        document.documentElement.style.setProperty('--text-color', '#BEBEBE');
        document.getElementById('change-button').textContent = '隐藏文字';
    }
};