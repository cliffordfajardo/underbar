(function() {
  'use strict';

  window._ = {};



/*==========================================================================
NOTE:
This repo contains my own implemention of the underscore JS functional utility
library. There are many ways to reimplement these functions so by no means is
this a guide on how to reimplement underscore.js. Concerning time complexity,
most the majority of these functions could be further optimized using for-loops,
breaks and returns, however the purpose of this excercise was to learn to write
more expressive code.

TAKEAWAYS:
after reimplementing the majority of the underscore js functions
from scratch, I learned a tremendous amount about functional programming.
==========================================================================*/






/*==========================================================================
  _.identity:

  Returns whatever value is passed as the argument. This function doesn't
  seem very useful, but remember it--if a function needs to provide an
  iterator when the user does not pass one in, this will be handy.

  Example:
  var man = {name: 'moe'};
  man === _.identity(man);
  => true
==========================================================================*/
_.identity = function(val) {
  return val;
};









/*==========================================================================
  _.first:

  Return an array of the first n elements of an array. If n is undefined,
  return just the first element.

  Example:
  _.first([1,2,3,4,5]);
  => 1
  _.first([1,2,3,4,5], 3);
  => [1,2,3]

==========================================================================*/

_.first = function(array, n) {
  return n === undefined ? array[0] : array.slice(0, n);
};









/*==========================================================================
  _.last:

  Returns the last element of an array. Passing n will return the last
  n elements of the array.

  _.last([1,2,3,4,5]);
  => 5
  _.last([1,2,3,4,5], 3);
  => [5,4,3]
==========================================================================*/

_.last = function(array, n) {
  if(n === 0) return [];
  return n === undefined ? array.slice(-1)[0] : array.slice(-n);
};











/*==========================================================================
  _.each:

  Iterates over a collection & for each element of the colleciton it applies
  a callback function on it. Make it work for arrays & objects.

  NOTE: _.each doesn't have a return value, but rather simply runs the
  iterator function over each item in the input collection.

  Example:
  _.each([1, 2, 3], alert);
  => alerts each number in turn...

  _.each({one: 1, two: 2, three: 3}, alert);
  => alerts each number value in turn...

========================================================================== */

_.each = function(collection, iterator) {
  if (Array.isArray(collection)) {
    for (var i = 0; i < collection.length; i++) {
      iterator(collection[i], i, collection);
    }
  }
  else {
    for (var key in collection) {
      iterator(collection[key], key, collection);
    }
  }
};









/* ==========================================================================
  _.indexOf:

  Returns the index at which value can be found in the array, or -1 if value
  is not present in the array.

  Example:
  _.indexOf([1, 2, 3], 2);
  => 1

==========================================================================*/

_.indexOf = function(array, target){
  var result = -1;

  _.each(array, function(item, index) {
    if (item === target && result === -1) {
      result = index;
    }
  });

  return result;
};








/* ==========================================================================
  _.filter:

  Return all elements of an array that pass a truth test.

  Example:
  var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
  => [2, 4, 6]

========================================================================== */

_.filter = function(collection, test) {
  var filtered = [];
  _.each(collection, function(val, index, collection) {
    if (test(val)) filtered.push(val);
  });
  return filtered;
};







/*==========================================================================
  _.reject:

  Return all elements of an array that don't pass a truth test.

  Example:
  var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
  => [1, 3, 5]

========================================================================== */

_.reject = function(collection, test) {
  return _.filter(collection, function(val, index, collection) {
    if (!(test(val))) return val;
  });
};











/*==========================================================================
  _.uniq:

  Produce a duplicate-free version of the array.

  Example:
  _.uniq([1, 2, 1, 4, 1, 3]);
  => [1, 2, 4, 3]

========================================================================== */

_.uniq = function(array) {
  var duplicateFreeArray = [];
  _.each(array, function(val) {
    if (_.indexOf(duplicateFreeArray, val) === -1) {
      duplicateFreeArray.push(val);
    }
  });
  return duplicateFreeArray;
};









/*==========================================================================
  _.map:

  Return the results of applying an iterator to each element.

  Example:
  _.map([1, 2, 3], function(num){ return num * 3; });
  => [3, 6, 9]

  _.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
  => [3, 6, 9]

========================================================================== */

_.map = function(collection, iterator) {
  var results = [];
  _.each(collection, function(val, index, collection) {
    results.push(iterator(val, index, collection));
  });
  return results;
};












/*==========================================================================
  _.pluck:

  Takes an array of objects and returns an array of the values of
  a certain property in it. E.g. take an array of people and return
  an array of just their ages

  TIP: map is really handy when you want to transform an array of
  values into a new array of values. _.pluck() is solved for you
  as an example of this.


  var stooges = [{name: 'Abe', age: 7}, {name: 'Ben', age: 8}, {name: 'Cal', age: 9}];
  _.pluck(stooges, 'name');
  => ["Abe", "Ben", "Ca,"]

========================================================================== */

_.pluck = function(collection, key) {
  return _.map(collection, function(item){
    return item[key];
  });
};







/*==========================================================================
  _.reduce:

  Reduces an array or object to a single value by repetitively calling
  iterator(accumulator, item) for each item. accumulator should be
  the return value of the previous iterator call.

  You can pass in a starting value for the accumulator as the third argument
  to reduce. If no starting value is passed, the first element is used as
  the accumulator, and is never passed to the iterator. In other words, in
  the case where a starting value is not passed, the iterator is not invoked
  until the second element, with the first element as it's second argument.

   Example:
   _.reduce([10,20,70], function(total, number){
       return total + number;
     }, 0); // should be 100

 ==========================================================================*/

_.reduce = function(collection, iterator, accumulator) {
  if (accumulator === undefined && Array.isArray(collection)) {
    accumulator = collection.shift();
  }
  _.each(collection, function(val, index, collection) {
    accumulator = iterator(accumulator, val);
  });
  return accumulator;
};










/*==========================================================================
  _.contains:

  Determine if the array or object contains a given value (using `===`).

  Example:
  _.contains([1, 2, 3], 3);
  => true
  _.contains({ a: 4, b: 5, c: 6 }, 5
  => true

========================================================================== */


_.contains = function(collection, target) {
  var found = false;
  _.each(collection, function(val, index){
    if(val === target) found = true;
  });

  return found;
};















/*==========================================================================
  _.every:

  Determines whether all of the elements match a truth test.
  _.every([2,6,11,12], isEven);
  => false

========================================================================== */

_.every = function(collection, iterator) {
  if (collection.length === 0) return true;
  iterator = iterator || _.identity;

  var newArray = _.filter(collection, function(val){
    return iterator(val);
  });

  return newArray.length === collection.length;
};















/*==========================================================================
  _.some:

  Determines whether any of the elements pass a truth test. If no iterator is
  provided, provide a default one

  Example:
  _.some([2, 4, 6, 9], EvenCheck);
  => true

========================================================================== */

_.some = function(collection, iterator) {
  iterator = iterator || _.identity;
  var newArray = _.filter(collection, function(val){
    return iterator(val);
  });
  return newArray.length > 0;
};










/*==========================================================================
  _.extend:

  Extend a given object with all the properties of the passed in
  object(s).

  Example:
  _.extend({name: 'moe'}, {age: 50});
  => {name: 'moe', age: 50}

========================================================================== */

_.extend = function(obj) {
  for (var i = 0; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      obj[key] = arguments[i][key];
    }
  }
  return obj;
};














/*==========================================================================
  _.defaults:

  Fill in undefined properties in object with the first
  value present in the following list of defaults objects.



  Example:
  var iceCream = {flavor: "chocolate"};
  _.defaults(iceCream, {flavor: "vanilla", sprinkles: "lots"});
  => {flavor: "chocolate", sprinkles: "lots

========================================================================== */

 _.defaults = function(obj) {
  for (var i = 0; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (obj[key] === undefined) {
        obj[key] = arguments[i][key];
      }
    }
  }
  return obj;
};










