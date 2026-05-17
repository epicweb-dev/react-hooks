import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const workshopAppServerBuildPath = path.join(
	'node_modules',
	'@epic-web',
	'workshop-app',
	'build',
	'server',
	'index.js',
)

const catchAllActionSource = `async function action$catchAll() {
  throw new Response("Not Found", { status: 404 });
}
`

const routeWithoutAction = `const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$7,
  default: $,
  loader: loader$L
}, Symbol.toStringTag, { value: "Module" }));`

const routeWithAction = `const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$7,
  default: $,
  action: action$catchAll,
  loader: loader$L
}, Symbol.toStringTag, { value: "Module" }));`

const manifestWithoutAction = `"routes/$": { "id": "routes/$", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false,`
const manifestWithAction = `"routes/$": { "id": "routes/$", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": true,`

export function patchServerBuild(contents) {
	if (contents.includes('action: action$catchAll')) {
		return contents
	}

	if (!contents.includes(routeWithoutAction)) {
		throw new Error('Could not find the workshop app catch-all route module.')
	}

	if (!contents.includes(manifestWithoutAction)) {
		throw new Error('Could not find the workshop app catch-all route manifest.')
	}

	return contents
		.replace(routeWithoutAction, `${catchAllActionSource}${routeWithAction}`)
		.replace(manifestWithoutAction, manifestWithAction)
}

export async function patchWorkshopApp({ cwd = __dirname } = {}) {
	const serverBuildPath = path.join(cwd, workshopAppServerBuildPath)
	const currentContents = await readFile(serverBuildPath, 'utf8')
	const patchedContents = patchServerBuild(currentContents)

	if (patchedContents === currentContents) {
		return { serverBuildPath, patched: false }
	}

	await writeFile(serverBuildPath, patchedContents)
	return { serverBuildPath, patched: true }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	const { serverBuildPath, patched } = await patchWorkshopApp()
	console.log(
		`${patched ? 'Patched' : 'Already patched'} @epic-web/workshop-app catch-all route: ${serverBuildPath}`,
	)
}
