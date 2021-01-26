import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import  backendApi  from "./backendApi"

function Trade() {

  const [trainerOne, settrainerOne] = useState([]);
  const [trainerTwo, settrainerTwo] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isFair, setIsFair] = useState(false);
  const [missingXp, setMissingXp] = useState(0);
  const [pokemons, setPokemons] = useState([]);


  const loadMorePokemons = () =>{
    backendApi.get("/pokemons", {
      params: {
        limit: 200,
        offset: offset
      }
    }).then((response) => {
      setPokemons(response.data.data)
      setOffset(offset+20)
    })
  }

  const confirmTrade = () =>{
    backendApi.post("/trades", {
      trade: {
          pokemons_group_one: trainerOne.map(value => value.name),
          pokemons_group_two: trainerTwo.map(value => value.name),
          is_fair: isFair
      }
    })
  }  

  useEffect(() => {
    loadMorePokemons()
  }, [])

  
  useEffect(() => {

    if(trainerOne.length!=0 && trainerTwo.length!=0){
      let trainerOneXP = trainerOne.map(item => item.base_experience).reduce((prev, next) => prev + next);
      let trainerTwoXP = trainerTwo.map(item => item.base_experience).reduce((prev, next) => prev + next);     
      let totalXPs = [trainerOneXP, trainerTwoXP].sort(function(a, b){return a-b})
      if ((totalXPs[1] - totalXPs[0])<totalXPs[1]*0.1){
        setIsFair(true)
        setMissingXp(0)
      }else{
        setIsFair(false) 
        setMissingXp((totalXPs[1] - totalXPs[0])-totalXPs[1]*0.1)
      }
    }

  }, [trainerOne,trainerTwo])

  const addTrainerPokemons = (pokemon, trainer) => {
    switch (trainer) {
      case "trainerOne":
        if (trainerOne.length < 6) settrainerOne([...trainerOne, pokemon]);
        break;
        case "trainerTwo":
          if (trainerTwo.length < 6) settrainerTwo([...trainerTwo, pokemon])
          break;    
      default:
        break;
    }
  };

  
  return (
    <div>
      <div className="container ">

        { !!(trainerOne.length && trainerTwo.length) &&
          <div className={`alert alert-${isFair ? 'success' : 'danger'}`} role="alert">
              {isFair ? 
                "A troca está justa !"  
              : 
                `A troca não está justa, são necessários ${missingXp.toFixed(2)} de XP para balancear`
              }
          </div>
        }


        <div className="d-flex justify-content-center">

        <button className="btn btn-dark m-2" onClick={() => confirmTrade()}>Realizar Troca</button>
        </div>
          <div className="row">
              
              <div className="trainer col">
              <h6>Treinador 1</h6>
              {trainerOne.map((pokemon, index) => (
                <img key={index} src={pokemon.sprite} alt=""/>
              ))}
              </div>
              <div className="trainer col">
              <h6>Treinador 2</h6>
              {trainerTwo.map((pokemon, index) => (
                <img key={index} src={pokemon.sprite} alt=""/>
              ))}
              </div>
          </div>
          <div className="sprites_row">
    
          <div className="infinite-scroll">

            <InfiniteScroll
                pageStart={0}
                loadMore={loadMorePokemons}
                hasMore={hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
                >                  
                <div className="pokemon-list">
                    {pokemons.map((pokemon, index) => (
                    <div className="pokemon">
                    <div className="card" >
                    <img className="card-img-top" src={pokemon.sprite} alt="Card image cap"/>
                    <div className="card-body">
                    <h6 className="card-text">{pokemon.name}</h6>
                    <button className="btn btn-primary m-1"
                    onClick={() => addTrainerPokemons(pokemon, "trainerOne")}>T1</button>
                    <button className="btn btn-secondary m-1"
                    onClick={() => addTrainerPokemons(pokemon, "trainerTwo")}
                    >T2</button>

                    </div>
                    </div>
                    </div>
                  ))}
                </div>
            </InfiniteScroll>  
          </div>
          
      </div>
      </div>

    </div>
  )
}

export default Trade
