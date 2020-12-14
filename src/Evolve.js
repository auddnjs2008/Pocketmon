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


const attackColor={
    Normal:"#A8A878",Fire:"#F08030",Water:"#6890F0",Electric:"#F8D030", Grass:"#78C850",Ice:"#98D8D8",Fighting:"#C03028",Poison:"#A040A0",
    Ground:"#E0C068",Flying:"#A890F0", Psychic:"#F85888",Bug:"#A8B820",Rock:"#B8A038",Ghost:"#705898",Dragon:"#7038F8"
}



const Damege ={ // 키: 공격하는 쪽  value 공격받는 값들 
  Normal:{Rock:0.5,Ghost:0},
  Fire:{Fire:0.5,Wahter:0.5,Grass:2,Ice:2,Bug:2,Dragon:0.5},
  Water:{Fire:2,Water:2,Grass:0.5,Ground:2,Rock:2,Dragon:0.5},
  Electric:{Water:2,Electric:0.5,Grass:0.5,Ground:0,Flying:2,Dragon:0.5},
  Grass:{Fire:0.5,Water:2,Grass:0.5,Poison:0.5,Ground:2,Flying:0.5,Bug:0.5,Rock:2,Dragon:0.5},
  Ice:{Fire:0.5,Water:0.5,Grass:2,Ice:0.5,Ground:2,Flying:2,Dragon:2},
  Fighting:{Normal:2,Ice:2,Poison:0.5,Flying:0.5,Psychic:0.5,Bug:0.5,Rock:2,Ghost:0}, //악이랑  강철타입은 뺌
  Poison:{Grass:2,Poison:0.5,Ground:0.5,Rock:0.5,Ghost:0.5},
  Ground:{Fire:2,Electric:2,Grass:0.5,Poison:2,Flying:0,Bug:0.5,Rock:2},
  Flying:{Electric:0.5,Grass:2,Fighting:2,Bug:2,Rock:0.5},
  Psychic:{Fighting:2,Poison:2,Psychic:0.5}, // 악뺌
  Bug:{Fire:0.5,Grass:2,Fighting:0.5,Poison:0.5,Flying:0.5,Psychic:2,Ghost:0.5}, // 악뺌
  Rock:{Fire:2,Ice:2,Fighting:0.5,Ground:0.5,Flying:2,Bug:2},
  Ghost:{Normal:0,Psychic:2,Ghost:2}, //악뺌
  Dragon:{Dragon:2},
} // 악 강철뺌

const DamegeCalc=(attackType,defenseType)=>{
// 어택타입이랑 방어타입이 배열일 수 있다.
let attackDamege=1;
if(attackType.length !==0 && defenseType !== 0){
    attackType.forEach(item=>{
        const KeyArray = Object.keys(Damege[item]);
     
        defenseType.forEach(value=>{
            // 포함되는 쪽이랑 안되는 쪽으로 나눈다.
            if(KeyArray.includes(value)){ // 포함되면  그 배율을 곱해준다. 
                attackDamege = attackDamege * Damege[item][value];
               
            }

        })

    });
}
return attackDamege;
}




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




const  PokemonEvolve ={megaPokemon, alolaPokemon,megaXYPokemon,urlSearch,googleProxyURL,attackColor,DamegeCalc};

export default PokemonEvolve;