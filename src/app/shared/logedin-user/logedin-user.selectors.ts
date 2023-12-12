import { createFeatureSelector, createSelector } from '@ngrx/store';

const getUserState = createFeatureSelector<string>('username');

export const getUser = createSelector(getUserState, (state) => state);
