/**
*  Name: iLoader.js
*  Author: Lynn
*  Blog: http://codefilled.com
*  Licence: MIT License
*  Date: 16.5.29
*/

;(function(win,document,undefined) {
	'use strict';

	// if(win.require && win.define) return;
	var objectToString = function(o) {
		return Object.prototype.toString.call(o);
	};

	var class2type = {} ;
	"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e,i){
	    class2type[ "[object " + e + "]" ] = e.toLowerCase();
	});

	var Util = {
		isEmptyObject: function (o) {
			/* fixs jQuery bugs if arguments is string return false*/
			/* there is a different between '123' and new String('123') must use Util.type, can't use typeof */
			if(this.type(o) === 'string') {
				return true;	
			} else {
				for (var t in o) {
	    			return false;  
	    		} 
	    		return true;		
			}
		},

		isArray: function(a) {
			return  Array.isArray(a) || (typeof a =='object' && objectToString(a) === '[object Array]');
		},

		isFunction: function(fn) {
			return typeof fn === 'function'; 
		},

		type:function (v) {
			if (v == null){
        		return String(v);
    		}
    		return typeof v === "object" || typeof v === "function" ?class2type[ class2type.toString.call(v) ] || "object" : typeof v;
		}

	};


	var LocalCache = {
		set: function(key,value) {
			try {
				localStorage.setItem(key,value);
			} catch(err) {
				// sometimes full
				console.log(err);
				return false;
			}
		},

		get: function(key) {
			try {
				localStorage.getItem(key);
			} catch(err) {}
		},

		isSupport: (function() {
			var _this = this;
			try {
				if('localStorage' in win || win[localStorage]){
					localStorage.setItem("~","1");
					localStorage.removeItem("~");
				} else {
					return false;
				}
				return true;
			} catch(err) {
				return false;	
			}
		})(),

		remove: function(key) {
			try {
				localStorage.removeItem(key);
			} catch (err) {
				return false;
			}
		},

		clear: function() {
			try {
				localStorage.clear();
			} catch(err) {
				return false;
			}
		},

		/* set localStorage batch, argument must not null object*/
		sets: function(o) {
			if(Util.isEmptyObject(o)) return;
			for(var i in o) {
				if(o.hasOwnProperty(i)) {
					this.set(i,o[i]);
				}
			}
		}
	};

	if(LocalCache.isSupport) {
		win.LocalCache = LocalCache;
	}
	win.Util = Util;
    
})(window,document,undefined); 