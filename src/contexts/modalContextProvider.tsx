import { createContext, useContext, useReducer } from "react";
const initialValue = {
  isImportExportPetsModalOpen:false,
  isAdvancedSearchModalOpen:false,
  isAddPetModalOpen: false,
  isDeletePetModalOpen: false,
  isViewPetModalOpen: false, // New flag for view modal
  payload: "",
};


type StateType = {
  isImportExportPetsModalOpen:boolean;
  isAdvancedSearchModalOpen:boolean;
  isAddPetModalOpen: boolean;
  isDeletePetModalOpen: boolean;
  isViewPetModalOpen: boolean,
  payload: string | number | object | any;
};
type ActionTypes = "OPEN_IMPORTEXPORT_PET_MODAL"|"OPEN_ADVANCED_SEARCH_MODAL"| "OPEN_ADDEDIT_PET_MODAL" | "OPEN_DELETE_PET_MODAL" | "OPEN_VIEW_PET_MODAL" | "CLOSE" ;


export interface ActionInterface {
  type: ActionTypes;
  payload: string | number | object; // Adjust this based on the type of payload you want for VIEW action
}


type ContextType = {
  isModalOpen: StateType;
  setIsModalOpen: React.Dispatch<ActionInterface>;
};

const ModalContext = createContext<ContextType>({
  isModalOpen: initialValue,
  setIsModalOpen: () => {},
});

const reducer = (state: StateType, action: ActionInterface): StateType => {
  switch (action.type) {


    case "OPEN_IMPORTEXPORT_PET_MODAL": 
    return {
      isImportExportPetsModalOpen:true,
      isAdvancedSearchModalOpen:false,
      isAddPetModalOpen: false,
      isDeletePetModalOpen: false,
      isViewPetModalOpen: false, 
      payload: "",
      
    };

    case "OPEN_ADVANCED_SEARCH_MODAL": 
    return {
      isImportExportPetsModalOpen:false,
      isAdvancedSearchModalOpen:true,
      isAddPetModalOpen: false,
      isDeletePetModalOpen: false,
      isViewPetModalOpen: false, 
      payload: "",
      
    };

    case "OPEN_ADDEDIT_PET_MODAL":
      return {
        isImportExportPetsModalOpen:false,
        isAdvancedSearchModalOpen:false,
        isAddPetModalOpen: true,
        isDeletePetModalOpen: false,
        isViewPetModalOpen: false, 
        payload: action.payload,
      };

    case "OPEN_DELETE_PET_MODAL":
      return {
        isImportExportPetsModalOpen:false,
        isAdvancedSearchModalOpen:false,
        isAddPetModalOpen: false,
        isViewPetModalOpen: false, 
        isDeletePetModalOpen: true,
        payload: action.payload,
      };

    case "OPEN_VIEW_PET_MODAL":
      return {
        isImportExportPetsModalOpen:false,
        isAdvancedSearchModalOpen:false,
        isAddPetModalOpen: false,
        isDeletePetModalOpen: false,
        isViewPetModalOpen: true, // Assuming you want to add this flag for view modal
        payload: action.payload,
      };

    case "CLOSE":
      return {
        ...state,
        isImportExportPetsModalOpen:false,
        isAdvancedSearchModalOpen:false,
        isAddPetModalOpen: false,
        isDeletePetModalOpen: false,
        isViewPetModalOpen: false,
      };

    default:
      return state;
  }
};


type ModalProvierProps = {
  children: React.ReactNode;
};

export const ModalProvider: React.FC<ModalProvierProps> = (
  props
) => {
  const [isModalOpen, setIsModalOpen] = useReducer(reducer, initialValue);

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {props.children}
    </ModalContext.Provider>
  );
};

export const useIsModalOpen = () => useContext(ModalContext);
