import { equalTo, getDatabase, onValue, orderByChild, query, ref } from "firebase/database";
import { useDispatch } from "react-redux";
import { getThemes } from "../redux/themes";
import { useCallback } from "react";

export const useGetThemes = () => {
   const dispatch = useDispatch();
   const db = getDatabase();

   return useCallback(
      (uid:string) => {
         const dbRef = query(ref(db, 'themes'), orderByChild('authorUID'), equalTo(uid));
         onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(getThemes(data))
         });
      },
      [db, dispatch]
   );
};