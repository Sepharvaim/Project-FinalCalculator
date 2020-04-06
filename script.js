


 // select all the divs that are squares in the calc.
 // Learned: for readbility and easy coding I should separate the operator div from the Number div
let buttons = document.querySelectorAll(".button");
// select the screen div. then we can access some option like innerHTML that is set to 0 now
let screen = document.querySelector(".screen");

// ------------------------- EVENT LISTENER FOR BUTTONS 
// Learned: this event listeners is to big, it forces multiple if and else statment and can become a mess
buttons.forEach(tasto => {     // for every button add a click eventlistener that call an anonimous function
  tasto.addEventListener("click", function() {


    if (this.innerHTML === "C") {    // If the button innerhtml is equal to C  call clearAll function 
      clearAll();
    } else if (this.innerHTML === "Del") {  // If it is the Del button  remove one character at the end of the string
      removeOne(screen.innerHTML); 

    } else if (this.innerHTML === ".") {//if its the dot button call the function and gives the dot if theres none

      screen.innerHTML = searchForTheDot(screen.innerHTML);

    } else if (this.innerHTML === "=") {    // if the button is a =
      let lastValue = screen.innerHTML.slice(-1,screen.innerHTML.length); // take the last value of the string to check if it is a number or operator
      if (isNaN(lastValue)) {    // if is not a number so it is an operator remove it 
        let stringaLavorata;
        stringaLavorata = screen.innerHTML.slice(0,screen.innerHTML.length - 1);
        screen.innerHTML = equal(stringaLavorata); // call the equal function that calculates the string without the last opeator 
        
      } else {
        screen.innerHTML = equal(screen.innerHTML); // else if it is a number call the function euqal 

      }
    } else {  // if the button is not an equal or c or del or \. but its a number or an operator 
        
        let lastValue = screen.innerHTML.slice(-1,screen.innerHTML.length); // check the last value

        /* if last value its an operator  AND  the button clicked is an opearator  */
        if (isNaN(lastValue) && isNaN(this.innerHTML)) {
          /* remove the last one and replace with the new operator */
          screen.innerHTML = screen.innerHTML.slice(0,screen.innerHTML.length - 1);
          screen.innerHTML += this.innerHTML;
        } 
          
        else {  // if is an operator and the last is not an operator  
            
            if (screen.innerHTML === "0" && !isNaN(this.innerHTML)) {  
              screen.innerHTML = "";
              screen.innerHTML += this.innerHTML;
            } else {
              if (isNaN(this.innerHTML)) {  // if it is a operator call opa function
                
                screen.innerHTML = opa(this.innerHTML);
              } else {
                
                screen.innerHTML = addComa(screen.innerHTML,this.innerHTML);  // otherwise call addComa
              }
            } 
      }
    }


     
  });
});
// ---------------------- // END OF  EVENT LISTENERS FOR BUTTON // ------------------// 




//----------- START OF SOME FUNCTION // This function help to organize the code and reduce the actual code needed by call the same function where needed // 



// ------------ THIS IS A CLEAR FUNCTION // it clears the screen and if exist some variable 
function clearAll() {
  screen.innerHTML = 0;       // set the screen to 0 
}
// ----------------- THIS FUNCTION TAKES ALL THE STRING's CHARACTER EXCEPT FOR THE LAST CHARACTER OF THE STRING ----- will be used for backspace 
function removeOne(str) {   
  let remove = str.slice(0,str.length-1);//slice takes the first index(0) and all the character until the second value
  return screen.innerHTML = remove; 
}
// -------------- THIS FUNCTION SEARCH IF IS THERE ANY DOT IN THE LAST CHUNK OF A STRING DIVIDED BY OPERATOR 

function searchForTheDot(string) {
  
let lastNumber = string.split(/[-+*/]/);  // separate into an array the string 
lastNumber = lastNumber[lastNumber.length-1].toString();  //Learned: then takes the last index of an array and change it into string for security could be removed 
  if (lastNumber.search(/\./) > 0) {  // Learned: search gives -1 if doesnt find the given value(so false) or the index of the value found positive  
    return string;
  } else {
    return string += "."; // return the whole string with the dot; not the worked one only 
}  return string;   // Learned: function must always return something otherwise return undefined
} 

// 


// *************************** THIS FUNCTION CALCULATE THE STRING ***************** //  

