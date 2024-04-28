export interface State {
  id: number;
  name: string;
  abbreviation: string;
}

export interface StatesState {
  states: State[];
  loading: boolean;
  error: string | null;
}
