import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/rootSateType'; // Import RootState from your store
import { fetchCategories } from '../actions/categoriesActions';
import { useEffect } from 'react';
import { Category } from '../types/categoriesType';

export const useCategories = () => {

  const dispatch = useDispatch();

  useEffect(()=> {
  
  
    dispatch(fetchCategories());
  
  
  },[])


  return useSelector((state: any) => state.categories.categories) as Category[];
};
