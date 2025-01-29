const apiUrl = 'https://australia-southeast2-<km-keeper>.cloudfunctions.net/api'

// Add a claim
async function addClaim () {
  const date = document.getElementById('date').value
  const km = document.getElementById('km').value
  const purpose = document.getElementById('purpose').value

  await fetch(`${apiUrl}/claims`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, km, purpose })
  })
  fetchClaims()
}

// Fetch and display claims
async function fetchClaims () {
  const response = await fetch(`${apiUrl}/claims`)
  const claims = await response.json()

  const claimsList = document.getElementById('claims-list')
  claimsList.innerHTML = claims
    .map(claim => `<li>${claim.date}: ${claim.km} km (${claim.purpose})</li>`)
    .join('')
}

document.getElementById('add-claim').addEventListener('click', addClaim)
fetchClaims()
