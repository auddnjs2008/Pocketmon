import pokemon from "pokesprite-images/data/pokemon.json";
import usePokemon from "pokemon-go-pokedex";

const realPokemon = usePokemon.pokemon;

let megaPokemon = Object.values(pokemon).filter(item=> item["gen-8"].forms.mega && item["gen-8"].forms.mega.is_prev_gen_icon === true );
let alolaPokemon = Object.values(pokemon).filter(item=>item["gen-8"].forms.alola && item["gen-8"].forms.alola.is_prev_gen_icon === true);
let megaXYPokemon = Object.values(pokemon).filter(item=>item["gen-8"].forms["mega-x"] && item["gen-8"].forms["mega-x"].is_prev_gen_icon === true);


megaPokemon = megaPokemon.filter( item =>{
    let result=false;
    for(let i=0; i<realPokemon.length; i++){
         if(item.name.eng === realPokemon[i].name){
             result=true;
         }
        
    }
    return result;
})

alolaPokemon =alolaPokemon.filter(item =>{
    let result=false;
    for(let i=0; i<realPokemon.length; i++){
         if(item.name.eng === realPokemon[i].name){
             result=true;
         }
        
    }
    return result;
});

megaXYPokemon=megaXYPokemon.filter(item =>{
    let result=false;
    for(let i=0; i<realPokemon.length; i++){
         if(item.name.eng === realPokemon[i].name){
             result=true;
         }
        
    }
    return result;
});


const  PokemonEvolve ={megaPokemon, alolaPokemon,megaXYPokemon};

export default PokemonEvolve;