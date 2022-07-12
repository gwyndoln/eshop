import { configureStore } from '@reduxjs/toolkit';
import adsCarouselReducer from '../features/AdsCarousel/AdsCarouselSlice';
import categoryCardsReducer from '../features/CategoryCards/CategoryCardsSlice';

export const store = configureStore({
	reducer: {
		adsCarousel: adsCarouselReducer,
		categoryCards: categoryCardsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
