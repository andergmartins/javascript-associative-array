javascript-associative-array
============================

An Associative Array implementation for javascript.

### Usage:

```
// For simple lists
var list = new AssociativeArray();

// For lists of lists
var list = new AssociativeArray(true);

// Adding a new item
list.add('your-key', 234);

// Getting items
list.get('your-key');

// Check is a key exists
list.hasKey('your-key');

// Remove an item
list.remove('your-key');

// Remove an sub item from a key by index
list.removeFromListByIndex('your-key-2', 4);

// Remove an sub item from a key by value
list.removeFromListByValue('your-key-2', 55453);

// Clean the list
list.clean();

// Run the list items
list.each(function(item, i) {
	/ /this === item
	console.log(this, item, i);
})
```
