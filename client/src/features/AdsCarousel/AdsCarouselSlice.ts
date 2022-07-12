import { createSlice } from '@reduxjs/toolkit';
import adItems from '../../assets/adItems';

export interface IAdItem {
	id: number;
	image: string;
}

interface AdsCarouselState {
	value: IAdItem[];
}

const initialState: AdsCarouselState = {
	value: adItems,
};

const adsCarouselSlice = createSlice({
	name: 'adsCarousel',
	initialState,
	reducers: {},
});

export default adsCarouselSlice.reducer;
