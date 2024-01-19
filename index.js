const passwordBox = document.querySelector("[password-box]");
const copyIcon = document.querySelector("[copy-icon]");
const copyMsg = document.querySelector("[copy-msg]")
const passwordLen = document.querySelector("[password-length]");
const slider = document.querySelector("#slider");
const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');
const allcheckboxes = document.querySelectorAll("input[type = checkbox]");
const strengthIndicator = document.querySelector("[strength]");
const generate = document.querySelector('[generateButton]');


// creating string of symbols for random symbol
const symbol = '!@#$%^&*_-+=}{][|:;"<>,.?/~';
let password = '';

// default me password ki length ko 10 pr set kr rhe h
let passwordLength = 10;

handleSlider();

// function for slider
function handleSlider(){
   slider.value = passwordLength;
   passwordLen.innerText = passwordLength;

}


// strength indicator

function setindicator(){
    strengthIndicator.style.backgroundColor = "red";
    strengthIndicator.style.boxShadow = "0px 0px 10px 5px red";
}


// for random value ke liye
function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max - min)) + min;
}


// for random number
function getRandomNumber(){
    return getRandomInteger(0,9);
}


// for  random uppercase
function getUppercase(){
    return String.fromCharCode(getRandomInteger(65,91));
}

// String.fromCharCode() isse ascii value ko character me badalte hai
// range of alphabel in ascii value
// uppercase = 65 to 91 
// lowercase = 97 to 123

// for random lowercase
function getLowercase(){
    return String.fromCharCode(getRandomInteger(97,123));
}


// for symbol we can use array or string and by gererate random number and use 
// that as a index we can get random symbol

// for random symbols
function getRandomSymbol(){
  let randomsymbol = getRandomInteger(0,symbol.length);
  return symbol[randomsymbol];
} 


//  strength indicator
function calculateStrength(){
    let hasupper = false;
    let haslower = false;
    let hasnumber = false;
    let hassymbol = false;
    
    if(uppercase.checked) hasupper = true;
    if(lowercase.checked) hasupper = true;
    if(numbers.checked) hasupper = true;
    if(symbols.checked) hasupper = true;

    if(hasupper && haslower && (hassymbol || hasnumber) && passwordLength >= 8){
        setindicator("#0f0")
    }
    else if((haslower|| hasupper) && (hassymbol|| hasnumber) && passwordLength >= 6){
        setindicator("#ff0")
    }
    else{
        setindicator("#f00")
    }
}



// copy password

async function copyPassword(){
   // we can use method ye  ek async method h isliye await keyword ka use
   // hoga ye promise return krta h isliye try catch ka use krenge
 try{
    await navigator.clipboard.writeText(passwordBox.value);
    copyMsg.innerHTML = "Copied";
 }
 catch{
     copyMsg.innerHTML = "Failed";
 }
  
//  isko active class me iski property add krenge css m
 copyMsg.classList.add("dikhjao");

//  remove krne k liye set timeout ka use krenge

setTimeout(() =>{
    copyMsg.classList.remove("dikhjao");
},2000);
    

}


// copy krne ke liye event listener

copyIcon.addEventListener('click',(e)=>{
   
        copyPassword();
    
})




// get value from slider moving

slider.addEventListener('input', (e)  =>  {
  passwordLength = e.target.value;
  handleSlider();
  console.log(passwordLength)
}) 





// checkboxes ke liye 
let checkboxcount = 0;

function handlecheckboxchange(){
   checkboxcount = 0;
   allcheckboxes.forEach((value) =>{

    if(value.checked){
        checkboxcount++;
    }

   });

   if(passwordLength>checkboxcount){
            passwordLength = checkboxcount;
            handleSlider();
   }
}

allcheckboxes.forEach( (checkbox) =>{
    checkbox.addEventListener('change',handlecheckboxchange);
        
    
})


// password suffle
// function passwordsuffle(){
//     // fisher yates method
// }


// generate password event listener

generate.addEventListener('click',(e) =>{

    if(checkboxcount<=0){
        return;
    }
    
    if(passwordLength<checkboxcount){
        passwordLength = checkboxcount;
        handleSlider();
    }


    //  getRandomNumber();
    //  getRandomSymbol();
    //  getUppercase();
    //  getLowercase();


    // let's start the journey to find new password
    password = '';
     let funarray = [];

     if(uppercase.checked){
        funarray.push(getUppercase);
     }
     if(lowercase.checked){
        funarray.push(getLowercase);
     }
     if(numbers.checked){
        funarray.push(getRandomNumber);
     }
     if(symbols.checked){
        funarray.push(getRandomSymbol);
     }
     

    //  compulsury addition
     for(let i = 0;i<funarray.length;i++){
        password +=funarray[i]();
     }


    //  remaining addition of password

      for(let i = 0; i< (passwordLength-funarray.length); i++){
        let x = getRandomInteger(0,funarray.length);
        password += funarray[x]();

        
      }


    //   password is in a sequence so suffle the password

        //   password =  passwordsuffle();

    // show in display box
    passwordBox.value = password;


    // calculating strength
    calculateStrength();
})

