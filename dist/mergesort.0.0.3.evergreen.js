/**
* Mergesort module
* @module Mergesort
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Mergesort = factory());
}(this, (function () { 'use strict';

    const temp = [];

    function sort(arr, l1, l2, f, o = 0){
        let i = 0,
            j = 0,
            s1 = o,
            e1 = o + l1 - 1,
            s2 = e1 + 1,
            e2 = s2 + l2 - 1,
            state = "both not traversed";
        if(f(arr[e1], arr[s2]) <= 0){
            return;
        } else if(f(arr[s1], arr[e2]) >= 0){
            while(l2--){
                temp[i++] = arr[s2++];
            }
            while(l1--){
                temp[i++] = arr[s1++];
            }
            state = "skip";
        }
        outer:
        while(state){
            switch(state){
                case "both not traversed": 
                    if(f(arr[s1], arr[s2]) > 0) {
                        temp[i++] = arr[s2++];
                    } else {
                        temp[i++] = arr[s1++];
                    }
                    if (s1 > e1) {
                        state = "left traversed";
                        continue outer;
                    } else if (s2 > e2) {
                        state = "right traversed";
                        continue outer;
                    } 
                    continue outer;
                case "left traversed":
                    temp[i++] = arr[s2++];
                    if (s2 > e2){
                        break outer;
                    }
                    continue outer;
                case "right traversed":
                    temp[i++] = arr[s1++];
                    if (s1 > e1){
                        break outer;
                    }
                    continue outer;
                case "skip":
                    break outer;
            }
        }
        while(i--){
            arr[o++] = temp[j++];
        }
    }

    function insertionSort(arr, l, f, o = 0){
        let i = 0,
            j,
            u,
            temp;
        --l;
        while(i < l){
            j = i;
            u = o + j;
            temp = arr[u + 1];
            while(~j && f(arr[u], temp) > 0){
                arr[u + 1] = arr[u];
                --j,--u;
            }
            arr[u + 1] = temp;
            i++;
        }
        return arr;
    }

    function walk(arr, tree, f, hThreshold = 8, backtrack = false){
        outer:
        while(tree){
            let leaf = tree.firstChild;
            if(!leaf){
                if(tree.p){
                    tree = tree.p;
                    continue;
                }
                tree = null;
                continue;
            }
            while(leaf.firstChild){
                leaf = leaf.firstChild;
            }
            if(leaf.nextSibling.firstChild){
                tree = leaf.nextSibling;
                continue;
            }
            if(leaf.l <= hThreshold){
                insertionSort(arr, leaf.p.l, f, leaf.o);
            } else {
                sort(arr, leaf.l, leaf.nextSibling.l, f, leaf.o);
            }
            leaf = leaf.p;
            backtrack && (leaf.lastChild = leaf.firstChild.nextSibling);
            leaf.firstChild = null;
            while(!leaf.nextSibling){
                leaf = leaf.p || leaf;
                if(!leaf.p){
                    tree = leaf;
                    continue outer;
                }
            }
            tree = leaf.nextSibling;
        }
    }

    function tree(l) {
        let node = {
                o: 0,
                l: l,
                p: null,
                nextSibling: null,
                prevSibling: null
            },
            state = "down";
        outer:
        while(state){
            switch(state){
                case "down":
                    if(node.l <= 1){
                        state = "right";
                        continue outer;
                    }        
                    let nL = (node.l / 2) | 0;
                    node.firstChild = {
                        o: node.o,
                        l: nL,
                        p: node,
                        nextSibling: null,
                        prevSibling: null
                    };
                    node.firstChild.nextSibling 
                    = node.lastChild 
                    = {
                        o: node.o + nL,
                        l: node.l - nL,
                        p: node,
                        nextSibling: null,
                        prevSibling: node.firstChild
                    };
                    node = node.firstChild;
                    state = "down";
                    continue outer;
                case "right":
                    if(!node.nextSibling){
                        state = "up";
                        continue outer;
                    }
                    node = node.nextSibling;
                    state = "down";
                    continue outer;
                case "up":
                    if(!node.p){
                        return node;
                    }
                    node = node.p;
                    if(node.nextSibling){
                        state = "right";
                        continue outer;
                    }
                    state = "up";
                    continue outer;
            }
        }
    }

    function regen(tree){
        outer:
        while(tree){
            let leaf = tree.lastChild;
            if(!leaf){
                if(tree.p){
                    tree = tree.p;
                    continue;
                }
                tree = null;
                continue;
            }
            while(leaf.lastChild){
                leaf = leaf.lastChild;
            }
            if(leaf.prevSibling.lastChild){
                tree = leaf.prevSibling;
                continue;
            }
            leaf = leaf.p;
            leaf.firstChild = leaf.lastChild.prevSibling;
            leaf.lastChild = null;
            while(!leaf.prevSibling){
                leaf = leaf.p || leaf;
                if(!leaf.p){
                    tree = leaf;
                    continue outer;
                }
            }
            tree = leaf.prevSibling;
        }
    }

    /**
     * An optinal configuration object that can be passed to the `Mergesort` factory function
     * @typedef {Object} module:Mergesort~config
     * @property {number} threshold The threshold below where the algorithm temporarily switches over to  insertion sort
     * @property {number} size Use this if you are going to consistently sort arrays of fixed size.
     *  Refers to size of the array to be sorted, where a binary tree is precalculated. 
     *  The tree will be reused for each call of the returned `instance`.
     *  For each use, the tree is *walked* by setting `firstChild` properties of leaf nodes to null
     *  and then regenerated by setting them again from the `lastChild` property of their parent.
     *  This option results in a performance gain for large (> 1M) arrays, where cost of creating
     *  the tree is greater than the cost of walking + regenerating the tree. For small arrays,
     *  it has the reverse effect. It is set to off by default.
     */


    const undef = void(0);

    /**
     * Returns a `Mergesort` `instance`
     * 
     * ```javascript
     * 
     * let instance = Mergesort(); //switches to insertion sort for array fragments < 16
     * 
     * instance = Mergesort({threshold: 64}); //will switch to insertion sort for fragments < 64
     * 
     * instance = Mergesort({size:999}); //will throw an error if you try to sort arrays with length other than 999
     * 
     * ```
     * 
     * @alias module:Mergesort
     * 
     * @param {module:Mergesort~config} config a configuration object with optional parameters (default 16) 
     * @returns {module:Mergesort~instance}
     * 
     */
    function index(
        {
            threshold = 16,
            size = undef
        } 
        = {
            threshold: 16,
            size: undef
        }
    ){
        if(size && typeof size !== "number"){
            throw new Error("Size must be of type number");
        }
        const hThreshold = threshold / 2,
              _tree = size ? tree(size) : undef,
                /**
                * 
                * ```javascript
                * let instance = Mergesort(),
                * 
                *     inputArray = [{value:10},{value:1},{value:5}],
                *       
                *     compare = (a, b) => a.value - b.value;
                * 
                * instance(inputArray, compare); //[{value:1}, ...]
                * 
                * @namespace
                * @param {Array} ArrayToBeSorted - Input array to be sorted
                * @param {Function} Compare - compare function, same as in [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
                * @returns {Array} input array
                */
              instance = function(arr, f){
                let _length = arr.length;
                if(_tree){
                    if (_length !== _tree.l) {
                        throw new Error("Array length must be " + size);
                    }
                    temp.length = _length;
                    walk(arr, _tree, f, hThreshold ,true);
                    regen(_tree);
                } else {
                    temp.length = _length;
                    walk(arr, tree(_length), f, hThreshold);
                }
                temp.length = 0;
                return arr;
              };
        
        return instance;
    }

    index.version = "0.0.3";

    return index;

})));
