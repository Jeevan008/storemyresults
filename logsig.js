$('.message a').click(function () {
  $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
});


const register = document.querySelector('.register-form')
const signup = document.querySelector("#signup")
const userlogin = document.querySelector('.login-form')
const login = document.querySelector("#login")

signup.addEventListener("click", (e) => {
  e.preventDefault()

  const email = register.querySelector('input[name="email"]').value
  const password = register.querySelector('input[name="password"]').value
  const name=register.querySelector('input[name="name"]').value

  var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

  if (!reg.test(email)) {
     alert('enter valid email')
     return
  }
  if (password.length <= 6) {
     alert('enter min 6 letter pass')
     return
  }
  console.log(name,email,password);

  fetch(`/sign`, {
     method: 'POST',
     headers: {
        'Content-type': 'application/json'
     },
     body: JSON.stringify({
        email,
        name,
        password
     })
  })
     .then((result) => {
        return result.json()
     })
     .then(json => {
       console.log(json);
       window.location.href=json.redirect;
     })
     .catch(err => console.log(err))

     //clear input values
     register.querySelector('input[name="email"]').value="";
     register.querySelector('input[name="password"]').value="";
     register.querySelector('input[name="name"]').value="";

})

login.addEventListener("click", (e) => {
  e.preventDefault()

  const email = userlogin.querySelector('input[name="email"]').value
  const password = userlogin.querySelector('input[name="password"]').value

  var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

  if (!reg.test(email)) {
     alert('enter valid email')
     return
  }
  if (password.length <= 6) {
     alert('enter min 6 letter pass')
     return
  }

  fetch(`/login`, {
     method: 'POST',
     headers: {
        'Content-type': 'application/json'
     },
     body: JSON.stringify({
        email,
        password
     })
  })
     .then((result) => {
        return result.json()
     })
     .then(json => {
        alert("succesfuly logged in")
      window.location.href=json.redirect;
   
     })
     .catch(err => console.log(err))
})