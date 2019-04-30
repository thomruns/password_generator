// generate a random secure password of any length
//  Must contain at least one number
//  Must contain at least one uppercase character
//  Must contain at least one special character from a select list

// DOM elements
let button = document.querySelector('button');
let results = document.querySelector('.results');
let pwLength = document.querySelector('#pw-length');

const data = {
  ucL: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z'],
  lcL: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','p','q','r','s','t','u','v','w','x','y','z'],
  specChars: ['!','?','>','^','*','$','&','#'],
  nums: [0,1,2,3,4,5,6,7,8,9],
  pwArray: []
}


// generate a random number
randomNum = (max) => {
  return Math.floor(Math.random()*max);
}
// generate a random uppercase letter
const randomULetter = (max) => {
  // pick a random number up to a max number
  let ranNum = randomNum(max);
  // pick array member corresponding to that index number
  let ranULet = data.ucL[ranNum];
  // return that array member
  return ranULet;
}

// generate a random lowercase letter
const randomLLetter = (max) => {
  let ranNum = randomNum(max);
  let ranLLet = data.lcL[ranNum];
  return ranLLet;
}

// generate a random special character
const randomSpecChar = (max) => {
  let ranNum = randomNum(max);
  let ranChar = data.specChars[ranNum];
  return ranChar;
}

// create a random order number
const randOrder = () => Math.floor(Math.random()*data.specChars.length);

// clear results
clearResults = () => {
  results.textContent = '';
  data.pwArray = [];
};


// construct the random password
constructPW = (lmax, nummax, charmax) => {
  // clear the UI results field
  clearResults();
  let specCharsPresent = false;
  let lcLettersPresent = false;
  let ucLettersPresent = false;
  let numPresent = false;

  
  for(let i = 0; i <= (pwLength.value - 1); i++) {
    let iterator = randOrder();
    // console.log(`iterator: ${iterator}`);
    if(iterator === 0 || iterator === 4) {
      data.pwArray.push(randomLLetter(lmax));
      lcLettersPresent = true;
    } else if (iterator === 1 || iterator === 5) {
      data.pwArray.push(randomNum(nummax));
      numPresent = true;
    } else if (iterator === 2 || iterator === 6) {
      data.pwArray.push(randomSpecChar(charmax));
      specCharsPresent = true;
    } else if (iterator === 3 || iterator === 7) {
      data.pwArray.push(randomULetter(lmax));
      ucLettersPresent = true;
    }
  }


  if( specCharsPresent && lcLettersPresent && ucLettersPresent && numPresent ) {
    let newPWord = data.pwArray.join('');
    return newPWord;
  } else {
    console.log('special characters:', specCharsPresent);
    console.log('lowercase:', lcLettersPresent);
    console.log('uppercase:', ucLettersPresent);
    console.log('numbers:', numPresent);
  }
}

// add button click event listener
button.addEventListener('click', () => {
  const l = data.ucL.length;
  const n = data.nums.length;
  const c = data.specChars.length;

  let newPW = constructPW(l, n, c);
  if(newPW) {
    if(results.classList.contains('error')){
      results.classList.remove('error');
    }
    results.classList.add('generated');
    results.textContent = newPW;
  } else {
    if(results.classList.contains('generated')) {
      results.classList.remove('generated');
      results.classList.add('error');
    }
    results.textContent = 'Sorry...please try again!';
  }
});


