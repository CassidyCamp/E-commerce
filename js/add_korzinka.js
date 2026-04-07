// document.body.style.backgroundColor = 'red'

// const btn = document.querySelectorAll('.shopping')
// btn.addEventListener("click",()=>{
//     console.log('hello world');
    
// } )

// const btn = document.querySelectorAll('button'); 
// for (let i = 0; i < btn.length; i++) {
//     btn.addEventListener('click', () => { 
//     console.log('awdojjawnd');
//     });
// }

// Barcha index buttonlarni topamiz
const buttons_index = document.querySelectorAll('.shoping .info_product button');
const counter = document.querySelector('.counter_heder');
const index_img = document.querySelectorAll('.img_product img');
const korzinka_img = document.querySelector('.img-icon img');

// index_img.setAttribute('src',korzinka_img.getAttribute('src')
// korzinka_img.stayle.backroundColor = 'red'

let i = 1

// Har biriga click event qo‘shamiz
buttons_index.forEach((btn) => {
  btn.addEventListener('click', () => {
    counter.textContent = ++i 
    const cart_shop = btn.parentElement.parentElement
    const img = cart_shop.querySelector('.img_product img')
    const src_index = '.' + img.getAttribute('src')
    // korzinka_img.setAttribute('src',src_index)
    
  });
});





// karzinka counter qilish
const countFn_parent = document.querySelectorAll('.countFn')
const countFn_num = document.querySelector('.countFn p')
const remove_btn = document.querySelector('.countFn .minus_add')
const add_btn = document.querySelector('.countFn .plus_add')
const counter_num = 0



// karzinka add plus bilan add minus
countFn_parent.forEach((btn_prdct) => {
  btn_prdct.addEventListener('click', () => {
    
    
    if (btn_prdct.classList.contains('minus_add')) {
      countFn_num.textContent = --i 
    }

    // Agar tugma REMOVE bo'lsa
    if (btn_prdct.classList.contains('plus_add')) {
      countFn_num.textContent = ++i 
    }
    
    console.log('wawdaw');
  });
  console.log(btn_prdct);
});




/*// karzinka counter qilish
const countFn_parent = document.querySelectorAll('.countFn');

countFn_parent.forEach((counterBox) => {
  const countNum = counterBox.querySelector('p');        // har bir blokdagi son
  const remove_btn = counterBox.querySelector('.minus_add');
  const add_btn = counterBox.querySelector('.plus_add');

  let i = 0; // har bir blok uchun alohida sanagich

  // Minus tugmasi
  remove_btn.addEventListener('click', () => {
    if (i > 0) { // manfiy bo'lmasligi uchun
      i--;
      countNum.textContent = i;
    }
  });

  // Plus tugmasi
  add_btn.addEventListener('click', () => {
    i++;
    countNum.textContent = i;
  });
});

 */