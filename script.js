const below_20 = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const thousands = ["", "Thousand", "Million", "Billion"];

function convertLessThan1000(num) {
let result = '';
if (num >= 100) {
result += below_20[Math.floor(num / 100)] + " Hundred ";
num %= 100;
}
if (num >= 20) {
result += tens[Math.floor(num / 10)] + " ";
num %= 10;
}
if (num > 0) {
result += below_20[num] + " ";
}
return result.trim();
}

function numberToWords(num) {
if (num === 0) return "Zero";

let words = '';
let i = 0;
while (num > 0) {
if (num % 1000 !== 0) {
words = convertLessThan1000(num % 1000) + thousands[i] + " " + words;
}
num = Math.floor(num / 1000);
i++;
}
return words.trim();
}

function convertNumber() {
const num = parseInt(document.getElementById('numberInput').value);
if (isNaN(num) || num < 0) {
document.getElementById('result').innerText = "Please enter a valid non-negative number.";
} else {
const result = numberToWords(num);
document.getElementById('result').innerText = result;
addToHistory(num, result);
}
}

function addToHistory(num, result) {
const history = document.getElementById('history');
const listItem = document.createElement('li');
listItem.innerText = `${num} - ${result}`;
history.insertBefore(listItem, history.firstChild);
}

function exportToPDF() {
const { jsPDF } = window.jspdf;
const doc = new jsPDF();
const resultText = document.getElementById('result').innerText;
doc.text(resultText, 10, 10);
doc.save('number-to-words.pdf');
}

function setExample(num) {
document.getElementById('numberInput').value = num;
convertNumber();
}

function toggleTheme() {
document.body.classList.toggle('dark-theme');
}

// Live conversion
document.getElementById('numberInput').addEventListener('input', function() {
convertNumber();
});
