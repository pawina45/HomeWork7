const loginForm = document.querySelector(".login-form");

// โจทย์ : ให้สร้างฟังก์ชั่นเพื่อ validate(ตรวจสอบ) ค่าที่ submit จาก form
// 1. ทุก input ต้องไม่เป็นค่าว่างหรือ ใส่ space มาล้วนๆ
// 2. username ความยาวต้องมากกว่า 3 ตัวอักษร
//      - ตัด space หน้า-หลัง
//      (option) - และไม่มี space คั่นกลาง
//      - ห้ามนำหน้าด้วยตัวเลข
// 3. password ความยาวต้องมากกว่า 4 ตัวอักษร
//      (option) - ต้องมีทั้งตัวเลขและตัวอักษร
// ถ้า validate ไม่ผ่านให้เปลี่ยน input เป็นสีแดง
// ถ้า validate ผ่านให้ไปที่ https://www.example.com
// หรือ
// ถ้า validate ผ่านให้ไปทำการ login โดยตรวจสอบ username, password
// กับ array แบบที่เคยทำตอนโจทย์ javascript แล้วแจ้ง login successful

const userPass = [
  ['admin23' , 'admin1234'],
  ['admin1234' , 'admin123'],
  ['pawina' , 'pawina45'],
]

const changeColor = (selector) => {
  const el = document.querySelector(selector);
  console.log(el)
  if(el){
    el.style.border = '4px solid red';
    el.style.bordercolor = 'red';
  }
}

const validateInput = (inputObj) => {
  console.log(inputObj);
  const username = inputObj.username;
  const password = inputObj.password;
  const role = inputObj.role;
  // console.log(username);
  // console.log(password);
  // console.log(role);

  if(username.includes(' ')||password.includes(' ')||role.includes(' ')){
    alert('มีบางอย่างไม่ถูกต้องห้ามมีช่องว่าง');
    return false;
  }

  const trimUse = username.trim();
  if (trimUse <= 3 || /^\d/.test(trimUse) || trimUse.includes(' ')){
    alert('มีบางอย่างไม่ถูกต้อง ชื่อผู้ใช้ ห้ามมีตัวเลขนำหน้า \n หรือต้องมีความยาวมากกว่า 3 ตัวอักษร และห้ามมีการเคาะที่ว่าง');
    changeColor('#username');
    return false;
  }
  if ((password.length) <= 4||!/\d/.test(password)||!/[a-zA-Z]/.test(password)){
    alert('มีบางอย่างไม่ถูกต้อง รหัสผ่านต้องมากกว่า 4 ตัว และต้องมีทั้งตัวเลขและตัวอักษร');
    changeColor('#password');
    return false;
  }

  if (role === ''){
    alert('กรุณาระบุลักษณะการเข้าใช้งาน');
    changeColor('#role');
    return false;
  }

  puraCheckUseLog(username,password);
  return true
};

const puraCheckUseLog = (username, password) => {
  console.log(username);
  console.log(password);

  let foundItem = userPass.find(([user, pass]) => user === username && pass === password);

  if (foundItem) {
    alert('login Successful');
    window.location.assign('https://www.example.com');
  } else {
    alert('ไม่พบชื่อผู้ใช้หรือรหัสผ่านในระบบ');
  }
}

const hdlLogin = (e) => {
  e.preventDefault();
  // console.log(loginForm.elements);
  let inputObj = {};
  for (let el of loginForm.elements) {
    inputObj[el.id] = el.value;
  }
  validateInput(inputObj);
};


loginForm.addEventListener("submit", hdlLogin);




