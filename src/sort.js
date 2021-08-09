import temp from './temp.js';

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
            temp[i++] = arr[s2++]
        }
        while(l1--){
            temp[i++] = arr[s1++]
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

export default sort;