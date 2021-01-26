import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

function PokemonsContainer({ loadMorePokemons, pokemons, addTrainerPokemons }) {
  return (
    <div className="sprites_row">

      <div className="infinite-scroll">

        <InfiniteScroll
          pageStart={0}
          loadMore={loadMorePokemons}
          hasMore={false}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          <div className="pokemon-list">
            {pokemons.map((pokemon, index) => (
              <div className="pokemon" key={index}>
                <div className="card">
                  <img className="card-img-top" src={pokemon.sprite} alt="Card image cap" />
                  <div className="card-body">
                    <h6 className="card-text">{pokemon.name}</h6>
                    <p className="card-text">{`XP:${pokemon.base_experience}`}</p>
                    <button
                      className="btn btn-primary m-1"
                      onClick={() => addTrainerPokemons(pokemon, 'trainerOne')}
                    >
                      T1
                    </button>
                    <button
                      className="btn btn-secondary m-1"
                      onClick={() => addTrainerPokemons(pokemon, 'trainerTwo')}
                    >
                      T2
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>

    </div>
  );
}

export default PokemonsContainer;
