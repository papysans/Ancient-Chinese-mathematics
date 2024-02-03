function changeColor() {
    var headlineColor = getComputedStyle(document.documentElement).getPropertyValue('--headline-color').trim();
    var textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();
    var button = document.getElementById('change-button');

    if (headlineColor === 'transparent' && textColor === 'transparent') {
        document.documentElement.style.setProperty('--headline-color', '#BEBEBE');
        document.documentElement.style.setProperty('--text-color', '#BEBEBE');
        button.textContent = '隐藏文字';
    } else {
        document.documentElement.style.setProperty('--headline-color', 'transparent');
        document.documentElement.style.setProperty('--text-color', 'transparent');
        button.textContent = '显示文字';
    }
}