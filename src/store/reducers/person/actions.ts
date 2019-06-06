import { action } from 'typesafe-actions';
import { Person, PersonTypes } from './types';

export const personRequest = (personId: number) => action(PersonTypes.PERSON_REQUEST, personId);
export const personSuccess = (data: Person) => action(PersonTypes.PERSON_SUCCESS, data);
export const personFailure = () => action(PersonTypes.PERSON_FAILURE);
export const personClear = () => action(PersonTypes.PERSON_CLEAR);
