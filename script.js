function getFormattedNumber(num) {
  let NumberNum = Number(num);
  return NumberNum.toLocaleString("en");
}


function reverseFormatted(num) {
  return num.replace(/,/g,"");
}




let buttons = document.querySelectorAll(".button");
let screen = document.querySelector(".screen");


buttons.forEach(tasto => {
  tasto.addEventListener("click", function() {


    if (this.innerHTML === "C") {
      clearAll();
    } else if (this.innerHTML === "Del") {
      removeOne(screen.innerHTML);

    } else if (this.innerHTML === ".") {

      screen.innerHTML = searchForTheDot(screen.innerHTML);

    } else if (this.innerHTML === "=") {
      let lastValue = screen.innerHTML.slice(-1,screen.innerHTML.length);
      if (isNaN(lastValue)) {
        let stringaLavorata;
        stringaLavorata = screen.innerHTML.slice(0,screen.innerHTML.length - 1);
        screen.innerHTML = equal(stringaLavorata);
        
      } else {
        screen.innerHTML = equal(screen.innerHTML);

      }
    } else { 
        
        let lastValue = screen.innerHTML.slice(-1,screen.innerHTML.length);

        /* se ultimo Numero e' un segno operatore  AND    il tasto che clicco e un operatore  */
        if (isNaN(lastValue) && isNaN(this.innerHTML)) {
          /* toglimi lultimo valore e mettimi quello che clicco  */
          screen.innerHTML = screen.innerHTML.slice(0,screen.innerHTML.length - 1);
          screen.innerHTML += this.innerHTML;
        } 
          // else if (isNaN(lastValue) && !isNaN(this.innerHTML)) {
          //   screen.innerHTML += this.innerHTML;
          // } 
        else {
            
            if (screen.innerHTML === "0" && !isNaN(this.innerHTML)) {
              screen.innerHTML = "";
              screen.innerHTML += this.innerHTML;
            } else {
              screen.innerHTML += this.innerHTML;
            } 
      }
    }


     
  });
});


function clearAll() {
  screen.innerHTML = 0;
}
function removeOne(str) {
  let remove = str.slice(0,str.length-1);
  return screen.innerHTML = remove;
}


function searchForTheDot(string) {
  
let lastNumber = string.split(/[-+*/]/);
lastNumber = lastNumber[lastNumber.length-1].toString();

  if (lastNumber.search(/\./) > 0) {
    return string;
  } else {
    return string += "."
}  return string;
} 



function equal(stringaLavorata) {
  console.log(stringaLavorata, 1);
  let numeri = stringaLavorata.split(/[-*/+]/);
  let operatori = stringaLavorata.match(/[/*+-]/g);
  



console.log(numeri,operatori, 2);

let newArray = [];
for (let i = 0, b = 0; i < numeri.length; i++,b++) {
  newArray.push(numeri[i])
  if (operatori[b] === undefined) {
      
  }
  else {
    newArray.push(operatori[b])  
  }
}



let operatore;
let calcolo = newArray.reduce((total, amount) => 
{
  // se amount e un operatore 
  // fai questi se * aggiungi a variabile operatore 
  // se amount e numero  fai operazione  total operatore amount 
            total = Number(total);
  
            if (isNaN(amount))
          {
               operatore = amount;
            // console.log(operatore);
          } else 
            {
              amount = Number(amount);
             switch(operatore) {
            case "+":
              total += amount;
              break;
            case "-":
               total -= amount;
              break;
            case "*":
                
                total *= amount;
               break;
            case "/":
               total /= amount;
              break;
                            }
             }
  return total;
})
return maxTwoDigit(calcolo);
}



// function return  whole number without dot or float number with . but max 2 digit 

function maxTwoDigit(calcolo) {
  let calcoloString = calcolo.toString();
  contain = calcoloString.search(/\./);
console.log(contain);
  if (contain === -1) {
    return calcolo;
  } else {
    return calcolo.toFixed(2);
  }
}





// //KEYBOARD SUPPORT

let keyboardInput = null;

addEventListener("keydown", function(e) {
    switch (e.keyCode) {
        case 13:
            e.preventDefault();
            equals();
            break;
        case 67:
            clearDisplay();
            break;
        case 8:
            deleteLast();
            break;
        case 190:
        case 191:
            makeDecimal();
            break;
        case 48:
        case 96:
            keyboardInput = 0;
            inputDigit();
            break;
        case 49:
        case 97:
            keyboardInput = 1;
            inputDigit();
            break;
        case 50:
        case 98:
            keyboardInput = 2;
            inputDigit();
            break;
        case 51:
        case 99:
            keyboardInput = 3;
            inputDigit();
            break;
        case 52:
        case 100:
            keyboardInput = 4;
            inputDigit();
            break;
        case 53:
        case 101:
            keyboardInput = 5;
            inputDigit();
            break;
        case 54:
        case 102:
            keyboardInput = 6;
            inputDigit();
            break;
        case 55:
        case 103:
            keyboardInput = 7;
            inputDigit();
            break;
        case 56:
        case 104:
            keyboardInput = 8;
            inputDigit();
            break;
        case 57:
        case 105:
            keyboardInput = 9;
            inputDigit();
            break;
        case 107:
        case 187:
            keyboardInput = '+';
            inputOper()
            break;
        case 109:
        case 189:
            keyboardInput = '-';
            inputOper()
            break;
        case 106:
            keyboardInput = '×';
            inputOper()
            break;
        case 111:
            keyboardInput = '÷';
            inputOper()
            break;
        case 190:
        case 191:
            makeDecimal();
            break;
    }
  });






