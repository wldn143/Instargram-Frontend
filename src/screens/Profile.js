import { useLocation, useParams } from "react-router-dom";

function Profile() {
  const params = useParams();
  const location = useLocation();
  console.log(params);
  console.log(location);
  return (
    <>
      <div>hi</div>
    </>
  );
}
export default Profile;
