// import React from 'react';
// import { shallow, ShallowWrapper } from 'enzyme';
// import { PetsComponent } from './';
// import { Provider } from 'react-redux';
// import configureMockStore from "redux-mock-store";


// const mockStore = configureMockStore();
// const store = mockStore({});

// describe('PetsComponent', () => {
//   let wrapper: ShallowWrapper;


//   beforeEach(() => {
//     wrapper = mount(
//       <Provider store={store}>
//         <BrowserRouter>
//           <LoginComponent />
//         </BrowserRouter>
//       </Provider>
//     );
//   });



//   beforeEach(() => {
//     // Mocking the useDispatch hook
//     jest.mock('react-redux', () => ({
//       ...jest.requireActual('react-redux'),
//       useDispatch: jest.fn(),
//       useSelector: jest.fn(),
//     }));
//     // Mocking fetchPets action
//     jest.mock('../../../redux/actions/petsActions', () => ({
//       fetchPets: jest.fn(),
//     }));
//     // Mocking useSelector to return empty pets initially
//     useSelector.mockImplementation(() => ({ pets: [] }));

//     // Rendering the component
//     wrapper = mount(<PetsComponent />);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders without crashing', () => {
//     expect(wrapper.exists()).toBe(true);
//   });

//   it('dispatches fetchPets action on mount', () => {
//     expect(fetchPets).toHaveBeenCalledTimes(1);
//   });

//   // Add more tests as needed
// });
