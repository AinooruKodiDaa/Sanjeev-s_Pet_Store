import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/rootSateType'; // Import RootState from your store
import { fetchStates } from '../actions/statesActions';
import { useEffect } from 'react';
import { State } from '../types/statesType';

export const useStates = () => {

  const dispatch = useDispatch();

  useEffect(()=> {
  
  
    dispatch(fetchStates());
  
  
  },[])

  
  return useSelector((state: any) => state.states.states) as State[];
};
