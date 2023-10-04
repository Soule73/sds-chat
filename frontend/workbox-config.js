module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,css,html,svg,png,json}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};