const Pokemon = require('../models/Pokemon');
let message = "";
let type = "";
const Op = require('sequelize').Op

const getAll = async (req,res) =>{
    try{
      setTimeout(() => {
        message = ""
        type = ""
      }, 1000)

        const pokedex = await Pokemon.findAll({ order: [["id", "ASC"]]})
        res.render("index", {pokedex, pokemonPut: null, pokemonDel: null, message, type, pokemonSearch:[]})
    } catch (err){
        res.status(500).send({err: err.message})
    }
};

const cadastro = (req, res) => {
    try{
      res.render('cadastro', {message, type});  
    }catch (err){
    res.status(500).send({err: err.message})
    }
};

const create = async (req, res) =>{
    try{
       const pokemon = req.body;
       
       if(!pokemon.nome || !pokemon.tipo || !pokemon.descricao || !pokemon.altura || !pokemon.peso || !pokemon.categoria || !pokemon.habilidade || !pokemon.imagem){
        message = "Preencha todos os campos para efetuar o cadastro!"
        type = "danger"
        return res.redirect("/cadastro")
       }

      await Pokemon.create(pokemon);
      message = "Pokémon criado com sucesso!"
      type = "success"
      res.redirect("/");
      } catch (err){
      res.status(500).send({err: err.message})
      }
};

const getById = async (req, res) => {
  try {
    const method = req.params.method;
    const pokedex = await Pokemon.findAll({ order: [["id", "ASC"]]});
    const pokemon = await Pokemon.findByPk(req.params.id);

    if (method == "put") {
      res.render("index", {
        pokedex,
        pokemonPut: pokemon,
        pokemonDel: null,
        message, 
        type,
        pokemonSearch:[]
      });
    } else {
      res.render("index", {
        pokedex,
        pokemonPut: null,
        pokemonDel: pokemon,
        message, 
        type,
        pokemonSearch:[]
      });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};


  const update = async (req, res) => {
    try {
      const pokemon = req.body;
      await Pokemon.update(pokemon, { where: { id: req.params.id } });
      message = "Pokémon atualizado com sucesso!"
      type = "success"
      res.redirect("/");
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  };
  
  const remove = async (req, res) => {
    try {
      await Pokemon.destroy({ where: { id: req.params.id } });
      message = "Pokémon apagado com sucesso!"
      type = "success"
      res.redirect("/")
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  };


  const searchByName = async (req, res) =>{
    try {
      const pokemon = await Pokemon.findAll(
        {where: {nome:{
          [Op.like]: `%${req.body.pokemon}%`,
        },
      },
      order: [["id", "ASC"]]
      });
      if(pokemon.length == 0){
        message = "Pokémon não encontrado"
        type = "danger"
        return res.redirect("/");
      }

      res.render("index", {pokedex: [], pokemonPut: null, pokemonDel: null, message, type, pokemonSearch: pokemon});

    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  };

  const detalhes = (req, res) =>{
  try {
    const id = req.params.id;
    const pokemon = Pokemon[id - 1];
     res.render("detalhes.ejs", {pokemon,
     });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};


module.exports = {
    getAll,
    cadastro,
    create,
    getById,
    update,
    remove,
    searchByName,
    detalhes,
};