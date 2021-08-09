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

export default regen;