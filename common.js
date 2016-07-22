﻿
function init() {

    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
    Array.prototype.groupBy = function(fnValueProvider, args) {
        var len = this.length;
        if (typeof fnValueProvider != "function")
            throw new TypeError();

        if (len == 0)
            return 0;

        var groupedList = [];

        for (var i = 0; i < len; i++) {
            if (i in this) {
                var addNewGroup = true;
                var groupLen = groupedList.length;

                var key = fnValueProvider.call(this[i]);

                for (var j = 0; j < groupLen; j++) {
                    if (groupedList[j].Key == key) {
                        addNewGroup = false;
                        groupedList[j].Items.push(this[i]);
                    }
                }

                if (addNewGroup) {
                    var newGroup = new Object();
                    newGroup.Key = key
                    newGroup.Items = [];
                    newGroup.Items.push(this[i]);
                    groupedList.push(newGroup);
                }
            }
        }

        return groupedList;
    };

    String.prototype.toInt = function() {
        return parseInt(this);
    };

    Array.prototype.sum = function(fnValueProvider, args) {/// <summary>adds all the values of a param in all the array </summary>
        /// <param name="fnPredicate" type="function">search function delegete  ( items().sum(function() { return  this.Price(); }) )</param>
        var len = this.length;
        if (typeof fnValueProvider != "function")
            throw new TypeError();

        if (len == 0)
            return 0;

        var sum = 0;
        for (var i = 0; i < len; i++) {
            if (i in this) {
                sum += fnValueProvider.call(this[i]);
            }
        }

        return sum;
    };

    Array.prototype.orderBy = function(fnPredicate) {/// <summary>orders the array by a specific proprety  </summary>
        /// <param name="fnPredicate" type="function">order function delegete (items().orderBy(function () {return this.ID });)</param>
        var len = this.length;
        if (typeof fnPredicate != "function")
            throw new TypeError();

        var array = this;
        var temp = {};
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len - 1; j++) {
                if (fnPredicate.call(this[j]) > fnPredicate.call(this[j + 1])) {
                    temp = array[j];

                    array[j] = array[j + 1];

                    array[j + 1] = temp;
                }
            }
        }

        return array;

    }


    Array.prototype.select = function(fnPredicate) {/// <summary>returns a list of objects that are created in the predicate</summary>
        var len = this.length;
        if (typeof fnPredicate != "function")
            throw new TypeError();

        var vals = [];
        for (var i = 0; i < len; i++) {
            if (i in this) {
                var value = fnPredicate.call((void 0), this[i], i, this);
                vals.push(value);

            }
        }

        return vals;
    };

    Array.prototype.where = function(fnPredicate) {
        /// <summary>return all element from the array that match the filter</summary>S       
        /// <param name="fnPredicate" type="function">search function delegete </param>
        var len = this.length;
        if (typeof fnPredicate != "function") {
            throw new TypeError();
        }
        var matches = [];
        for (var i = 0; i < len; i++) {
            if (i in this) {
                var match = fnPredicate.call((void 0), this[i], i, this);
                if (match)
                    matches.push(this[i]);
            }
        }

        return matches;
    };

    Array.prototype.first = function (fnPredicate)
    {/// <summary>return an obeject from the array that matches the serach, if no object is found null is returned, if more then 1 element is found the first is returned </summary>
        /// <param name="fnPredicate" type="function">search function delegete (roles.firstOrDefault(function () {return this.RoleId == item.RoleId; }))</param>
        var len = this.length;
        if (typeof fnPredicate != "function")
            throw new TypeError();

        for (var i = 0; i < len; i++)
        {
            if (i in this)
            {
                var match = fnPredicate.call((void 0),this[i],i,this);
                if (match)
                    return this[i];
            }
        }

        return null;
    };
}


module.exports = init;