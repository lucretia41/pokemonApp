const fetchPokemon = () => {

    console.log("hello")
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', ')
        }));
        console.log(pokemon);
    });
};
fetchPokemon();

// const fetchPokemon = () => {
//     // console.log('fetching pokemon'); checking to see works
//     const url = `https://pokeapi.co/api/v2/pokemon/1`;
//     fetch(url)
//         .then(res => {
//             (res.json);
//             return res.json();
//         })

//         .then((data) => {
//             console.log(data)
//             const pokemon = {
//                 name: data.name,
//                 id: data.id,
//                 image: data.sprites['front_default'],
//                 type: data.types.map((type) => type.type.name).join
//                     (', ')
//             };
//             console.log(pokemon)
//         });

// };

// fetchPokemon();


