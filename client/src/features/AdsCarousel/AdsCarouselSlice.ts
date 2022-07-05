import { createSlice } from '@reduxjs/toolkit';
import adItems from '../../assets/adItems';

interface IAdItem {
	id: number;
	image: string;
}

export interface AdsCarouselState {
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

// export const {} = adsCarouselSlice.actions

export default adsCarouselSlice.reducer;
