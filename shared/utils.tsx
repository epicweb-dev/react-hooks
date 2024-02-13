/**
 * Sets the search parameters of the current URL.
 *
 * @param {Record<string, string | null>} params - The search parameters to set.
 * @param {Object} options - Additional options for setting the search parameters.
 * @param {boolean} options.replace - Whether to replace the current URL in the history or not.
 * @returns {URLSearchParams} - The updated search parameters.
 */
export function setGlobalSearchParams(
	params: Record<string, string | null>,
	options: { replace?: boolean } = {},
) {
	const searchParams = new URLSearchParams(window.location.search)
	for (const [key, value] of Object.entries(params)) {
		if (!value) searchParams.delete(key)
		else searchParams.set(key, value)
	}
	const newUrl = [window.location.pathname, searchParams.toString()]
		.filter(Boolean)
		.join('?')
	if (options.replace) {
		window.history.replaceState({}, '', newUrl)
	} else {
		window.history.pushState({}, '', newUrl)
	}
	return searchParams
}
