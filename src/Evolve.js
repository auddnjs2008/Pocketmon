import pokemon from "pokesprite-images/data/pokemon.json";
import usePokemon from "pokemon-go-pokedex";

const realPokemon = usePokemon.pokemon;

let megaPokemon = Object.values(pokemon).filter(item=> item["gen-8"].forms.mega && item["gen-8"].forms.mega.is_prev_gen_icon === true );
let alolaPokemon = Object.values(pokemon).filter(item=>item["gen-8"].forms.alola && item["gen-8"].forms.alola.is_prev_gen_icon === true);
let megaXYPokemon = Object.values(pokemon).filter(item=>item["gen-8"].forms["mega-x"] && item["gen-8"].forms["mega-x"].is_prev_gen_icon === true);

let commonUrl = "https://projectpokemon.org/images/normal-sprite/";
let shinyUrl = "https://projectpokemon.org/images/shiny-sprite/";

let commonBackUrl = "https://projectpokemon.org/images/sprites-models/normal-back/";
let shinyBackUrl = "https://projectpokemon.org/images/sprites-models/shiny-back/";
let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';




megaPokemon = megaPokemon.filter( item =>{
    let result=false;
    for(let i=0; i<realPokemon.length; i++){
         if(item.name.eng === realPokemon[i].name){
             result=true;
         }
        
    }
    return result;
}).map(item=>item.name.eng.toLowerCase());

alolaPokemon =alolaPokemon.filter(item =>{
    let result=false;
    for(let i=0; i<realPokemon.length; i++){
         if(item.name.eng === realPokemon[i].name){
             result=true;
         }
        
    }
    return result;
}).map(item=>item.name.eng.toLowerCase());

alolaPokemon.push("marowak","golem");

megaXYPokemon=megaXYPokemon.filter(item =>{
    let result=false;
    for(let i=0; i<realPokemon.length; i++){
         if(item.name.eng === realPokemon[i].name){
             result=true;
         }
        
    }
    return result;
}).map(item=>item.name.eng.toLowerCase());

const urlSearch =
     {
        commonUrl:(smallName)=> commonUrl+smallName+".gif",
        commonBackUrl:(smallName)=> commonBackUrl+smallName+".gif",
        shinyUrl:(smallName)=> shinyUrl+smallName+".gif",
        shinyBackUrl:(smallName)=> shinyBackUrl+smallName+".gif",
        megaUrl:(smallName)=> megaPokemon.includes(smallName) ? {megaCommonUrl: commonUrl+smallName+"-mega.gif",megaShinyUrl:shinyUrl+smallName+"-mega.gif"} :"",
        alolalUrl:(smallName)=> alolaPokemon.includes(smallName) ? {alolaCommonUrl:commonUrl+smallName+"-alola.gif",alolaShinyUrl:shinyUrl+smallName+"-alola.gif"} :"",
        megaXUrl:(smallName)=> megaXYPokemon.includes(smallName) ? {megaXCommonUrl:commonUrl+smallName+"-megax.gif",megaXShinyUrl:shinyUrl+smallName+"-megax.gif"} :"",
        megaYUrl:(smallName)=> megaXYPokemon.includes(smallName) ? {megaYCommonUrl:commonUrl+smallName+"-megay.gif",megaYShinyUrl:shinyUrl+smallName+"-megay.gif"} : "", 
        megaBackUrl:(smallName)=> megaPokemon.includes(smallName) ? {megaBackCommonUrl:commonBackUrl+smallName+"-mega.gif",megaBackShinyUrl:shinyBackUrl+smallName+"-mega.gif"}:"",
        alolaBackUrl:(smallName)=> alolaPokemon.includes(smallName) ? {alolaBackCommonUrl:commonBackUrl+smallName+"-alola.gif",alolaBackShinyUrl:shinyBackUrl+smallName+"-alola.gif"}:"",
        megaXBackUrl:(smallName) => megaXYPokemon.includes(smallName) ?{megaXBackCommonUrl:commonBackUrl+smallName+"-megax.gif",megaXBackShinyUrl:shinyBackUrl+smallName+"-megax.gif"}:"",
        megaYBackUrl:(smallName)=> megaXYPokemon.includes(smallName) ? {megaYBackCommonUrl:commonBackUrl+smallName+"-megay.gif",megaYBackShinyUrl:shinyBackUrl+smallName+"-megay.gif"}: "",
    }




const  PokemonEvolve ={megaPokemon, alolaPokemon,megaXYPokemon,urlSearch,googleProxyURL};

export default PokemonEvolve;