function equal(stringaLavorata) {                     // Accept the whole string with number and operator combined
  stringaLavorata = stringaLavorata.replace(/\,/g,"");// Learned: replace all the "," with nothing;
  let numeri = stringaLavorata.split(/[-*/+]/);  // create an array with only number seperate from the operator: Learned: Operators are lost 
  let operatori = stringaLavorata.match(/[/*+-]/g); // create an array with only the operator 

let newArray = [];                                   // declare a new empty array 
for (let i = 0, b = 0; i < numeri.length; i++,b++) { // a for loop add one element of the two array containing number and operator, if the last opeator that should be 1 less are undefined: do nothing if exist add 
  newArray.push(numeri[i])
  if (operatori[b] === undefined) {
      
  }
  else {
    newArray.push(operatori[b])  
  }
}
// with the new array combined as the follow      ["123",+,461,-,4546,*,545]


let operatore;                                    
let calcolo = newArray.reduce((total, amount) =>     // takes the new array total become newarray[0] and amount[+]
{
  // se amount e un operatore 
  // fai questi se * aggiungi a variabile operatore 
  // se amount e numero  fai operazione  total operatore amount 
            total = Number(total);  // this is necessarily a number 
  
            if (isNaN(amount))     // if amount is not a number like +, it is a operator 
          {
               operatore = amount;  // so add amount at operator  this leave the if statment and return total and amount become the next part of the array 
            
          } else                    // if is a number 
            { 
              amount = Number(amount); // transform amount in number 
             switch(operatore) {        // if the last operator was +  give total + amount
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
              
  return total;  // when are all the elemnt of the array finished  return total and set calcolo to total 
 })
       calcolo = maxTwoDigit(calcolo); // then exit the reduce method and call the maxtwodigit function, it returns a number
       calcolo = calcolo.toLocaleString();

return calcolo; // the function of equal return calcolo formatted with comas.
}



// ------------------ THIS FUNCTION REDUCE THE NUMBER AFTER THE DOT TO 2

function maxTwoDigit(calcolo) {
  let calcoloString = calcolo.toString();
  contain = calcoloString.search(/\./);  // Learned: search works with string 

  if (contain === -1) {
    return calcolo;
  } else {
            calcolo = Number(calcolo);
    return calcolo.toFixed(2);
  }
}











// //KEYBOARD SUPPORT

let keyboardInput = null;

addEventListener("keydown", function(e) {
    switch (e.keyCode) {
        case 13:
          let lastValue = screen.innerHTML.slice(-1,screen.innerHTML.length);
          if (isNaN(lastValue)) {
        let stringaLavorata;
        stringaLavorata = screen.innerHTML.slice(0,screen.innerHTML.length - 1);
        screen.innerHTML = equal(stringaLavorata);
        
       } else {
        screen.innerHTML = equal(screen.innerHTML);
       }
            break;
        case 46:
        case 27:     /**del e esc */
            clearAll();
            break;
        case 8:
            removeOne(screen.innerHTML);
            break;
        case 190:
        case 110:
            screen.innerHTML = searchForTheDot(screen.innerHTML)
            break;
        case 48:
        case 96:
            keyboardInput = 0;
            screen.innerHTML = addComa(screen.innerHTML,keyboardInput);
            break;
        case 49:
        case 97:
            keyboardInput = 1;
            if (screen.innerHTML === "0") {
              screen.innerHTML = "";
              screen.innerHTML += keyboardInput;
            } else {
              screen.innerHTML = addComa(screen.innerHTML,keyboardInput);
            } 
            break;
        case 50:
        case 98:
            keyboardInput = 2;
             if (screen.innerHTML === "0") {
              screen.innerHTML = "";
              screen.innerHTML += keyboardInput;
            } else {
              screen.innerHTML = addComa(screen.innerHTML,keyboardInput);
            } 
            break;
        case 51:
        case 99:
            keyboardInput = 3;
             if (screen.innerHTML === "0") {
              screen.innerHTML = "";
              screen.innerHTML += keyboardInput;
              
            } else {
              
              screen.innerHTML = addComa(screen.innerHTML,keyboardInput);
              
            } 
            break;
        case 52:
        case 100:
            keyboardInput = 4;
             if (screen.innerHTML === "0") {
              screen.innerHTML = "";
              screen.innerHTML += keyboardInput;
            } else {
              screen.innerHTML = addComa(screen.innerHTML,keyboardInput);
            } 
            break;
        case 53:
        case 101:
            keyboardInput = 5;
             if (screen.innerHTML === "0") {
              screen.innerHTML = "";
              screen.innerHTML += keyboardInput;
            } else {
              screen.innerHTML = addComa(screen.innerHTML,keyboardInput);
            } 
            break;
        case 54:
        case 102:
            keyboardInput = 6;
             if (screen.innerHTML === "0") {
              screen.innerHTML = "";
              screen.innerHTML += keyboardInput;
            } else {
              screen.innerHTML = addComa(screen.innerHTML,keyboardInput);
            } 
            break;
        case 55:
        case 103:
            keyboardInput = 7;
             if (screen.innerHTML === "0") {
              screen.innerHTML = "";
              screen.innerHTML += keyboardInput;
            } else {
              screen.innerHTML = addComa(screen.innerHTML,keyboardInput);
            } 
            break;
        case 56:
        case 104:
            keyboardInput = 8;
             if (screen.innerHTML === "0") {
              screen.innerHTML = "";
              screen.innerHTML += keyboardInput;
            } else {
              screen.innerHTML = addComa(screen.innerHTML,keyboardInput);
            } 
            break;
        case 57:
        case 105:
            keyboardInput = 9;
             if (screen.innerHTML === "0") {
              screen.innerHTML = "";
              screen.innerHTML += keyboardInput;
            } else {
              screen.innerHTML = addComa(screen.innerHTML,keyboardInput);
            } 
            break;
        case 107:
        case 187:
            keyboardInput = '+';
            screen.innerHTML = opa(keyboardInput);
            break;
        case 109:
        case 189:
            keyboardInput = '-';
            screen.innerHTML = opa(keyboardInput);   
            break;
        case 106:
            keyboardInput = '*';
            screen.innerHTML = opa(keyboardInput);
            break;
        case 111:
            keyboardInput = '/';
            screen.innerHTML = opa(keyboardInput);
            break;
      
    }
  });


