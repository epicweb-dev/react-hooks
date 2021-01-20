import {graphql} from '@kentcdodds/react-workshop-app/server'
import type {PokemonData} from './types'

const pokemonApi = graphql.link('https://graphql-pokemon2.vercel.app/')

export const handlers = [
  pokemonApi.query('PokemonInfo', (req, res, ctx) => {
    const pokemon = allPokemon[req.variables.name.toLowerCase()]
    if (pokemon) {
      return res(ctx.status(200), ctx.data({pokemon}))
    } else {
      const pokemonNames = Object.keys(allPokemon)
      const randomName =
        pokemonNames[Math.floor(pokemonNames.length * Math.random())]
      return res(
        ctx.status(404),
        ctx.errors([
          {
            message: `Unsupported pokemon: "${req.variables.name}". Try "${randomName}"`,
          },
        ]),
      )
    }
  }),
]

const allPokemon: Record<string, Omit<PokemonData, 'fetchedAt'>> = {
  pikachu: {
    id: 'UG9rZW1vbjowMjU=',
    number: '025',
    name: 'Pikachu',
    image: '/img/pokemon/pikachu.jpg',
    attacks: {
      special: [
        {
          name: 'Discharge',
          type: 'Electric',
          damage: 35,
        },
        {
          name: 'Thunder',
          type: 'Electric',
          damage: 100,
        },
        {
          name: 'Thunderbolt',
          type: 'Electric',
          damage: 55,
        },
      ],
    },
  },
  mew: {
    id: 'UG9rZW1vbjoxNTE=',
    number: '151',
    image: '/img/pokemon/mew.jpg',
    name: 'Mew',
    attacks: {
      special: [
        {
          name: 'Dragon Pulse',
          type: 'Dragon',
          damage: 65,
        },
        {
          name: 'Earthquake',
          type: 'Ground',
          damage: 100,
        },
        {
          name: 'Fire Blast',
          type: 'Fire',
          damage: 100,
        },
        {
          name: 'Hurricane',
          type: 'Flying',
          damage: 80,
        },
        {
          name: 'Hyper Beam',
          type: 'Normal',
          damage: 120,
        },
        {
          name: 'Moonblast',
          type: 'Fairy',
          damage: 85,
        },
        {
          name: 'Psychic',
          type: 'Psychic',
          damage: 55,
        },
        {
          name: 'Solar Beam',
          type: 'Grass',
          damage: 120,
        },
        {
          name: 'Thunder',
          type: 'Electric',
          damage: 100,
        },
      ],
    },
  },
  mewtwo: {
    id: 'UG9rZW1vbjoxNTA=',
    number: '150',
    image: '/img/pokemon/mewtwo.jpg',
    name: 'Mewtwo',
    attacks: {
      special: [
        {
          name: 'Hyper Beam',
          type: 'Normal',
          damage: 120,
        },
        {
          name: 'Psychic',
          type: 'Psychic',
          damage: 55,
        },
        {
          name: 'Shadow Ball',
          type: 'Ghost',
          damage: 45,
        },
      ],
    },
  },
  ditto: {
    id: 'UG9rZW1vbjoxMzI=',
    number: '132',
    image: '/img/pokemon/ditto.jpg',
    name: 'Ditto',
    attacks: {
      special: [
        {
          name: 'Struggle',
          type: 'Normal',
          damage: 15,
        },
      ],
    },
  },
  charizard: {
    id: 'UG9rZW1vbjowMDY=',
    number: '006',
    name: 'Charizard',
    image: '/img/pokemon/charizard.jpg',
    attacks: {
      special: [
        {
          name: 'Dragon Claw',
          type: 'Dragon',
          damage: 35,
        },
        {
          name: 'Fire Blast',
          type: 'Fire',
          damage: 100,
        },
        {
          name: 'Flamethrower',
          type: 'Fire',
          damage: 55,
        },
      ],
    },
  },
  bulbasaur: {
    id: 'UG9rZW1vbjowMDE=',
    number: '001',
    name: 'Bulbasaur',
    image: '/img/pokemon/bulbasaur.jpg',
    attacks: {
      special: [
        {
          name: 'Power Whip',
          type: 'Grass',
          damage: 70,
        },
        {
          name: 'Seed Bomb',
          type: 'Grass',
          damage: 40,
        },
        {
          name: 'Sludge Bomb',
          type: 'Poison',
          damage: 55,
        },
      ],
    },
  },
}
