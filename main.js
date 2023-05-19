console.log("hello")


const fetchPokemon = () => {
    // console.log('fetching pokemon'); checking to see works
    const url = `https://pokeapi.co/api/v2/pokemon/1`;
    fetch(url)
        .then(res => {
            (res.json);
            return res.json();
        })

        .then(data => {
            console.log(data)
            const pokemon = {};
            pokemon['name'] = data.name;
            pokemon['id'] = data.id;
            pokemon['image'] = data.sprites['front_default'];
            pokemon['type'] = '';
            data.types.forEach((type) => {
                pokemon['type'] = pokemon['type'] + ", " + type.type.name;
            })
            console.log(pokemon)
        });

};

fetchPokemon();


