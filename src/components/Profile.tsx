import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Profile = () => {
   const { user } = useSelector((state: RootState) => state.user);
   return (
      <>
         {
            user.uid &&
            <div className="fixed top-2 right-5 flex items-center">
               <img src={user.photoURL} className="w-12 h-12 p-1 mr-1 rounded-full" alt="Avatar" />
               <span className="font-medium max-w-[15rem] overflow-hidden text-ellipsis whitespace-nowrap">{user.displayName}</span>
            </div>
         }
      </>
   );
};

export default Profile;
