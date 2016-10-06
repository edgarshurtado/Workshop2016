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

I we had used the angular service `$timeout` we could get rid of `.$apply`. This
is a big criticism of AngularJS. You have to buy completly the platform and 
write everything on its way for creating complex applications.

> Anyway, Tony Alicea thinks the benefits outweight this caveat.

## Class 21. Common Directives

### ng-if

shows the element when te expresion valuates to true:

```html
<div class="alert" ng-if="handle.length !== characters"> 
The imput has to be 5 characters long 
</div>
```

> For this example we first set a variable in the scope called 
`characters`

### ng-show && ng-hide

This works similarly as `ng-if` 

### ng-class

Allows to add a class with a condition

```html
<div class="alet" ng-class="{'alert-warning': handle.length < characters}"></div>
```
we can add as many classes with their conditions as we want

### ng-repeat

```js
$scope.rules= [
    {rulename: "Something"},
    {rulename: "Something else"},
    {rulename: "Something more"}
]
```

```html
<ul>
    <li ng-repeat="rule in rules">
        {{ rule.rulename}}
    </li>
</ul>
```

## Class 22. Common directives 2

### ng-click

```js
var myApp = angular.module("myApp", []);

myApp.controller("mainController", ["$scope", function($scope){
    $scope.alertClick() = function() {
        alert();
    }
}]);
```

```html
<div ng-click="alertClick()"></div>
```

### ng-cloak

Makes sure the user doesn't see the interpolation code

```html
<div ng-cloak>{{name}}</div>
```


## Class 23. XMLHTTPRequest Object (JavaScript Aside)

Explanation of XMLHttpRequest

## Class 24. External Data and $http

To get information from an external API

```js
var myApp = angular.module("myApp", []);

myApp.controller("mainController", ["$scope", "$http", function($scope, $http){
    $http.get('/api')
        .success(function(result){
            $scope.rules = result;
        })
        .error(function(data, status){
            console.log(data);
        });

    $scope.newRule = '';

    $scope.addRule = function(){
        $http.post('/api', {newRule: $scope.newRule})
            .success(function(result){ //The post rule send data and
                                        // and then does a get
                $scope.rules = result;
                $scope.newRule = '';
            })
            .error(function(data, status){
                console.log(data);
            })
    }
}]);
```

## Class 25. Multiple controllers, multiple views
The variables are unique for each controller, so they don't collide,
they don't pollute de global scope

## Class 26. Single page apps and hash. (HTML and Javascript Aside)
The navigation with hash on `anchors` are called fragment identifiers

JS has a event called 'hashchange' which fires when the (as its name
says) hash changes.

For the event to be launched, we don't actually need a target anchor.
So with this, we can emulate a navigation.

## Class 27. Routing, templates, and controllers

We use the angular external service **$ngRoute** for doing this.

```js
var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider){
    $routeProvider

    .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })
    .when('/second', {
        templateUrl: 'pages/second.html'
        controller: 'secondController'
    });
});

myApp.controller('mainController', ['$scope', '$location', '$log', function($scope, $location, $log){
    // Do some stuff
}])

myApp.controller('secondController', ['$scope', '$location', '$log', function($scope, $location, $log){
    // Do some stuff
}])
```

```html
<div ng-view></div>
```

## Class 28. Routing, templates, and controllers (2)

Whenever we put the `ng-view` that dom will be updated with the `$routeProvider` configuration

### RouteParams
With this service (comes along with ngRoute), we can set parts of the route to specific variables:

```js
myApp.config(function ($routeProvider) {
    $routeProvider

    .when('/second/:num', { // Whatever after second/ will be set to num
        templateUrl: 'pages/second.html',
        controller: 'secondController'
    })
});

myApp.controller('secondController', ["$scope", "$log", "$routeParams",
function($scope, $log, $routeParams){
    $scope.num = $routeParams.num;
}])
```

> Notice that for matching the route, now we need 'second/something'. If the 
route is just 'second/' it won't match.


## Class 29. Singletons and services. JS Aside
* **Singleton**: The one and only copy of an object

All services in AngularJS are singletons but `$scope`

## Class 30. Creating a service

```js
myApp.service('nameService', function(){
    var self = this;
    this.name = 'John Doe';

    this.namelength = function() {
        return self.name.length;
    };
})

myApp.controller('testController', ['nameService', function(nameService){
    console.log(nameService.namelength());
}])
```

If we wanted to update the name of the service from the scope (this means
whenever the $scope variable chages):

```js
myApp.service('nameService', function(){
    var self = this;
    this.name = 'John Doe';

    this.namelength = function() {
        return self.name.length;
    };
})

myApp.controller('testController', ['nameService', function(nameService){
    $scope.name = nameService.name;

    $scope.$watch('name', function(){
        nameService.name = $scope.name;
    });
}])
```


> If you refresh the page you'll lose the data changed. For saving it it's 
needed to persist it in someway (cookie, localstorage, etc...)

## Class 31. Reusable components. HTML Aside
Web components for the win!

Costume directives from Angular were the patch for having the power of
web components while they weren't implemented yet.

## Class 32. Variable names and normalization. JS Aside

* **Normalize**: To make consistent to a standard
    + Specifically we are dealing with 'text normalization', or making strings
    of text consistent to a standard

```js
var resultLinkHref = '#';
```

Will be normalizad in `HTML` into: 

```html
<div result-link-href='#'></div>
```

## Class 33, 34. Creating a Directive

```js
myApp.directive('searchResult', funtion(){
    return {
        restrict: 'AECM'
        //template: "<h1>Hello</h1>"
        templateUrl: "directives/searchResult.html"
        replace: true
    }
})
```

