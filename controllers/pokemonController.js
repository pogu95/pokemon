const {Pokemon} = require('../models')
const categories = ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/2048px-Pok%C3%A9mon_Electric_Type_Icon.svg.png', 'https://www.pokebeach.com/news/1211/pokemon-tcg-dragon-type-symbol.png']
module.exports.pokemonCard =  async function(req, res,) {
    let searchCategories = ['All'];
    for(let i = 0; i<categories.length; i++){
        searchCategories.push(categories[i]);
    }
    let pokemons;
    let searchCategorey = req.query.type || 'All';
    let searchRandom = req.query.random || false;
    if (searchCategorey==='All'){
        pokemons = await Pokemon.findAll();
    } else {
        pokemons = Pokemon.findAll( {
            where: {
                type: searchCategorey
            }
        });
    }
    if (pokemons.length > 0 && searchRandom) {
        let randomIndex = getRandomInt(pokemons.length);
        pokemons = [pokemons[randomIndex]];
    }



    res.render('index', {pokemons, categories : searchCategories, searchCategorey, searchRandom});
};

module.exports.renderEditForm = async function(req,res,next) {
    const pokemons = await Pokemon.findByPk(
        req.params.id
    );
    res.render('edit', {pokemons});

}
module.exports.updatePokemon = async function(req,res) {
    await Pokemon.update(
        {
            name: req.body.name,
            hp: req.body.hp,
            type: req.body.type,
            picture: req.body.picture,
            move1cost: req.body.move1cost,
            move1name: req.body.move1name,
            move1power: req.body.move1power,
            move2cost1: req.body.move2cost1,
            move2cost2: req.body.move2cost2,
            move2cost3: req.body.move2cost3,
            move2name: req.body.move2name,
            move2power: req.body.move2power,
            weakness: req.body.weakness,
            resistance: req.body.resistance,
            retreatcost: req.body.retreatcost

        },
        {
            where:
                {
                    id: req.params.id
                }
        }
    );
    res.redirect('/');
}

module.exports.deletePokemon = async function(req,res) {
    await Pokemon.destroy(
        {
            where:
                {
                    id: req.params.id
                }
        }
    );
    res.redirect('/');
}

module.exports.renderAddForm = function(req,res) {
    const pokemons = {
        name: "",
        hp: "",
        type: "",
        picture: "",
        move1cost: "",
        move1name: "",
        move1power: 1,
        move2cost1: "",
        move2cost2: "",
        move2cost3: "",
        move2name: "",
        move2power: 1,
        weakness: "",
        resistance: "",
        retreatcost: "",


    };
    res.render('add', {pokemons});
}

module.exports.addPokemon = async function(req,res){
    await Pokemon.create(
        {
            name: req.body.name,
            hp: req.body.hp,
            type: req.body.type,
            picture: req.body.picture,
            move1cost: req.body.move1cost,
            move1name: req.body.move1name,
            move1power: req.body.move1power,
            move2cost1: req.body.move2cost1,
            move2cost2: req.body.move2cost2,
            move2cost3: req.body.move2cost3,
            move2name: req.body.move2name,
            move2power: req.body.move2power,
            weakness: req.body.weakness,
            resistance: req.body.resistance,
            retreatcost: req.body.retreatcost
        }
    );
    res.redirect('/');
}











function getRandomInt(max) {
    return Math.floor(Math.random()*max)
}
