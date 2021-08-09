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

export default insertionSort;