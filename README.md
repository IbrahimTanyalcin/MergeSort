# MergeSort <img src="./logo/logo.png" width='30' height='auto'>

Mergesort algorithm without recursion, using cached binary trees 👇 

<small>

- Generating a tree beforehand, divides the problem in half, where the first part can be calculated once and reused for arrays with same size.
- Lack of recursion avoids functions calls, making the algorithm perform as close as possible to natively compiled vendor implementations.

</small>

For larger arrays (> 1M) it performs faster than native solutions (around %25-%50 faster). For smaller arrays performs comparable or slower (around %25 slower).

<br><br>
|milliseconds| 1M <sup>*</sup>| 10M <sup>**†</sup> | 100K <sup>†</sup>| 100K |
|:----:|:----:|:----:|:-----:|:-----:|
|Mergesort| 34900| 229000| 11000 |10900
|Chrome| 35200| 326000|10200  |10200

<small><small>
†: Instance created using `size` option<br>
*: 50 iterations<br>
**: 30 iterations<br>
</small></small> 
<br><br>

## Documentation

Check the here.

## Usage

```javascript
let instance = Mergesort(),
    array = Array.from({length:100}).map(d => Math.random());

instance(array, (a,b) => a - b);
```

## Installation

```javascript
npm install @ibowankenobi/mergesort
```
## Build

```javascript
npm run build
```
You will end up with 4 files in the `dist` folder, an es5 version, an es6 version and minified versions of both.

## Browser
TBD




