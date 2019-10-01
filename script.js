let display = [];
let count = 0;
let parenth = 0;
let number = 0;
let status = false;
let dot = false;
let sign = false;
let operation = 0;

function add(a, b){
  return a + b;
}

function subtract(a, b){
  return a - b;
}

function multiply(a, b){
  return a * b;
}

function divide(a, b){
  return a / b;
}

function parenthKiller(array){
  let start = 0;
  let end = 0;
  let deleteCount = 0;
  while(array.includes(')')){
    end = array.findIndex(value => value === ')' );
    for(let i = end; i >= 0; --i){
      if(array[i] === '('){
        start = i;
        break;
      }
    }
    deleteCount = (end - start) + 1;
    array.splice(start, deleteCount, argumentMaker(array.slice(start, end)));
  }
  while(array[0] === '('){
    array.shift();
  }
  argumentMaker(array);
  display = array.toString().replace(/,/g, '').split('');
  if(display.includes('.')){
    dot = true;
  }
  if(display.includes('-')){
    sign = true;
  }
  number = 0;
  count = 0;
  for(let i in display){
    if(/[0-9]/.test(display[i])){
      ++number;
    }
    ++count;
  }
  return;
}

function argumentMaker(array){
  if(array.includes('(')){
    array.splice(array.findIndex(value => value === '('), 1);
  }
  while(array.includes('/') || array.includes('*') || array.includes('-') || array.includes('+')){
    let operation = '';
    let start;
    let end;
    let a = '';
    let b = '';
    let i = 0;
    let deleteCount = 0;
    let ex = 0;
    let savedopera = 0;
    if(array.includes('e')){
      end = array.findIndex(value => value === 'e');
      for(i = end; /[0-9]/.test(array[i - 1]) || array[i - 1] === '.'; --i);
      start = i;
      end += 4;
      deleteCount = end - start + 1;
      ex = array.slice(start, end).toString().replace(/,/g, '');
      for(i = end; /[0-9]/.test(array[i]); ++i);
      switch(array[i]){
        case '+': savedopera = '+';
        break;
        case '-': savedopera = '-';
        break;
        case '/': savedopera = '/';
        break;
        case '*': savedopera = '*';
      }
      array.splice(start, deleteCount);
    }
    if(array.includes('/') || array.includes('*')){
      end = array.findIndex(value => value === '/' || value === '*');
      array[end] === '/' ? operation = '/' : operation = '*';
      for(i = end; /[0-9]/.test(array[i - 1]) || array[i - 1] === '.'; --i);
      start = i;
      a = Number(array.slice(i, end).toString().replace(/,/g, ''));
      for(i = end; /[0-9]/.test(array[i + 1]) || array[i + 1] === '.'; ++i);
      b = Number(array.slice(end + 1, i + 1).toString().replace(/,/g, ''));
      end = i;
      deleteCount = (end - start) + 1;
      operation === '/' ? array.splice(start, deleteCount , divide(a, b)) : array.splice(start, deleteCount, multiply(a, b));
    }else if(array.includes('-') || array.includes('+')){
      end = array.findIndex(value => value === '-' || value === '+' );
      array[end] === '-' ? operation = '-' : operation = '+';
      for(i = end; /[0-9]/.test(array[i - 1]) || array[i - 1] === '.'; --i);
      start = i;
      a = Number(array.slice(i, end).toString().replace(/,/g, ''));
      for(i = end; /[0-9]/.test(array[i + 1]) || array[i + 1] === '.'; ++i);
      b = Number(array.slice(end + 1, i + 1).toString().replace(/,/g, ''));
      end = i;
      deleteCount = (end - start) + 1;
      operation === '-' ? array.splice(start, deleteCount, subtract(a, b)) : array.splice(start, deleteCount, add(a, b));
    }
    if(ex){
      deleteCount = array.length;
      a = Number(ex);
      b = Number(array.toString().replace(/,/g, ''));
      if(savedopera === '/'){
        array.splice(0, deleteCount, divide(a, b));
      }else if(savedopera === '*'){
        array.splice(0, deleteCount, multiply(a, b));
      }else if(savedopera === '-'){
        array.splice(0, deleteCount, subtract(a, b));
      }else if(savedopera === '+'){
        array.splice(0, deleteCount, add(a, b));
      }
    }
  }
  return array.toString();
}

function error(value){
  const error1 = "It's not possible to input more than 15 digits.";
  const error2 = 'Invalid format.';
  const error3 = "It's not possible to input more than 105 characters.";
  switch(value){
    case 1: document.querySelector('.errorSpan').textContent = error1;
    break;
    case 2: document.querySelector('.errorSpan').textContent = error2;
    break;
    case 3: document.querySelector('.errorSpan').textContent = error3;
  }
  document.querySelector('.error').style.display = 'block';
  return;
}

function endError(){
  document.querySelector('.error').style.display = 'none';
  return;
}

function checkNumber(array){
  let i = (array.length - 1);
  do{
    if(/[0-9]/.test(array[i])){
      return true;
    }
    --i;
  }while(i >= 0 && array[i] !== '/' && array[i] !== '*' && array[i] !== '-' && array[i] !== '+');
  return false;
}

function findNumber(array){
  let i = (array.length - 1);
  for(; i >= 0 && (/[0-9]/.test(array[i]) || array[i] === '.'); --i);
  return ++i;
}

function findSign(array){
  let i = (array.length - 1);
  for(; i >= 0 && (array[i] != '-' && array[i - 1] != '('); --i);
  return i;
}

window.addEventListener('click', event);
window.addEventListener('keydown', event);
window.addEventListener('click', help);