/*===========================================================================
  _.once:

  Return a function that can be called at most one time. Subsequent calls
  should return the previously returned value.

  Example:
  var initialize = _.once(createApplication);
  initialize(); //logs....application created
  initialize(); //logs....you already created it

========================================================================== */

  _.once = function(func) {
    var alreadyCalled = false;
    var result;

    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };















/*==========================================================================
  _.memoize:

  Memorize an expensive function's results by storing them. You may assume
  that the function takes only one argument and that it is a primitive.
  memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  same thing as once, but based on many sets of unique arguments.

  _.memoize should return a function that, when called, will check if it has
  already computed the result for the given argument and return that value
  instead if possible.


  Example:
  var fibonacci = _.memoize(function(n) {
    return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);
  });
  fibonacci(100); takes 10 seconds to compute....next time we call the same
                  calculation the results will be returned to us immediately
                  since they have been cached already.

========================================================================== */
_.memoize = function(func) {
  var cache = {};
  return function(){
    var args = Array.prototype.slice.call(arguments); // console.log("args", args)
    var key = JSON.stringify(args);                   // console.log("keys-->",key)
    //applying the arguments from inner func to original outer func
    if(cache[key] === undefined) cache[key] = func.apply(null, args);
    return cache[key];
  };
};











/*==========================================================================
  _.delay:

  Delays a function for the given number of milliseconds, and then calls
  it with the arguments supplied.


  Example:
  _.delay(someFunction, 500, 'a', 'b')  -----> someFunction('a', 'b') after 500ms

========================================================================== */


