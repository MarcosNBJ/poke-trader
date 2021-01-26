import React, { useEffect, useState } from 'react';
import backendApi from './backendApi';
import Message from './Message';
import TrainerContainer from './TrainerContainer';
import PokemonsContainer from './PokemonsContainer';

function Trade() {
  const [trainerOne, settrainerOne] = useState([]);
  const [trainerTwo, settrainerTwo] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isFair, setIsFair] = useState(false);
  const [missingXp, setMissingXp] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [resultMessage, setResultMessage] = useState('');

  const loadMorePokemons = () => {
    backendApi.get('/pokemons', {
      params: {
        limit: 200,
        offset,
      },
    }).then((response) => {
      setPokemons(response.data.data);
      setOffset(offset + 20);
    });
  };

  useEffect(() => {
    loadMorePokemons();
  }, []);

  const confirmTrade = () => {
    if (trainerOne.length && trainerTwo.length) {
      backendApi.post('/trades', {
        trade: {
          pokemons_group_one: trainerOne.map((value) => value.name),
          pokemons_group_two: trainerTwo.map((value) => value.name),
          is_fair: isFair,
        },
      }).then(() => {
        setResultMessage('Trade registrada com sucesso !');
      });
    } else {
      setResultMessage('Deve haver no minimo um pokemon de cada lado');
    }
  };

  useEffect(() => {
    if (trainerOne.length && trainerTwo.length) {
      const trainerOneXP = trainerOne.map((item) => item.base_experience).reduce((prev, next) => prev + next);
      const trainerTwoXP = trainerTwo.map((item) => item.base_experience).reduce((prev, next) => prev + next);
      const totalXPs = [trainerOneXP, trainerTwoXP].sort((a, b) => a - b);
      if ((totalXPs[1] - totalXPs[0]) < totalXPs[1] * 0.1) {
        setIsFair(true);
        setMissingXp(0);
      } else {
        setIsFair(false);
        setMissingXp((totalXPs[1] - totalXPs[0]) - totalXPs[1] * 0.1);
      }
    }
  }, [trainerOne, trainerTwo]);

  const addTrainerPokemons = (pokemon, trainer) => {
    switch (trainer) {
      case 'trainerOne':
        if (trainerOne.length < 6) settrainerOne([...trainerOne, pokemon]);
        break;
      case 'trainerTwo':
        if (trainerTwo.length < 6) settrainerTwo([...trainerTwo, pokemon]);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container ">

      {!!(trainerOne.length && trainerTwo.length)
        && (
        <Message
          type={isFair ? 'success' : 'danger'}
          content={isFair ? 'A troca está justa !'
            : `A troca não está justa, são necessários ${missingXp.toFixed(2)} de XP para balancear`}
        />
        )}

      {!!(resultMessage)
        && <Message type="dark" content={resultMessage} />}

      <div className="d-flex justify-content-center">
        <button className="btn btn-dark m-2" onClick={() => confirmTrade()}>Realizar Troca</button>
      </div>
      <TrainerContainer trainerOne={trainerOne} trainerTwo={trainerTwo} />
      <PokemonsContainer loadMorePokemons={loadMorePokemons} pokemons={pokemons} addTrainerPokemons={addTrainerPokemons} />
    </div>
  );
}

export default Trade;
