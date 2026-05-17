import assert from 'node:assert/strict'
import { test } from 'node:test'

import { patchServerBuild } from './patch-workshop-app.js'

const serverBuildFixture = `const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$7,
  default: $,
  loader: loader$L
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "routes": { "routes/$": { "id": "routes/$", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true } } };`

test('patches the workshop app catch-all route with a 404 action', () => {
	const patched = patchServerBuild(serverBuildFixture)

	assert.match(
		patched,
		/async function action\$catchAll\(\) {\n  throw new Response\("Not Found", { status: 404 }\);\n}/,
	)
	assert.match(patched, /action: action\$catchAll,/)
	assert.match(
		patched,
		/"routes\/\$": { "id": "routes\/\$", "parentId": "root", "path": "\*", "index": void 0, "caseSensitive": void 0, "hasAction": true,/,
	)
})

test('patching the server build is idempotent', () => {
	const patched = patchServerBuild(serverBuildFixture)

	assert.equal(patchServerBuild(patched), patched)
})
