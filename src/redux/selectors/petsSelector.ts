import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/rootSateType'; // Import RootState from your store
import { useEffect } from 'react';
import { fetchPets } from '../actions/petsActions';
import { Pet } from '../types/petsTypes';

export const usePets = () => {

  const dispatch = useDispatch();

useEffect(()=> {


  dispatch(fetchPets());


},[])

  return useSelector((state: RootState) => state.pets.pets) as Pet[];
};
