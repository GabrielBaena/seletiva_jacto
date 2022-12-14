const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')
const pokemonShiny = document.querySelector('.pokemon__shiny')
const pokemonTypeI = document.querySelector('.pokemon__typei')
const pokemonTypeII = document.querySelector('.pokemon__typeii')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

//grupo com as RGBs das cores
const colours = [
  '#A8A77A',
  '#EE8130',
  '#6390F0',
  '#F7D02C',
  '#7AC74C',
  '#96D9D6',
  '#C22E28',
  '#A33EA1',
  '#E2BF65',
  '#A98FF3',
  '#F95587',
  '#A6B91A',
  '#B6A136',
  '#735797',
  '#6F35FC',
  '#705746',
  '#B7B7CE',
  '#D685AD',
]

//grupo com os tipos
const types = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
]

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
  )

  if (APIResponse.status === 200) {
    const data = await APIResponse.json()
    return data
  }
}

const renderPokemon = async (pokemon) => {
  //animação para mudar de pokemon
  pokemonName.innerHTML = 'Loading...'
  pokemonNumber.innerHTML = ''

  const data = await fetchPokemon(pokemon)
  //caso o pokemon exista
  if (data) {
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id

    //pokemon da geração 8
    if (data.id > 807 && data.id < 899) {
      pokemonImage.src =
        data['sprites']['versions']['generation-viii']['icons']['front_default']
      pokemonShiny.src =
        'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
      pokemonImage.style.left = '58%'
      pokemonImage.style.bottom = '60%'
    } 

    //pokemon das gerações 1 a 7
    else if (data.id < 808){
      pokemonImage.src =
        data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon'][
          'front_default'
        ]
      pokemonImage.style.left = '37%'
      pokemonImage.style.bottom = '56%'
      pokemonShiny.src =
        data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon'][
          'front_shiny'
        ]
      pokemonShiny.style.left = '75%'
      pokemonShiny.style.bottom = '56%'
    }

    //pokemon n tem imagem (os ultimos da geração 8)
    else{
      pokemonImage.src =
        'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
      pokemonShiny.src = './images/nurse_joy.png'
      pokemonShiny.style.left = '58%'
      pokemonShiny.style.bottom = '57%'
    }
    
    //edita a cor do quadrado da tipagem
    for (var i = 0; i < 18; i++) {
      if (data['types']['0']['type']['name'] == types[i]) {
        pokemonTypeI.style.backgroundColor = colours[i]
        pokemonTypeI.style.left = '28%'
      }
    }
    pokemonTypeI.innerHTML = data['types']['0']['type']['name']

    //verifica se o poquemom tem 2 tipos
    if (data['types']['1']) {

      //edita a cor do quadrado da tipagem
      pokemonTypeII.innerHTML = data['types']['1']['type']['name']
      for (var i = 0; i < 18; i++) {
        if (data['types']['1']['type']['name'] == types[i]) {
          pokemonTypeII.style.backgroundColor = colours[i]
        }
      }
    }
    
    //alinha o quadrado da imagem caso só tenha 1 tipo
    else {
      pokemonTypeII.innerHTML = ''
      pokemonTypeII.style.backgroundColor = '#0000'
      pokemonTypeI.style.left = '40%'
    }
    input.value = ''
    searchPokemon = data.id

  
  } 

  //caso o pokemon não exista
  else {
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'Not found'
    pokemonNumber.innerHTML = ''
    pokemonShiny.src = './images/nurse_joy.png'
    pokemonShiny.style.left = '58%'
    pokemonShiny.style.bottom = '54%'
    pokemonTypeI.innerHTML = ''
    pokemonTypeI.style.backgroundColor = '#0000'
    pokemonTypeII.innerHTML = ''
    pokemonTypeII.style.backgroundColor = '#0000'
  }
}

//para pesquisar o pokemon pelo nome ou numero
form.addEventListener('submit', (event) => {
  event.preventDefault()
  renderPokemon(input.value.toLowerCase())
  searchPokemon = pokemonName
})

//ir para o próximo pokemon
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  }
  else{
    searchPokemon = 905
    renderPokemon(searchPokemon)
  }
})

//ir para o pokemon anterior
buttonNext.addEventListener('click', () => {
  if (searchPokemon < 905){
    searchPokemon += 1
    renderPokemon(searchPokemon)
  }
  else{
    searchPokemon = 1
    renderPokemon(searchPokemon)
  }
})

renderPokemon(searchPokemon)
