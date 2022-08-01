import { createSlice } from '@reduxjs/toolkit';
import categoryItems from '../../assets/categoryItems';

export interface IcategoryItem {
	id: number;
	image: string;
	cardTitle: string;
	urlTitle: string;
}

export interface CategoryCardsState {
	value: IcategoryItem[];
}

const initialState: CategoryCardsState = {
	value: categoryItems,
};

const categoryCardsSlice = createSlice({
	name: 'categoryCards',
	initialState,
	reducers: {},
});

export default categoryCardsSlice.reducer;
