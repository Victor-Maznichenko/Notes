import type { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeNote } from '../redux/note';
import { INote } from '../redux/notes';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();


export function useSaveNote(note: INote, textHTML: string, themeID: string) {
   const { uid } = useAppSelector(state => state.user);
   const dispatch = useAppDispatch();

   return () => { 
      const newNote = {
         ...note,
         textHTML
      }
      dispatch(changeNote({ uid, themeID, newNote }));
   }
}
