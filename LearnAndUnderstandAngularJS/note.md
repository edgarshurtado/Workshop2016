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

## Big Words Index

* Dependency injection. Class 10
