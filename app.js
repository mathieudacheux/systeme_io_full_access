const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		"X-API-Key": process.env.SYSTEME_IO_API_KEY
	}
}

const fetchContactsByEmail = async (email) => {
	try {
		const response = await fetch(
			`https://api.systeme.io/api/contacts?email=${email}`,
			options
		)
		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`)
		}
		return await response.json()
	} catch (error) {
		console.error("Failed to fetch contacts:", error)
		return null
	}
}

const verifyIfUserHasCourse = async (contactId) => {
	try {
		const response = await fetch(
			`https://api.systeme.io/api/school/enrollments?contact=${contactId}`,
			options
		)
		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`)
		}
		return await response.json()
	} catch (error) {
		console.error("Failed to fetch contacts:", error)
		return null
	}
}

const verifyIfUserHasFullAccess = async (email) => {
	const items = await fetchContactsByEmail(email)

	const userHasFullAccess = await verifyIfUserHasCourse(items.items[0].id)

	return userHasFullAccess?.items[0]?.accessType === "full_access"
}

const email = window.prompt("Ton adresse email")

const userHasFullAccess = await verifyIfUserHasFullAccess(email)

console.log(userHasFullAccess)
