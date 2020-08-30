import {graphql} from 'msw'
import allPokemon from '../data/pokemon.json'

const pokemonApi = graphql.link('https://graphql-pokemon.now.sh')

window.FETCH_TIME = undefined
window.MIN_FETCH_TIME = 500
window.FETCH_TIME_RANDOM = false

function getDelay(t = window.FETCH_TIME) {
  t = window.FETCH_TIME ?? t
  if (window.FETCH_TIME_RANDOM) {
    t = Math.random() * t + window.MIN_FETCH_TIME
  }
  if (process.env.NODE_ENV === 'test') {
    t = 0
  }
  return t
}

export const handlers = [
  pokemonApi.query('PokemonInfo', (req, res, ctx) => {
    const pokemon = allPokemon[req.variables.name.toLowerCase()]
    const delay = getDelay(req.headers.get('delay'))
    if (pokemon) {
      return res(ctx.status(200), ctx.delay(delay), ctx.data({pokemon}))
    } else {
      const pokemonNames = Object.keys(allPokemon)
      const randomName =
        pokemonNames[Math.floor(pokemonNames.length * Math.random())]
      return res(
        ctx.status(404),
        ctx.delay(delay),
        ctx.data({
          errors: [
            {
              message: `Unsupported pokemon: "${req.variables.name}". Try "${randomName}"`,
            },
          ],
        }),
      )
    }
  }),
]