* replace: restrict the ways a directive can be used
    * A: As an attribute
    * E: As an element
    * C: As a class
    * M: As comment
* template: html string
* templateUrl: set an external html as template
* replace: eliminates the tag from the directive. False by default

```html
<!-- These 4 ways will ouput the same -->
<search-result></search-result>
<div search-result></div>
<div class="search-result"></div>
<!-- directive: search-result -->
```

## Class 35 & 36. Scope


To avoid the data access and modifications from the directives in various pages

the `scope` in the directives are isolated, so if we want to link the controller
scope with the directive scope we do the following

```js
myApp.controller(function($scope){
    $scope.person = {
        name = "John Doe",
        adress = "False Street 555"
    }

    $scope.formatedAddress = function(person){
        return person + " " + adress;
    }
})

myApp.directive('searchResult', funtion(){
    return {
        restrict: 'AECM'
        templateUrl: "directives/searchResult.html"
        replace: true,
        scope: {
            personName: "@",
            personObject: "=",
            formattedAddressFunction: "&"

        }
    }
})
```

* @: Text
* =: Object
* &: Function

As the directive lives inside a controller, has access to the $scope of its 
parent directive

```html
<!-- Template -->
<a href="#" class="list-group-item">
    <h4 class="list-group-item-heading">{{ personName }}</h4>
    <p class="list-group-item-text">
        {{ personObject.adress }}
    </p>
    <p class="list-group-item-text">
    <!-- We pass to the function a mapping object. each key 
    has to be the placeholder defined in the template for the
    function custom atributte. The value is the actual value we
    want to pass to the function -->
        {{ formatedAddressFunction({ aperson:personObject }) }}
    </p>
</a>

<!-- using the directive -->
<search-result person-object= "person" 
    person-name="person.name"
    formated-address-function="formatedAddress(aperson)">
</search-result>
```

> Notice that we don't use the double moustache notation when giving to the
directive the values for its curstom properties  

## Class 38. Repeated directives

```js
myApp.controller("mainController", ["$scope", function($scope){
    $scope.people = [
        person1: new Person(),
        person2: new Person(),
        person3: new Person(),
    ]
}])
```

```html
<div ng-repeat="person in people">
    <p>One persone</p>
</div>
```

## Class 39. Understanding Compile
* Compiler: Converts code to a lower-level language
* Linker: After the compiler, generates a file the computer will actually interact with.

> Very computer science-y terms that are sort of valid, but not 
familiar to many web developers...**and not what angularjs does**

```js
myApp.directive('searchResult', funtion(){
    return {
        restrict: 'AECM'
        templateUrl: "directives/searchResult.html"
        replace: true,
        scope: {
            personName: "@",
            personObject: "=",
            formattedAddressFunction: "&"

        },
        compile: function(elem, attrs){
            console.log('Compiling...');
            console.log(elem);

            return {
                pre: function(scope, element, attrs){
                    console.log('Pre-linking...');
                },

                post: function(scope, element, attrs) {
                    console.log('Post-linking');
                }
            }
        }
    }
})
```

* Compile is called once. It defines the directive html. Can change the 
element before being used.
* pre-link and post-link are called once by each loop
    - Pre-link (normaly not used. We don't have still the element)
    - Post-link is called once after all the pre-links in reverse order than
    pre-link (is a safer method to use because at that point

This is used when we need to add some logic depending on the ocasion for a 
directive and it's too complex to put it in the directive itself.

## Class 40. Understanding link

Hardly ever we use `compile`. so instead we can use `link`

```js
link: function(scope, element, attrs){
                    console.log('Pre-linking...');
},
```

> Beware with the performance issues when doing this.

## Class 41. Understanding Transclusion
* **Transclusion**: Include one document inside another

```js
myApp.directive('searchResult', funtion(){
    return {
        restrict: 'AECM'
        templateUrl: "directives/searchResult.html"
        replace: true,
        scope: {
            personName: "@",
            personObject: "=",
            formattedAddressFunction: "&"

        },
        transclude: true // to enable transclusion
    }
})
```

```html
<!-- Template -->
<a href="#" class="list-group-item">
    <h4 class="list-group-item-heading">{{ personName }}</h4>
    <p class="list-group-item-text">
        {{ personObject.adress }}
    </p>
    <p class="list-group-item-text">
        {{ formatedAddressFunction({ aperson:personObject }) }}
    </p>
    <small>
        <ng-transclude></ng-transclude>
    </small>
</a>

<!-- using the directive -->
<search-result person-object={{ person }} 
    person-name={{ person.name }}
    formated-adress-function="formatedAddress(aperson)">
    *Search results may not be valid
    <!-- The text above will be inserted in the ng-transclude position -->
</search-result>
```

`<ng-transclude>` marks the insert point.


# Controller As

Instead of attaching variables to `$scope` we can attach them to the
controller itself as follows

```js
myApp.controller("controllerA", [function(){
    this.testValue = 2;
}])
```

```html
<div ng-controller="controllerA as c">
    <input ng-model="c.testValue">
</div>
```

> Notice that we have to give the controller an alias for using this
method.

This way of passing variables it's an alternative and its use is personal
it works the same way than with $scope. The only downside is that we can't
set custom wathchers this way, for doing that we need to inject the 
`$scope` service

# Update #1

* Transpile: Converting source code of one programming language into 
another

## Usefull links:
* [ES6](https://github.com/lukehoban/es6features)
* [Typescript](http://www.typescriptlang.org/)

## Big Words Index

* Dependency injection. Class 10
* Minification. Class 15
* Interpolation. Class 17
* Directive. Class 18
* Singleton. class 29
* Compiler. Class 39
* Linker. Class 39
* Transclusion: Class 41
* Transpile: Class Update #1
