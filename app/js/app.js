(function () {
  const site = document.querySelector('.site')
  const trigger = document.querySelector('.trigger')
  let screenReaderText = document.querySelector('.trigger .screen-reader-text')

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyB3VC7v1d2vsWnxYbH09xGRFboAqrAEn14",
    authDomain: "mycontactform-5858e.firebaseapp.com",
    databaseURL: "https://mycontactform-5858e.firebaseio.com",
    projectId: "mycontactform-5858e",
    storageBucket: "",
    messagingSenderId: "539074768803"
  }
  firebase.initializeApp(config)

  // Reference messages collection
  let messagesRef = firebase.database().ref('messages')

  // Listening for form submit
  const form = document.getElementById('contactForm')
  const submit = document.getElementById('submit')
  form.addEventListener('submit', submitForm)

  // Submit form
  function submitForm (e) {
    e.preventDefault()

    // Get values
    let name = getInputVal('name')
    let email = getInputVal('email')
    let comments = getInputVal('comments')

    // Save message
    saveMessage(name, email, comments)

    // Show alert
    document.querySelector('.alert-success').style.display = 'block'

    // Hide alert after 4 seconds
    setTimeout(function () {
      document.querySelector('.alert-success').style.display = 'none'
    }, 4000)

    // Reset form fields
    document.getElementById('contactForm').reset()
  }

  function getInputVal (id) {
    return document.getElementById(id).value
  }

  // Save messages to firebase
  function saveMessage (name, email, comments) {
    let newMessageRef = messagesRef.push()
    newMessageRef.set({
      name,
      email,
      comments
    })
  }

  // Sticky nav
  const nav = document.querySelector('.mainNav')
  const menuitems = nav.querySelectorAll('mainNav-menu a')
  const menuarray = Array.apply(null, menuitems)
  const topOfNav = nav.offsetTop
  const bigDevice = window.matchMedia( "(min-width: 801px)" );

  function fixNav() {
    if(window.scrollY >= topOfNav) {
      if (bigDevice.matches) {
        // window width is at least 801px
        document.body.style.paddingTop = nav.offsetHeight + 'px'
        document.body.classList.add('fixed-nav')
      } else {
        // window width is less than 801px
        document.body.style.paddingTop = 0
      }
      
    } else {
      document.body.style.paddingTop = 0
      document.body.classList.remove('fixed-nav')
    }
  }

  window.addEventListener('scroll', fixNav)

  // Toggle reveal class on body element, set aria-expanded and screen reader text on trigger:
  function revealMenu () {
    site.classList.toggle('reveal')
    nav.classList.add('open')
    trigger.getAttribute('aria-expanded') === 'false' ? trigger.setAttribute('aria-expanded', true) : trigger.setAttribute('aria-expanded', false)
    screenReaderText.innerHTML === 'Reveal menu' ? screenReaderText.innerHTML = 'Hide menu' : screenReaderText.innerHTML = 'Reveal menu'
  }

  // Hide nav area when focus shifts away:
  function catchFocus () {
    if (trigger.getAttribute('aria-expanded') === 'true' && !(menuarray.includes(document.activeElement) || document.activeElement === trigger)) {
      revealMenu()
    } else {
      return
    }
  }

  function removeMenu () {
    if (trigger.getAttribute('aria-expanded') === 'false') {
      nav.classList.remove('open')
    }
  }

  // Hide nav area when touch or click happens elsewhere:
  function clickTarget (e) {
    if (trigger.getAttribute('aria-expanded') === 'true' && !nav.contains(e.target)) {
      revealMenu()
    }
  }

  // Listen for clicks on trigger button:
  trigger.addEventListener('click', revealMenu, false)

  // Listen for focus changes:
  site.addEventListener('focusin', catchFocus, true)

  // Listen for clicks:
  site.addEventListener('click', function (e) { clickTarget(e) }, true)
  site.addEventListener('transitionend', removeMenu, false)
})()
