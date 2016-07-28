## Class 4. The problem AngularJS solves
AngularJS tries to give a easier way to have syncronized the data in the 
**model** and the **DOM**

## Class 5. Model, View, Whatever

* **MODEL**: The data
* **VIEW**: What the user sees (the html in AngularJS)
* **WHATEVER**: Is what binds the model with the view. An update in one side
will update the other automatically. Traditionally this has been the
controllers, however the approach of AngularJS is different and they've called
it *whatever* MV\* for short

## Class 6. Custom attributes
In html we can add the attributes we want to the tags. They won't do anything,
though. However, this attributes values can be accessed by JS

AngularJS uses custom attributes to modify the DOM. All the custom attributtes
that starts with **ng-** are from AngularJS

## Class 7. Global Namespace

When using global namspaces we can have collision between names and override
variables.

AngularJS encapsulates and makes us encapsulate all the JS code for avoiding 
this issue.

## Class 9. Modules, Apps, and Controllers

Starting a project:

1. import angular
2. create a file `app.js` and initialize angular

```
var myApp = angular.module('myApp', []);
```

> Is not necessary that the variable name has the same as the *module*. This
variable is just to don't pollute the global *Namespace*

3. define the app in the DOM

```html
<html ng-app="myApp">
```

> the exact tag for putting the Angular attribute is not necessarily in the 
very top of the web page. Is important, though, that all the DOM we want
to modify with Angular is a child of the tag with the `ng-app` attributte

4. Create a controller

```
myApp.controller('mainController', function(){

})
```

5. Assign the new controller to a DOM element

```
<div ng-controller='mainController'></div>
```

## Class 10. Dependency injection
* **Dependency Injection**: Rather than creating an object inside a function,
you pass it to the function

## Class 11. The Scope Service

Is an object of AngularJS

Inject it:
```
myApp.controller('mainController', function($cope){
    console.log($scope)
});
```

> Notice that we don't have to define it anywhere. It comes along with AngularJS
. Also noticed that it uses a `$`. All AngularJS objects starts with `$`

Once we have the $scope, we can assign variables to it:

```js
$scope.name = 'Jane Doe'
$scope.getname = function(){
    return 'John Doe'
}
```

The $scope is automatically available from the client side. This means that the
`$scope` is a middle piece that binds the model with the view.

## Class 12. Functions and Strings (JS aside)
In JS you can take a function and get a String representation. 
```
var searchPeople = function(firstName, lastName){
    // Do something...
}

var searchPeopleString = searchPeople.toString();
```

This means that we can parse the string to get which should be the names of 
the expected parameters. And this is what AngularJS does for dependency 
injection.

## Class 13. How does AngularJS dependency injection?

```js
angular.injectior().annotate(searchPeople);

// ["firstName", "lastName"]
```

This returns from a function an array with the name of the parameters. With 
this Angular checks the dependencies we want to inject.

## Class 14. Get another services.

1. Go to angularjs.com
2. Go to develop >> API reference for searching for new services
3. Add the new dependency to the **controller**

```js
myApp.controller("mainController", function($scope, $log){
    console.log($scope);
    console.log($log);
});
```

> The order in which we put the dependencies doesn't matter since Angular
actually reads the name and order of the dependencies for a *controller*

### Dependencies not built-in AngularJS

1. Download the desired service (or write our own)
2. Import to your index.html
3. Inject in the dependecies of the app

```js
var myApp = angular.module('myApp', ["ngMessage"]);
```

> This makes the service available for the whole app

## Class 15. Arrays and Functions (JavaScript aside)
 JavaScript allows you to mix different types of variables inside an array. 
 So AngularJS uses this for setting an array of string and at the en a function

 ```js
 var arr = ["1", "2", function(){console.log("Hello!!")}];

 arr[2](); // This logs `"Hello"` into the console
 ```

## Class 16. Dependency injection and minification

* **Minification**: Shrinking the size of files for faster download (we normally
add '.min' to the name of the file)

The problem with the way we've being injecting the dependencies is that if you
minify the code and this minifications changes the name of the dependencies, it
will break your app because AngularJS won't be able to find the dependencies 
anymore. That means that this:

```js
myApp.controller('mainController', function($scope, $log){

    $log($scope);

});
```

Will turn into this:

```js
myApp.controller("mainController",function(n,o){o(n)});
```

Since neither `n` and `o` means nothing to AngularJS, it won't know which
dependencies look for. It will throw an *injection error*

That's for AngularJS provides this way of defining the dependencies:

```js
myApp.controller('mainController', ["$scope", "$log", function($scope, $log){
    $log($scope);
}]);
```

The last item of the array is always de function, and before all the
dependencies.

With this method, the minifier will provide a code like this:

```js
myApp.controller("mainController",["$scope","$log",function(o,l){l(o)}]);
```

Since the minifier will not ever change the strings, now AngularJS can look
into the array elements and look for the dependencies.

> This way of dependency injection is the recomended because we all should be
minifying our code.

> **Beware!!** the order of the dependencies matters here.

## Class 17. Scope and Interpolation

* Interpolation: Creating a string by combining strings and placeholders

In AngularJS, whatever is put between curly braces on a view is interpolated

```js
myApp.controller('mainController', ["$scope", "$log", function($scope, $log){
    $scope.name = "Edgar";
}]);
```

```html
<div ng-controller='mainController'>
    <h1>Hello {{ name + ". How are you?"}}</h1>
</div>
```

This will print in the html --> Hello Edgar. How are you?

This binds the model and the view.

## Class 18. Directives and two data binding
* Directive: An instruction to AngularJS to manipulate a piece of the DOM. (This
is what web-components do right now);

* `ng-model` binds the value of the element to the model
```html
<input type="text" ng-model="handle" />

<h1> {{ handle }}</h1>
```

In this example, everything wrote in the `input` will be displayed in the `<h1>`

## Class 19. The Event Loop (JavaScript Aside)

What EventLoop means is that when there are events declared, JS waits for that
events to occur.

## Class 20. Watchers and the Digest Loop

AngularJS automatically adds the event listeners and extends the event loop.

AngularJS add the Angular Context which keeps track of all the variables that
it has to keep track for their values to change. Everytime we add a variable
to `$scope` AngularJS creates a watcher for that variable.

The digest loops runs everytime an event occurs checking if any of the variables
in the watch list has changed. If some did, refreses the DOM.

This Angular Context (Watchers + Digest Loop).

This has a caveat. All the changes made outside the angularJS context won't 
fire the DigestLoop. This happens with async code because it runs in another
thread . To avoid this, is why we should use AngularJS services as much as 
we can. Or this is another way to force AngularJS to fire the digest Loop:

```js
setTimeout(function() {
    $scope.$apply(function(){ // Forces the AngularJS Digest Loop
        $scope.handle = 'newtwitterhandle';
        console.log('Scope changed');
    })
}, 3000);
```

I we had used the angular service `$timeout` we could get rid of `.apply`. This
is a big criticism of AngularJS. You have to buy completly the platform and 
write everything on its way for creating complex applications.

> Anyway, Tony Alicea thinks the benefits outweight this caveat.

## Class 21. Common Directives

### ng-if

## Big Words Index

* Dependency injection. Class 10
* Minification. Class 15
* Interpolation. Class 17
* Directive. Class 
