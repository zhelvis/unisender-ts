import typescript from "@rollup/plugin-typescript";

export default {
	input: "src/index.ts",
	plugins: [typescript()],
	output: [
		{
			format: 'es',
			file: 'dist/index.esm.js',
		},
		{
			format: 'cjs',
			file: 'dist/index.cjs.js'
		},
	],
}
