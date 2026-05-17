import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const clientAssetsDir = path.join(
	__dirname,
	'node_modules',
	'@epic-web',
	'workshop-app',
	'build',
	'client',
	'assets',
)
const existingPictureInPictureIgnore =
	"Failed to execute 'requestPictureInPicture' on 'HTMLVideoElement'"
const pictureInPictureRequestRaceMessage =
	'The video element is processing a Picture-in-Picture request.'

const sentryBeforeSendPattern = new RegExp(
	`ignoreErrors:\\[${JSON.stringify(
		existingPictureInPictureIgnore,
	)}\\],beforeSend\\(([A-Za-z_$][\\w$]*)\\)\\{`,
)

const entryClientFilePattern = /^entry\.client-.*\.js$/

const entries = await fs.readdir(clientAssetsDir)
const entryClientFiles = entries.filter((entry) =>
	entryClientFilePattern.test(entry),
)

if (entryClientFiles.length === 0) {
	throw new Error(
		`Could not find the workshop app entry.client bundle in ${clientAssetsDir}`,
	)
}

let patched = false

for (const entryClientFile of entryClientFiles) {
	const entryClientPath = path.join(clientAssetsDir, entryClientFile)
	const contents = await fs.readFile(entryClientPath, 'utf8')

	if (contents.includes(pictureInPictureRequestRaceMessage)) {
		console.log(
			`Sentry Picture-in-Picture request-race filter already present in ${entryClientFile}`,
		)
		patched = true
		continue
	}

	const updated = contents.replace(
		sentryBeforeSendPattern,
		(match, sentryEventName) =>
			`${match}if(${sentryEventName}.exception?.values?.some((value)=>value.type==="NotAllowedError"&&value.value===${JSON.stringify(
				pictureInPictureRequestRaceMessage,
			)}))return null;`,
	)

	if (updated === contents) continue

	await fs.writeFile(entryClientPath, updated)
	console.log(
		`Added Sentry Picture-in-Picture request-race filter to ${entryClientFile}`,
	)
	patched = true
}

if (!patched) {
	throw new Error(
		[
			'Could not patch the workshop app Sentry beforeSend hook.',
			'This filter intentionally drops only Safari DOMExceptions where',
			`type is "NotAllowedError" and value is ${JSON.stringify(
				pictureInPictureRequestRaceMessage,
			)}.`,
			'If @epic-web/workshop-app changed its client Sentry initialization,',
			'update this patch instead of broadening the ignored NotAllowedError cases.',
		].join(' '),
	)
}
