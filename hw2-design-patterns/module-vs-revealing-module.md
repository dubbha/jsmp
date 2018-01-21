[[<<<]](README.md)

# Module vs Revealing Module
## Module
``` javascript
var myModule = (function () {

  // A private counter variable
  var myPrivateVar = 0;
 
  // A private function which logs any arguments
  var myPrivateMethod = function(foo) {
    console.log(foo);
  };
 
  return {
 
    // A public variable
    myPublicVar: "foo",
 
    // A public function utilizing privates
    myPublicFunction: function(bar) {
 
      // Increment our private counter
      myPrivateVar++;
 
      // Call our private method using bar
      myPrivateMethod(bar);
 
    }
  };
 
})();

// Usage
myModule.myPublicFunction('Hey');  // Hey
```
- Freedom to have private functions and private members which can only be consumed by our module. As they aren't exposed to the rest of the page (only our exported API is), they're considered truly private.
- Given that functions are declared normally and are named, it can be easier to show call stacks in a debugger when we're attempting to discover what function(s) threw an exception.
- enables us to return different functions depending on the environment. 

### Import mixins variation
This variation of the pattern demonstrates how globals (e.g jQuery, Underscore) can be passed in as arguments to our module's anonymous function. This effectively allows us to import them and locally alias them as we wish.
``` javascript
var myModule = (function ( jQ, _ ) {
 
  function privateMethod1(){
      jQ(".container").html("test");
  }

  function privateMethod2(){
    console.log( _.min([10, 5, 100, 2, 1000]) );
  }

  return{
      publicMethod: function(){
          privateMethod1();
      }
  };
 
// Pull in jQuery and Underscore
})( jQuery, _ );

// Usage 
myModule.publicMethod();
```
### Exports variation
``` javascript
var myModule = (function () {
 
  // Module object
  var module = {},
    privateVariable = "Hello World";
 
  function privateMethod() {
    // ...
  }
 
  module.publicProperty = "Foobar";

  module.publicMethod = function () {
    console.log(privateVariable);
  };

  module.publicMethodCallingOtherMethod = function () {
    module.publicMethod();   // have to use module name again when calling another public method or variable
  }
 
  return module;
 
})();

// Usage
console.log(myModule.publicProperty);       // Foobar
myModule.publicMethod();                    // Hello World
myModule.publicMethodCallingOtherMethod();  // Hello World
```

[Addy Osmani: Module Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)

[[UP]](#)

## Revealing Module
The Revealing Module pattern came about as Heilmann was frustrated with the fact that he had to repeat the name of the main object when we wanted to call one public method from another or access public variables.  He also disliked the Module pattern’s requirement for having to switch to object literal notation for the things he wished to make public.
``` javascript
var myRevealingModule = (function () {

  var privateVar = "Ben Cherry",
      publicVar = "Hey there!";

  function privateFunction() {
      console.log("Name: " + privateVar);
  }

  function publicSetName( strName ) {
      privateVar = strName;
  }

  function publicGetName() {
      privateFunction();
  }

  // Reveal public pointers to
  // private functions and properties
  return {
      setName: publicSetName,
      greeting: publicVar,
      getName: publicGetName
  };

})();

// Usage 
myRevealingModule.getName();                // Name: Ben Cherry
myRevealingModule.setName("Paul Kinlan");
myRevealingModule.getName();                // Name: Paul Kinlan
console.log(myRevealingModule.greeting);    // Hey there!
```
In case for any reason you want to remove a property from a public API, you don't need to re-write anything, all you need to do is comment out a line in the revealing object part:
``` javascript
  return {
      // setName: publicSetName,
      greeting: publicVar,
      getName: publicGetName
  };

```

[Addy Osmani: Revealing Module](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript)

[[UP]](#)