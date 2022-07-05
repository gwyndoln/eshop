import { configureStore } from '@reduxjs/toolkit';
import adsCarouselReducer from '../features/AdsCarousel/AdsCarouselSlice';

export const store = configureStore({
	reducer: {
		adsCarousel: adsCarouselReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
