const { init } = require('../handler.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set(["arrow.svg","checked.svg","clock.svg","close.svg","favicon.png","magic-boot.svg","magic-wand.svg","measure.svg","search.svg","shield.svg","sword.svg"]),
	_: {
		mime: {".svg":"image/svg+xml",".png":"image/png"},
		entry: {"file":"start-e3a2cb31.js","js":["start-e3a2cb31.js","chunks/vendor-62d605f4.js"],"css":["assets/start-61d1577b.css"]},
		nodes: [
			() => Promise.resolve().then(() => require('../server/nodes/0.js')),
			() => Promise.resolve().then(() => require('../server/nodes/1.js')),
			() => Promise.resolve().then(() => require('../server/nodes/2.js'))
		],
		routes: [
			{
				type: 'page',
				pattern: /^\/$/,
				params: null,
				path: "/",
				a: [0,2],
				b: [1]
			}
		]
	}
});
