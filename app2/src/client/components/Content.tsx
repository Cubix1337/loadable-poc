import React from 'react';
import { gql, useQuery } from '@apollo/client';

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;


export interface PokemonListProps {
  limit: number;
  offset: number;
}

const Content: React.FC<PokemonListProps> = ({limit, offset}: PokemonListProps) => {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit, offset },
    fetchPolicy: 'cache-first',
  });

  if (loading) return <span>loading...</span>;
  if (error) return <span>Error! {error.message}</span>;

  return (
    <div 
    style={{
      padding: '1rem',
      borderRadius: '0.25rem',
      border: '4px dashed #4169e1',
    }}>
      {JSON.stringify(data)}
    </div>
    
  );
};

export default Content;