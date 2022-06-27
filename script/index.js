//const poetry = require('./poetry.json')

let resultText = []
let resultInfo = []
let firstRhyme = ""
let secondRhyme = ""
let whileCounter = 0;
function mashup(poetry){
    let poemSize = Math.floor(Math.random() * 4)+4; 
    poemSize = 4;
    for (let index = 0; index < poemSize; index++) {
        let randpoem = Math.floor(Math.random() * poetry.length);
        let randRow = Math.floor(Math.random() * poetry[randpoem].poem.split("\n").filter((element) => element != "").length)
        let row = poetry[randpoem].poem.split("\n")[randRow] + "\n"
        while((row.match(/(\.){4,}\n/g) != null || row.split(" ").length < 2 || resultText.includes(row)) && whileCounter < 300){
            randpoem = Math.floor(Math.random() * poetry.length);
            randRow = Math.floor(Math.random() * poetry[randpoem].poem.split("\n").filter((element) => element != "").length)
            row = poetry[randpoem].poem.split("\n")[randRow] + "\n"
            whileCounter++;
        }
        whileCounter = 0;
        let clearRow = row.toLowerCase().replace(/[.\\/"'!\-,;:]/gu, " ").replace(/[\s]+/gu, " ").trim();
        if (index == 0) {
            firstRhyme = clearRow.substring(clearRow.length - 2, clearRow.length)
        }else if(index == 1){
            secondRhyme = clearRow.substring(clearRow.length - 2, clearRow.length)
        }else if(index == poemSize - 1){
            let newRhyme = clearRow.substring(clearRow.length-2,clearRow.length);
            let compareRhyme;
            index % 2 == 0 ? compareRhyme = firstRhyme: compareRhyme = secondRhyme;
            while(( newRhyme != compareRhyme || row.match(/\w+((\.){1,3}|\?)\n/g) == null || row.match(/(\.){4,}\n/g) != null 
            || row.split(" ").length < 2 || resultText.includes(row)) && whileCounter < 600){
                randpoem = Math.floor(Math.random() * poetry.length);
                randRow = Math.floor(Math.random() * poetry[randpoem].poem.split("\n").filter((element) => element != "").length)
                row = poetry[randpoem].poem.split("\n")[randRow] + "\n"
                clearRow = row.toLowerCase().replace(/[.\\/"'!\-,;:]/gu, " ").replace(/[\s]+/gu, " ").trim();
                newRhyme = clearRow.substring(clearRow.length-2,clearRow.length);
                whileCounter++;
            }
            whileCounter = 0;
        }
        else if(index % 2 == 0) {
            let newRhyme = clearRow.substring(clearRow.length-2,clearRow.length);
            while ((newRhyme != firstRhyme || row.match(/(\.){4,}\n/g) != null || row.split(" ").length < 2
            || resultText.includes(row)) && whileCounter < 300){
                randpoem = Math.floor(Math.random() * poetry.length);
                randRow = Math.floor(Math.random() * poetry[randpoem].poem.split("\n").filter((element) => element != "").length)
                row = poetry[randpoem].poem.split("\n")[randRow] + "\n"
                clearRow = row.toLowerCase().replace(/[.\\/"'!\-,;:]/gu, " ").replace(/[\s]+/gu, " ").trim();
                newRhyme = clearRow.substring(clearRow.length-2,clearRow.length);
                whileCounter++;
            }
            whileCounter = 0;
        }else if(index %2 == 1) {
            let newRhyme = clearRow.substring(clearRow.length-2,clearRow.length);
            while ((newRhyme != secondRhyme || row.match(/(\.){4,}\n/g) != null || row.split(" ").length < 2
            || resultText.includes(row)) && whileCounter < 300){
                randpoem = Math.floor(Math.random() * poetry.length);
                randRow = Math.floor(Math.random() * poetry[randpoem].poem.split("\n").filter((element) => element != "").length)
                row = poetry[randpoem].poem.split("\n")[randRow] + "\n"
                clearRow = row.toLowerCase().replace(/[.\\/"'!\-,;:]/gu, " ").replace(/[\s]+/gu, " ").trim();
                newRhyme = clearRow.substring(clearRow.length-2,clearRow.length);
                whileCounter++;
            }
            whileCounter = 0;
        }
        resultText.push(row);
        resultInfo.push({
            "author": poetry[randpoem].author,
            "title": poetry[randpoem].title,
    })
    }   
    console.log(resultText.join(""));
    console.log(resultInfo);


    document.querySelector(".blockquote").innerHTML = resultText.join("<br>")
    document.querySelector(".blockquote-footer").innerHTML = resultInfo.map((element)=>Object.values(element).join(": ")).join("<br>")
    return resultText.join, resultInfo; 
}


fetch("./script/poetry.json").then(response =>response.json()).then(data => {
    mashup(data)
});


