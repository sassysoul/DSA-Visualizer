



let textcontainer = document.getElementById("stringcont");
let patterncontainer = document.getElementById("patterncont");

textcontainer.style.cssText =  `top: 200px;left :150px;transition:${speed}ms linear;`
patterncontainer.style.cssText =  `top: 270px;left :150px;transition:${speed}ms linear;`




function createblocks(word,pattern) {



    for (let i = 0 ; i < word.length ; i++)  {

    if (word[i] == " ") textcontainer.insertAdjacentHTML("beforeend" , `<div id=text${i} class="charwords" style="background-color: #8ab6d6;transition: ${speed}ms linear;"><p>&#8203;</p><p style="margin:0;margin-top:-80px;left:10px;color:black;font-size:80%;">${i}</p></div>`)


    else  textcontainer.insertAdjacentHTML("beforeend" , `<div id=text${i} class="charwords" style="background-color: #8ab6d6;transition: ${speed}ms linear;"><p>${word[i]}</p><p style="margin:0;margin-top:-80px;left:10px;color:black;font-size:80%;">${i}</p></div>`)


    }


    for (let i = 0 ; i < pattern.length ; i++)  {


        if (pattern[i] == " ")  patterncontainer.insertAdjacentHTML("beforeend" , `<div id=pattern${i} class="charpatterns"  style="background-color: #8ab6d6;transition: ${speed}ms linear;"><p>&#8203;</p><p style="margin:0;margin-top:-10px;left:10px;color:black;font-size:80%;">${i}</p></div>`)

        else patterncontainer.insertAdjacentHTML("beforeend" , `<div id=pattern${i} class="charpatterns"  style="background-color: #8ab6d6;transition: ${speed}ms linear;"><p>${pattern[i]}</p><p style="margin:0;margin-top:-10px;left:10px;color:black;font-size:80%;">${i}</p></div>`)


    }



}


var d = 256


 async function brutesearch(txt,pat) {


    let M = pat.length;
    let N = txt.length;

    /* A loop to slide pat[] one by one */
    for (let i = 0; i <= N - M; i++) {

        let j;


        /* For current index i, check for pattern match */
        for (j = 0; j < M; j++) {

        hilight(`text${(i+j)}` ,"dodgerblue")
        await hilight(`pattern${j}` ,"dodgerblue")


             if (txt[i + j] != pat[j]) {

                hilight(`text${i+j}` , '#8ab6d6')
             await hilight(`pattern${j}` , "#8ab6d6")

                break;
             }


             hilight(`text${i+j}` , '#8ab6d6')
             await hilight(`pattern${j}` , "#8ab6d6")

        }

        await waitforme(speed+200);

        patterncontainer.style.left = parseInt(patterncontainer.style.left)+ 44+"px";

        await waitforme(speed+100);


        if (j == M) {

            Log(`<span style="font-size:130%;">Pattern found at index ${i}</span>`)
        }

    }

}



async function NaiveSearch(text , pattern)  {


    textcontainer.style.left = "150px";
    patterncontainer.style.left = "150px";

    x = document.getElementsByClassName("charwords");

    for (ie= x.length-1 ; ie >= 0 ; ie--) {

        x[ie].remove();

    }

    x = document.getElementsByClassName("charpatterns");

    for (ie= x.length-1 ; ie >= 0 ; ie--) {

        x[ie].remove();

    }


    createblocks(text,pattern);

   await waitforme(800)

  await  brutesearch(text,pattern);



}



slider.onchange= function() {


    textcontainer.style.transition = `${speed}ms linear`
    patterncontainer.style.transition = `${speed}ms linear`



  }
