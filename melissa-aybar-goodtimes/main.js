// grab our header and our desktop header
//we insert the contents of our header into the desktop one

const header= document.querySelector('.header')
const desktopHeader= document.querySelector('.header-desktop')
desktopHeader.innerHTML= header.innerHTML

//when the header enters the viewport hide the desktop header
//when the header leavers ,show it (by adding the visible class)

inView('.header')
.on('enter',el=> desktopHeader.classList.remove('visible'))
.on('exit', el =>desktopHeader.classList.add('visible'))

//here enable tilte libray
VanillaTilt.init(document.querySelectorAll(".image"),{
  max:25,
  speed:400
});

inView('.fade')
.on('enter',img=> img.classList.add('visible'))
.on('exit', img =>desktopHeader.classList.remove('visible'))

//when we click the .register-button, run a function
//grab the .front element and add a class of.slide-up
const registerButton = document.querySelector('.register-button')
registerButton.addEventListener('click', event => {
  event.preventDefault()
  const frontEl = document.querySelector('.front')
  frontEl.classList.add('slide-up')
})

// Create a Stripe client.
const stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// Create an instance of Elements.
const elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
const style = {
  base: {
    color: '#32325d',
    lineHeight: '18px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element.
const card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  const displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission.
const form = document.getElementById('payment-form');
const errorElement = document.getElementById('card-errors');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  form.classList.add('processing')

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      //unlock form
      form.classList.remove('processing')
      // Inform the user if there was an error.
      
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server.
      stripeTokenHandler(result.token);
    }
  });
});

function stripeTokenHandler(token){

  // we are going to make a variable for our token, name and email
 const stripe_token = token.id
 const name = document.querySelector('#name').value
 const email = document.querySelector('#email').value
  //we are going to grab our form action url from the form
 const url = form.getAttribute('action')
  //we will sne dthe data off to the url using fetch
 fetch(url, {
   //we tell fetch to post to our usrl vs GET
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
   //we also need to make sure the data is ready and secure
  body: JSON.stringify({
    order:{
      //is the same as stripe_token: stripe_
      stripe_token,
      //same as name:name
      name,
      email
    }
  })
})
  .then(response => response.json())
  .then(data => {
   
   //tell the user that their payment was successful
   form.querySelector('.form-title').textContent ='Payment successful!'
   form.querySelector('.form-fields').textContent =`Thank you ${name}, your payment was successful and we have sent an email reciept to ${email}`
   form.classList.remove('processing')
 
 })
.catch(error =>{
   form.classList.remove('processing')
   errorElement =`There was an error with paymen, please try again or contact us at help@goodtimes.com`
 })
console.log(stripe_token,name,email)
}

// grab all the anchor tags on the page
const anchors = document.querySelectorAll('a')
// loop over them
anchors.forEach(anchor => {
  // listen for clicks on each one
  anchor.addEventListener('click', event => {
    // grab the href attribute
    const href = anchor.getAttribute('href')
    // if the href starts with a #
    if (href.charAt(0) === '#') {
      // stop the default action
      event.preventDefault()
      // find the element the href points to and scroll it into view
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      })
    }
  })
})


