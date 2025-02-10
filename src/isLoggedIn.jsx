import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Δημιουργία atom για το isLoggedIn
export const isLoggedInAtom = atomWithStorage('isLoggedIn', false);
export const loggedUserAtom = atomWithStorage('loggedUser', '');
export const formData = atom('');