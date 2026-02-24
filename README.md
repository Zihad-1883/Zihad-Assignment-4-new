# Answers to Questions

## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

## Answer : By using getElementById, we get a specific element from the HTML file with a unique ID name. We use this to capture and manipulate a single html element through JavaScript.
And for getElementsByClassName, if we use this, we can select multiple elements from a HTML file with the same class name. if we want to manipulate all the elements with one single class, we have to use loops.
querySelector catches the first matching HTML element using CSS selector and querySelectorAll selects all the matching HTML elements using CSS selector.


## 2. How do you create and insert a new element into the DOM?

## Answer : We can create a new element by using document.createElement(). Here we have to write what kind of element we want to create . For example, if we want to create a new div section, we will use 
document.createElement('div'). For inserting a new element, we need to use appendChild. The structure is like this : parent.appendChild('new element'). For example, if we want to create a new div and add it to the body , we will use :

const newDiv = document.createElement('div')
newDiv.innerText = 'This is a new div created through JS'; 
body.appendChild('newDiv')


## 3. What is Event Bubbling? And how does it work?

## Answer : Event bubbling in JS means when an event happens in a child element, it executes on that child element first then it goes upside in the DOM tree through it's parents. For example : 

<body>
  <section>
    <div>
      <h1 id="heading">This is cool</h1>
    </div>
  </section>
</body>

if we catch the heading id by getElementByID and add some events there the event will first happen to the h1 tag then one by one it will also happen to the div, section and body tags.


## 4. What is Event Delegation in JavaScript? Why is it useful?

## Answer : Event Delegation in JavaScript is attaching a single event listener to only a parent element without attaching it to any of it's child elements. It is useful because it is a dynamic process and it helps code work better and also keeps the code cleaner overall.


## 5. What is the difference between preventDefault() and stopPropagation() methods?

## Answer : preventDefault() is used to stop the broeser's default behaviour . Like if we don't want to get usual link navigation and try to control it through JS, we use preventDefault(). 
stopPropagation() is used to prevent event bubbling from happening. So preventDefault() stops deafault behaviour of the browser and stopPropagation() prevents event bubbling
