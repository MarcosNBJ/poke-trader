import React from 'react';

function TrainerContainer({ trainerOne, trainerTwo }) {
  return (
    <div className="row">

      <div className="trainer col">
        <h6>Treinador 1</h6>
        {trainerOne.map((pokemon, index) => (
          <img key={index} src={pokemon.sprite} alt="" />
        ))}
      </div>
      <div className="trainer col">
        <h6>Treinador 2</h6>
        {trainerTwo.map((pokemon, index) => (
          <img key={index} src={pokemon.sprite} alt="" />
        ))}
      </div>
    </div>
  );
}

export default TrainerContainer;
