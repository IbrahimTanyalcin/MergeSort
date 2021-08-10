# MergeSort <img src="./logo/logo.png" width='30' height='auto'>
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b623fd94de934c0897bf646814d3476f)](https://www.codacy.com/gh/IbrahimTanyalcin/MergeSort/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=IbrahimTanyalcin/MergeSort&amp;utm_campaign=Badge_Grade)
[![DOI](https://zenodo.org/badge/393070702.svg)](https://zenodo.org/badge/latestdoi/393070702)

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

## [Documentation](https://ibrahimtanyalcin.github.io/MergeSort/)

For a list of config options, see [here](https://ibrahimtanyalcin.github.io/MergeSort/).

For directly embedding to html, if you are using a browser with compatibility > ie11, use the file ending with `...evergreen.min.js` in the `dist` folder. Otherwise, you can fall back to `...es5.min.js`. To read the entire build, refer to the files without the `.min.` part.

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

```javascript
<script src="https://cdn.jsdelivr.net/npm/ibowankenobi-mergesort"></script>
```

The contents of the request above is the same as `./dist/mergesort.x.y.z.evergreen.min.js`.

If you want to request a particular version, check instructions at [jsdelivr](https://www.jsdelivr.com/).




