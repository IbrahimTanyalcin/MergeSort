import sort from './sort.js';
import insertionSort from './insertionSort.js';

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

export default walk;