/*
 * Associative Array
 * Version 1.0.0
 * Written by: Anderson Grüdtner Martins
 *
 * License: GNU General Public License, version 2.0 (GPLv2) - http://opensource.org/licenses/GPL-2.0
 */

;(function(window, undefined) {

	function AssociativeArray(list) {
		this.length = 0;
		this.items = {};

		this.hasLists = list === true;

		// Add initial items from object
		if ((typeof list === 'object') && list.items) {
			this.hasLists = list.hasLists;

			for (var key in list.items) {
				this.add(key, list.items[key]);
			}
		}
		else if (list instanceof Array) {
			this.hasLists = true;

			var length = list.length;
			for (var i = 0; i < length; i++) {
				this.add(i, list[i]);
			}
		}
	}

	AssociativeArray.prototype = {
		add: function(key, item, replaceSubitem) {
			if (this.hasLists) {
				// Check if the key already exists
				if (this.hasKey(key)) {
					var list = this.get(key);

					if (replaceSubitem === true) {
						var total = list.length,
							subitem = null;

						for (var i = 0; i < total; i++) {
							subitem = list[i];

							if (subitem == item) {
								list[i] = item;
							}
						}
					}
					else {
						list.push(item);
					}

					this.items[key] = list;
				}
				else {
					this.items[key] = [item];
				}
			}
			else {
				this.items[key] = item;
			}

			this.count();

			return item;
		},

		get: function(key) {
			if (this.items.hasOwnProperty(key)) {
				return this.items[key];
			}

			return null;
		},

		hasKey: function(key) {
			return this.items.hasOwnProperty(key);
		},

		count: function() {
			var key;

			this.length = 0;

			for (key in this.items) {
				if (this.items.hasOwnProperty(key)) {
					this.length++;
				}
			}
		},

		remove: function(key) {
			if (this.items.hasOwnProperty(key)) {
				this.items[key] = null;
				delete this.items[key];

				this.count();
			}
		},

		removeFromListByIndex: function(key, index) {
			if (this.items.hasOwnProperty(key)) {

				if (index >= 0 && this.hasLists) {
					var list = this.get(key);
					list.splice(index, 1);
				}
			}
		},

		removeFromListByValue: function(key, value) {
			if (this.items.hasOwnProperty(key)) {

				if (this.hasLists) {
					var list = this.get(key),
						length, i;

					length = list.length;
					for (i = 0; i < length; i++) {
						if (list[i] === value) {
							list.splice(i, 1);
							break;
						}
					}
				}
			}
		},

		clean: function() {
			this.items = {};
			this.length = 0;
		},

		each: function(callback) {
			var key;

			for (key in this.items) {
				if (this.items.hasOwnProperty(key)) {
					callback.call(this.items[key], this.items[key], key);
				}
			}
		}
	};

	window.AssociativeArray = AssociativeArray;

})(window);
