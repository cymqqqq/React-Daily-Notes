import React, { Component, createRef } from "react";

/*

Hey jack, it's Nate from Fullstack React.

When using React, our default mindset should be that we don't imperatively modify the DOM, 
but instead that we pass in props and then re-render the component. 
But sometimes there are situations where imperative actions are necessary.

Refs in React provides a way to access the React elements (or DOM nodes) created in the render() method.

When parent components need to interact with children components, 
we typically use props However, 
in some cases we might need to modify a child without re-rendering it with new props. 
That's when refs get the spotlight.

Below, I'm going to explain (and show you code) for a few examples on how to use refs in React.
*/

/*
When Should I use Refs?
We advise to use refs in the following situations:

Integrating with third-party DOM libraries.
Triggering imperative animations.
Managing focus, text selection, or media playback.
So once we've determined that we really should be using refs, how do we use them?

Using Refs in React
There are various ways in which you can use refs:
*/

/*
React.createRef()
Refs can be created by using the React.createRef() function and attached to an HTML element in a React component via the ref attribute.

A ref is usually created inside a component's constructor so as to make it usable throughout the component. For example:
*/

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.firstRef = createRef();
    }

    render() {
        return <div ref={this.firstRef} />;
    }
}

/*
As you can see above:

a ref instance is created in the constructor as this.firstRef and
it's assigned to a ref in the div inside the render() function. 
Let's look at an example of how to use refs in a React component.
Focus an Input using Refs
Here's another example:
Here's the code:
*/

class CustomTextInput extends Component {
    constructor(props) {
        super(props);
        //create a ref to store the textinput DOM element
        this.textInput = createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
    }

    focusTextInput() {
        //Explicitly focus the text input using the row DOM API
        //Note: we're accessing "current" to get the DOM node
        this.textInput.current.focus();
    }
    
    render() {
        //tell React that we want to assciate the ref
        //with the 'textinput' that we created in the constructor
        return (
            <div>
                <input 
                    type="button"
                    value="focus the text input"
                    onClick={this.focusTextInput}/>
            </div>
        )
    }
}
/**
 * In the code block above, we've built a button that automatically focuses on an input field when it's clicked on.

We start by creating a ref instance and setting it to this.textInput in the constructor method and then assigning it to the input field via the ref attribute.

<input type="text" ref={this.textInput} />
       
Note that when the ref attribute is used on an HTML element (in this case the input field), the ref created in the constructor (with React.createRef()) receives the underlying DOM element in the current value.

This means to access the DOM value, we need to write something like this:

               
this.textInput.current
          
The second input field is the button that will be clicked on to auto focus on the first input field. It has an onClick attribute set to the this.focusTextInput function.
              
<input
  type="button"
  value="Focus the text input"
  onClick={this.focusTextInput}
/>
          
The focusTextInput() function uses the JavaScript standard DOM function .focus() to focus the cursor on the text input box.
                  
focusTextInput() {
  this.textInput.current.focus();
}
           
Lastly, the focusTextInput function is bound in the constructor method like this:
                 
this.focusTextInput = this.focusTextInput.bind(this);
          
Getting Values from a ref

 * 
 */
//n this example, we'll see how to set an input field to a ref and then get the value of the ref.

///In this example, 
///we create an input field where we enter a value. 
///Then, when the submit button is clicked, 
///we'll read this value and log it to the console.

class CustomRefTextInput extends Component {
    constructor(prop) {
        super(props);
        //create a ref to store the textinput DOM element
        this.textInput = createRef();
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.textInput.current.value);
    };

    render() {
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input type="text" ref={this.textInput}/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

/*
Again, we use the React.createRef() function to create a ref instance and then we assign it to the instance variable this.textInput.

In the render function, 
the form contains the input field whose value we want to read. How do we read this value? 
By assigning a ref to the input and then reading the value from that ref.
 */

<input type="text" ref={this.textInput} />
/*
The form has an onSubmit function of this.handleSubmit which logs the value of the input field to the console.
*/
handleSubmit = e => {
    e.preventDefault();
    console.log(this.textInput);
  };

/*
Notice that it has one property current, which is an HTMLInputElement. 
This is the input DOM element itself and not the actual value. 
To get at the value of the input tag, 
we have to acess this.textInput.current.value as seen below:
*/
handleSubmit = e => {
    e.preventDefault();
    console.log(this.textInput.current.value);
  };

/*
Using refs is a straightforward way to get the values from form controls: just assign a ref to an input field and extract the value when you need it.

Read the rest of the refs guide
There's more to learn about refs than we can cover in this email:

Using callback refs
Using string refs and
Using forwarding refs, which are handy for advanced "higher order components"
*/