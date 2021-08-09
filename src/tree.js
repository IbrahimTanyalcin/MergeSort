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

export default tree;