function addComa(screen,keyboardInput) {
  
  let x = screen + keyboardInput;
  
  let contain = x.search(/\b[/*+-]/);
  if (contain > 0) {
    
    let operator = x.match(/\b[/*+-]/g);   // sembra non funzioni con gli array eseguendolo prima di uno split funziona
    
    x = x.split(/\b[+/*-]/); // here becomes an array
    
    let lastIndexOfX = x.length-1;
    
    
    // potrei fare se da errore  if contiene , fai replace altrimenti no 
    let ultimoArray = x[lastIndexOfX];
    ultimoArray = ultimoArray.replace(/\,/g,"");
    

    
    ultimoArray = Number(ultimoArray);
    ultimoArray = ultimoArray.toLocaleString();
    x[lastIndexOfX] = ultimoArray;
   
    
          //    qui va ricollegata la stringa mettendo il piu tra i due ;
    let riallegata = [];
    for (let i = 0, g = 0; i < x.length; i++, g++) {
      riallegata.push(x[i]);
      
      if (operator[g] === undefined) {
        
      } else {
        riallegata.push(operator[g]);
        
      }
      
    }
      x = riallegata.join("");
      return screen = x;

  } else {
    x = x.replace(/\,/g,"");   
    x = Number(x);
    x = x.toLocaleString();

    return screen = x;
    
  }              
}
// /se il numero contiene dei segni spezzalo facendo un array di numeri overo di stringhe prendi ultima stringa e fai il lavoro di aggiungere virgola  poi aggiungi gli array agli operatori e / 


  function opa(keyboardInput) {
    let lastValue = screen.innerHTML.slice(-1,screen.innerHTML.length);

    /* se ultimo Numero e' un segno operatore  AND    il tasto che clicco e un operatore  */
    if (isNaN(lastValue)) {
      /* toglimi lultimo valore e mettimi quello che clicco  */
      screen.innerHTML = screen.innerHTML.slice(0,screen.innerHTML.length - 1);
      screen.innerHTML += keyboardInput;
      
    } 
    else {
        
        if (screen.innerHTML === "0") {
          screen.innerHTML = "";
          
          screen.innerHTML += keyboardInput;
        } else {
          screen.innerHTML += keyboardInput;
          
        } 
  } return screen.innerHTML;
}



// indexOF funziona solo con una stringa e non su un numeor da errore is not a function 
// search sembra voglia una regula expression
// sembra che tocalestring funzioni solo con numeri senza segni operatori 