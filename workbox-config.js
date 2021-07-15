module.exports = {
	globDirectory: 'app/',
	globPatterns: [
		'**/*.{svg,html,css}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/,
		/^b/
	],
	swDest: 'app/sw.js'
};