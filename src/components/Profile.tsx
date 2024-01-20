import { useAppSelector } from "../utils/hooks";

const Profile = () => {
   const { uid, photoURL, displayName } = useAppSelector(state => state.user);
   return (
      <>
         {
            uid &&
            <div className="fixed top-2 right-5 flex items-center">
               <img src={photoURL} className="w-12 h-12 p-1 mr-1 rounded-full" alt="Avatar" />
               <span className="font-medium max-w-[15rem] overflow-hidden text-ellipsis whitespace-nowrap">{displayName}</span>
            </div>
         }
      </>
   );
};

export default Profile;
