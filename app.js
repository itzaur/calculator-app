'use strict';
const page = document.querySelector('body');
const numbers = document.querySelectorAll('.slide__numbers a');
const slider = document.querySelector('.slide__tab div');
const input = document.querySelector('input');
const items = document.querySelectorAll('.calc__item');
const themes = ['theme2', 'theme3', 'theme4'];
let themeMode = localStorage.getItem('themeMode');

numbers.forEach(number => {
  number.addEventListener('click', function (e) {
    const id = e.currentTarget.id;
    page.classList.remove(...themes);

    if (id === '1') {
      slider.style.transform = 'translateX(0)';
      localStorage.setItem('themeMode', 'theme1');
      document.querySelector('[data-theme="theme1"]').classList.add('active');
    }

    if (id === '2') {
      slider.style.transform = 'translateX(0.9rem)';
      page.classList.add('theme2');
      localStorage.setItem('themeMode', 'theme2');
      document
        .querySelector('[data-theme="theme1"]')
        .classList.remove('active');
    }

    if (id === '3') {
      slider.style.transform = 'translateX(1.9rem)';
      page.classList.add('theme3');
      localStorage.setItem('themeMode', 'theme3');
      document
        .querySelector('[data-theme="theme1"]')
        .classList.remove('active');
    }

    if (id === '4') {
      slider.style.transform = 'translateX(3rem)';
      page.classList.add('theme4');
      localStorage.setItem('themeMode', 'theme4');
      document
        .querySelector('[data-theme="theme1"]')
        .classList.remove('active');
    }
  });
});

if (themeMode === 'theme2') {
  page.classList.add('theme2');
  document.querySelector('[data-theme="theme1"]').classList.remove('active');
  slider.style.transform = 'translateX(0.9rem)';
} else if (themeMode === 'theme3') {
  document.querySelector('[data-theme="theme1"]').classList.remove('active');
  page.classList.add('theme3');
  slider.style.transform = 'translateX(1.9rem)';
} else if (themeMode === 'theme4') {
  document.querySelector('[data-theme="theme1"]').classList.remove('active');
  page.classList.add('theme4');
  slider.style.transform = 'translateX(3rem)';
} else if (themeMode === 'theme1') {
  document.querySelector('[data-theme="theme1"]').classList.add('active');
}

input.value = 0;
let haveDot = false;
// let done = false;
let firstNumber = ['0'];
const calc = ['+', '-', 'x', '/', '='];

items.forEach(item => {
  item.addEventListener('click', e => {
    const key = e.target.textContent;

    // if (key === '.' && !haveDot) {
    //   haveDot = true;
    // } else if (key === '.' && haveDot) {
    //   return;
    // }

    input.value === '0' && !haveDot
      ? (input.value = key)
      : (input.value += key);

    if (key !== '=' && key !== 'del') {
      firstNumber.push(key);
      firstNumber = [input.value];
    }

    if (
      input.value.includes('++') ||
      input.value.includes('+-') ||
      input.value.includes('+x') ||
      input.value.includes('+/') ||
      input.value.includes('+.') ||
      input.value.includes('--') ||
      input.value.includes('-+') ||
      input.value.includes('-x') ||
      input.value.includes('-/') ||
      input.value.includes('-.') ||
      input.value.includes('xx') ||
      input.value.includes('x-') ||
      input.value.includes('x+') ||
      input.value.includes('x/') ||
      input.value.includes('x.') ||
      input.value.includes('//') ||
      input.value.includes('/+') ||
      input.value.includes('/-') ||
      input.value.includes('/x') ||
      input.value.includes('/.') ||
      input.value.includes('..')
    ) {
      input.value = input.value.slice(0, -1);
    }

    if (key === 'reset') {
      input.value = '0';
      haveDot = false;
      firstNumber.length = 0;
    }

    if (key === 'del') {
      input.value = input.value.slice(0, -4);
      haveDot = false;
      firstNumber.map(e => +e.slice(0, -1));
    }
    if (input.value === '') {
      input.value = 0;
      haveDot = false;
    }

    if (key === '=' && input.value != '' && input.value != 'undefind') {
      let arrayMath = firstNumber;

      const divide = expression => {
        const numbersArray = (expression + '').split(',').join('').split('/');
        const numbers = numbersArray.map(noString => +noString);
        const result = numbers.reduce((acc, item) => {
          if (item === 0) return Infinity;
          return acc / item;
        });
        return result;
      };
      divide(arrayMath);

      const multiply = expression => {
        const numbersArray = (expression + '').split(',').join('').split('x');
        const numbers = numbersArray.map(noString => divide(noString));
        const result = numbers.reduce((acc, item) => acc * item, 1);
        return result;
      };
      multiply(arrayMath);

      const minusMultiply = expression => {
        const numbersArray = (expression + '').split(',').join('').split('-');
        const numbers = numbersArray.map(noString => multiply(noString));
        const result = numbers
          .slice(1)
          .reduce((acc, item) => acc - item, numbers[0]);
        return result;
      };
      minusMultiply(arrayMath);

      const plusMultiply = expression => {
        const numbersArray = (expression + '').split(',').join('').split('+');
        const numbers = numbersArray.map(noString => minusMultiply(noString));
        const result = numbers.reduce((acc, item) => acc + item, 0);
        return result;
      };
      plusMultiply(arrayMath);

      input.value = plusMultiply(arrayMath).toFixed(3);
      arrayMath = [...input.value];
    }
  });
});

// let nnn;
// nnn = ['12', 'x', '1', '+', '5', 'x', '3', '/', '3', '-', '10', '/', '2'];
// const divide2 = expression => {
//   const m = (expression + '').split(',').join('').split('/');
//   console.log(m);
//   const nums = m.map(noStr => +noStr);
//   console.log(nums);
//   const res = nums.reduce((acc, no) => {
//     if (no === 0) return Infinity;
//     return acc / no;
//   });
//   console.log(res);
//   return res;
// };
// divide2(nnn);

// const multiply2 = expression => {
//   const m = (expression + '').split(',').join('').split('x');
//   console.log(m);
//   const nums = m.map(noStr => divide2(noStr));
//   console.log(nums);
//   const res = nums.reduce((acc, no) => acc * no, 1);
//   console.log(res);
//   return res;
// };
// multiply2(nnn);

// const minusMultiply2 = expression => {
//   const m = (expression + '').split(',').join('').split('-');
//   console.log(m);
//   const nums = m.map(noStr => multiply2(noStr));
//   console.log(nums);

//   const res = nums.slice(1).reduce((acc, no) => acc - no, nums[0]);
//   console.log(res);
//   return res;
// };
// minusMultiply2(nnn);

// const plusMultiply2 = expression => {
//   const m = (expression + '').split(',').join('').split('+');
//   console.log(m);
//   const nums = m.map(noStr => minusMultiply2(noStr));
//   console.log(nums);
//   const res = nums.reduce((acc, no) => acc + no, 0);
//   console.log(res);
//   return res;
// };
// plusMultiply2(nnn);

// const divide2 = expression => {
//   const m = (expression + '').split(',').join('').split('/');
//   console.log(m);
//   const nums = m.map(noStr => plusMultiply(noStr));
//   console.log(nums);
//   const res = nums.reduce((acc, no) => acc / no);
//   console.log(res);
//   return res;
// };
// divide2(nnn);
