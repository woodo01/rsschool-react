import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const MainPage: React.FC = () => {
  const hookFormData = useSelector((state: RootState) => state.forms.hookForms);
  const uncontrolledFormData = useSelector(
    (state: RootState) => state.forms.uncontrolledForms,
  );

  return (
    <div>
      <h1>Main Page</h1>
      <div>
        <h2>Hook Form Data</h2>
        {hookFormData.map((item, key) => (
          <div key={key} className={item.isNewAdded ? "highlight" : ""}>
            <p>Name: {item?.name}</p>
            <p>Age: {item?.age}</p>
            <p>Email: {item?.email}</p>
            <p>Gender: {item?.gender}</p>
            <p>Country: {item?.country}</p>
            <p>Picture:</p>
            {item?.pictureBase64 && (
              <img src={item.pictureBase64} alt="Uploaded" width="100" />
            )}
          </div>
        ))}
      </div>
      <div>
        <h2>Uncontrolled Form Data</h2>
        {uncontrolledFormData.map((item, key) => (
          <div key={key} className={item.isNewAdded ? "highlight" : ""}>
            <p>Name: {item?.name}</p>
            <p>Age: {item?.age}</p>
            <p>Email: {item?.email}</p>
            <p>Gender: {item?.gender}</p>
            <p>Country: {item?.country}</p>
            <p>Picture:</p>
            {item?.pictureBase64 && (
              <img src={item.pictureBase64} alt="Uploaded" width="100" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
