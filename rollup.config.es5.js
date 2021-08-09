import resolve from '@rollup/plugin-node-resolve';
//import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

export default args => {
	let version = process.env.MERGESORT_VERSION,
		name = process.env.MERGESORT_GLOBAL_NAME
			.replace(
				/^(?:[^\/_-]*(?:\/|-|_))?\w/gi, 
				function(m,o,s){
					return m.slice(-1).toUpperCase();
				}
		);
	return {
		input: 'src/index.js',
		output: {
			file: 'dist/mergesort.' + version + '.es5.js',
			format: 'umd',
			name: name
		},
		plugins: [
			resolve(),
			commonjs(),
			babel({
				babelHelpers: 'runtime',
				exclude: [ 'node_modules/@babel/**', 'node_modules/core-js/**', '/core-js/'],
				presets: [
					[
						'@babel/preset-env',
						{ 
							modules: false,
							targets: '> 0.25%, not dead',
							useBuiltIns: 'usage',
							corejs: 3
						}
					]
				],
				plugins: [
					[
						'@babel/plugin-transform-runtime', 
						{ 
							useESModules: false,
							targets: {
								ie: '11'
							},
							version: "^7.14.7"
						}
					]
				]
			})
		]
	}
};