_.delay = function(func, wait) {
  var args = [].slice.call(arguments); //creating array from arguments object
  args = args.slice(2); //grabbing values from index 2 onward
  setTimeout(function(){
    func.apply(null, args);
  }, wait);
};














/*==========================================================================
  _.shuffle:

  Randomizes the order of an array's contents.
  _.shuffle([1,2,5,7,0]) ---> random order....

========================================================================== */

_.shuffle = function(array) {
  var shuffled = array.slice();
  var results  = [];

  for (var i = shuffled.length; i > 0; i--) {
    var index = Math.floor(shuffled.length * Math.random());
    results = results.concat(shuffled.splice(index, 1));
  }
  return results;
};












/*==========================================================================
  _.invoke:

  Calls the method named by functionOrKey on each value in the list.

  Example:
  _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
  => [[1, 5, 7], [1, 2, 3]]

========================================================================== */



_.invoke = function(collection, functionOrKey) {
//grab from 2nd index onward
var args = Array.prototype.slice.call(arguments,2);


//if user passes a function
if(typeof arguments[1] === "function"){
  return _.map(collection, function(val) {
    //you can use call or apply here..args doesn't really matter unless you function takes arguments
    //using apply here to call the function and the functions this to the element we're iterating on
    return functionOrKey.apply(val, args);
  });
}

//if user passes a method name
if(typeof arguments[1] === "string"){
  return _.map(collection, function(val){
    return val[functionOrKey]();
  });
}
};







/*==========================================================================
  _.sortBy:

  Sort the object's values by a criterion produced by an iterator.
  If iterator is a string, sort objects by that property with the name
  of that string. For example, _.sortBy(people, 'name') should sort
  an array of people by their name.

  Example:
  _.sortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num); });
  => [5, 4, 6, 3, 1, 2]

  var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
  _.sortBy(stooges, 'name');
  => [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}];

========================================================================== */

  _.sortBy = function(collection, iterator) {
  };








/*==========================================================================
  _.zip:

  Zip together two or more arrays with elements of the same index
  going together.

  Example:
  _.zip(['a','b','c','d'], [1,2,3])
  => [['a',1], ['b',2], ['c',3], ['d',undefined]]

========================================================================== */
  //
  _.zip = function() {
  };









/*==========================================================================
  _.flatten:

  Takes a multidimensional array and converts it to a one-dimensional array.
  The new array should contain all elements of the multidimensional array.

  Example:
  _.flatten([1, [2], [3, [[4]]]]);
  => [1, 2, 3, 4];

========================================================================== */
_.flatten = function(nestedArray) {
  var results = [];
  nestedArray.forEach(function(val) {
    if(Array.isArray(val)){
      results = results.concat(_.flatten(val));
    } else {
      results = results.concat(val);
    }
  });
  return results;
};








/*==========================================================================
  _.intersection:

  Takes an arbitrary number of arrays and produces an array that contains
  every item shared between all the passed-in arrays.

========================================================================== */

_.intersection = function() {

};









/*==========================================================================
  ._difference:

  Take the difference between one array and a number of other arrays.
  Only the elements present in just the first array will remain.

========================================================================== */

_.difference = function(array) {

};











/*==========================================================================
  _.throttle:

  Returns a function, that, when invoked, will only be triggered at most once
  during a given window of time.  See the Underbar readme for extra details
  on this function.

==========================================================================*/

_.throttle = function(func, wait) {

};









}());