function help(e){
  value = e.target.accessKey;
  if(value === 'help'){
    if(document.querySelector('.help').style.display === 'none'){
      document.querySelector('.help').style.display = 'block';
      document.querySelector('.helpExpand').style.display = 'none';
    }else{
      document.querySelector('.help').style.display = 'none';
      document.querySelector('.helpExpand').style.display = 'block';
    }
  }else{
    return;
  }
}

function event(e){
  if(document.querySelector('.error').style.display === 'block'){
    endError();
  }
  value = e.target.accessKey || e.key;
  if(count === 0){
    status = false;
  }
  if(!value){
    return;
  }else if(!status){
    if(/[0-9]/.test(value)){
      display[count++] = value;
      ++number;
      status = true;
    }else if(value === '.'){
      display[count++] = '0';
      display[count++] = '.';
      ++number;
      dot = true;
      status = true;
    }else if(value === '('){
      display[count++] = '(';
      ++parenth;
      status = true;
    }else if(value === 's'){
      display[count++] = '(';
      display[count++] = '-';
      ++parenth;
      ++operation;
      status = true;
      sign = true;
    }else{
      return;
    }
  }else{
    if(value === 'Escape'){
      count = 0;
      parenth = 0;
      number = 0;
      sign = false;
      dot = false;
      while(display[0]){
        display.pop();
      }
    }  
    if(value === 'Backspace' || value === 'Delete'){
      if(/[0-9]/.test(display[count - 1])){
        --count;
        --number;
        display.pop();
      }else if(display[count - 1] === '-' && display[count - 2] === '('){
        --count;
        sign = false;
        --operation;
        display.pop();
      }else if((display[count - 1] === '/' || display[count - 1] === '*' || display[count - 1] === '-' || display[count - 1] === '+')){
        --count;
        --operation;
        display.pop();
        for(let i in display){
          if(/[0-9]/.test(display[i])){
            ++number;
          }
          if(display[i] === '/' || display[i] === '*' || display[i] === '-' || display[i] === '+'){
            number = 0;
          }
        }
      }else if(display[count - 1] === '.'){
        --count;
        dot = false;
        display.pop();
      }else if(display[count - 1] === ')'){
        --count;
        ++parenth;
        display.pop();
      }else if(display[count - 1] === '('){
        --count;
        --parenth;
        display.pop();
      }
    }
    if(count === 105){
      error(3);
      return;
    }else if(/[0-9]/.test(value)){
      if(number === 15){
      error(1);
      return;
      }else if(display[count - 1] === ')'){
        display[count++] = '*';
        display[count++] = value;
        ++operation;
        ++number;
      }else{
        display[count++] = value;
        ++number;
      }
    }else if(value === '('){
      if(/[0-9]/.test(display[count - 1]) || display[count - 1] === '.' || display[count - 1] === ')'){
        if(parenth){
          display[count++] = ')';
          --parenth;
        }else{
          display[count++] = '*';
          display[count++] = '(';
          number = 0;
          ++parenth;
          ++operation;
        }
      }else{
        display[count++] = '(';
        ++parenth;
      }
    }else if(value === '.'){
      if(count === 15){
        error(1);
        return;
      }else if(!dot){
        if(/[0-9]/.test(display[count - 1])){
          display[count++] = '.';
          dot = true;
        }else{
          display[count++] = '0';
          display[count++] = '.';
          dot = true;
          ++number;
        }
      }else{
        return;
      }
    }else if((value === '/' || value === '*' || value === '-' || value === '+')){
      if(display[count - 1] === value) return;
      if(checkNumber(display)){
        if(display[count - 1] === '/' || display[count - 1] === '*' || display[count - 1] === '-' || display[count -1] === '+'){
          display[count - 1] = value;
        }else{
          display[count++] = value;
          ++operation;
          number = 0;
        }
      }else if((display[count - 1] === '-' || display[count - 1] === '+') && (value === '-' || value === '+')){
       if(value === '+'){
            display[count - 1] = value;
            number = 0;
            sign = false;
        }else{
        display[count - 1] = value;
        number = 0;
        sign = true;   
        }
      }else if(value === '+' || value === '-'){
        if(value === '+'){
          display[count ++] = value;
          number = 0;
          sign = false;
          --operation;
        }else{
          display[count ++] = value;
          number = 0;
          sign = true;
          ++operation;
        }
      }else{
        return;
      }
    }else if(value === 's' || value === 'S'){
      if(sign){
        display.splice(findSign(display) - 1, 2);
        count -= 2;
        sign = false;
        --parenth;
        --operation;
      }else{
        if(number){
          display.splice(findNumber(display), 0, '(');
          display.splice(findNumber(display), 0, '-');
          count += 2;
          sign = true;
          ++parenth;
          ++operation;
        }else{
          display[count++] = '(';
          display[count++] = '-';
          sign = true;
          ++parenth;
          ++operation;
        }        
      }
    }else if(value === 'Enter'){
      if(operation && number){
        parenthKiller(display);
      }else{
        error(2);
        return;
      }
    }  
  }
  if(count <= 20){
    document.querySelector('.sd1').textContent = '';
    document.querySelector('.sd2').textContent = '';
    document.querySelector('.sd3').textContent = '';
    document.querySelector('.mainDisplay').textContent = display.toString().replace(/,/g, '');
  }else if(count > 20){
    document.querySelector('.mainDisplay').textContent = '';
    document.querySelector('.sd1').textContent = display.toString().replace(/,/g, '').substring(0, 35);
    document.querySelector('.sd2').textContent = display.toString().replace(/,/g, '').substring(35, 70);
    document.querySelector('.sd3').textContent = display.toString().replace(/,/g, '').substring(70, 105);
  }
  return;
}