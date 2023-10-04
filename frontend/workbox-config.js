module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,css,html,svg,png,json,txt}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};