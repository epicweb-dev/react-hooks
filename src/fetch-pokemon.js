window.FETCH_TIME = undefined
window.MIN_FETCH_TIME = 500
window.FETCH_TIME_RANDOM = false

function sleep(t = window.FETCH_TIME) {
  t = window.FETCH_TIME ?? t
  if (window.FETCH_TIME_RANDOM) {
    t = Math.random() * t + window.MIN_FETCH_TIME
  }
  if (process.env.NODE_ENV === 'test') {
    t = 0
  }
  return new Promise(resolve => setTimeout(resolve, t))
}

const formatDate = date =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds(),
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

// the delay argument is for faking things out a bit
function fetchPokemon(name, delay = 1500) {
  const endTime = Date.now() + delay
  const pokemonQuery = `
    query ($name: String) {
      pokemon(name: $name) {
        id
        number
        name
        image
        attacks {
          special {
            name
            type
            damage
          }
        }
      }
    }
  `

  return window
    .fetch('https://graphql-pokemon.now.sh', {
      // learn more about this API here: https://graphql-pokemon.now.sh/
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        query: pokemonQuery,
        variables: {name: name.toLowerCase()},
      }),
    })
    .then(async response => {
      await sleep(endTime - Date.now())
      const {data} = await response.json()
      if (response.ok) {
        const pokemon = data?.pokemon
        if (pokemon) {
          pokemon.fetchedAt = formatDate(new Date())
          return pokemon
        } else {
          return Promise.reject(new Error(`No pokemon with the name "${name}"`))
        }
      } else {
        // handle the graphql errors
        const error = {
          message: data?.errors?.map(e => e.message).join('\n'),
        }
        return Promise.reject(error)
      }
    })
}

export {fetchPokemon}
