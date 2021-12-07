const {Pokemon} = require('../models')
module.exports.pokemonCard =  async function(req, res, next) {
    const pokemons = await Pokemon.findAll();

    res.render('index', {pokemons});
};

