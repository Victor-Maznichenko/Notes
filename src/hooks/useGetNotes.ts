import { equalTo, getDatabase, onValue, orderByChild, query, ref } from "firebase/database";
import { getNotes } from "../redux/notes";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

export const useGetNotes = () => {
   const dispatch = useDispatch();
   const db = getDatabase();

   return useCallback(
      (uid:string) => {
         const dbRef = query(ref(db, 'notes'), orderByChild('authorUID'), equalTo(uid));
         onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(getNotes(data))
         });
      },
      [db, dispatch]
   );
};