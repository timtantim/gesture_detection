import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ItemsList,
  ItemContainer,
  ItemWrapper,
  ItemName,
} from "./SidebarStyles";

// import { dummyData } from "..";
import {SIDEBAR_DATA as dummyData}  from "../../data/Sidebar/Data";
import {useSelector,useDispatch} from 'react-redux';

const SidebarItems = ({ displaySidebar }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [validateStatus,setValidateStatus] = useState(false);
  const [sideBarMenue, setSideBarMenue] = useState(dummyData);
  const [apiReturnStatus,setApiReturnStatus] = useState(false);
  const {loginState,access_token}=useSelector((state)=>state.login);
  const FilterdummyData=(filterOutMenuName)=>{
    const menu=dummyData.filter(function (el) {
        // return el.name !=filterOutMenuName;
        if(filterOutMenuName=='Login'){
            return el.name !=filterOutMenuName;
        }else{
            return el.name !=filterOutMenuName && el.private!=true;
        }
    });
    setSideBarMenue(menu);
  }

  const VerifyToken=(token)=>{
        
    const headers = {
        // "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization" : `Bearer ${token}`,
    }
    const options = {
        method: 'GET',
        headers:headers
    };
    return fetch(`${process.env.REACT_APP_SERVER_API_URL}validate_token`,options)  
    .then( response => response.status)
    .then( response => {
        return response;
    });
  }
  useEffect(() => {
    // const token=localStorage.getItem('access_token');
    if(access_token){
        
        VerifyToken(access_token).then(function(result) {
            setApiReturnStatus(true);
            if(result==200){
                
                FilterdummyData('Login');
                setValidateStatus(true);
            }else{
                FilterdummyData('Logout');
                setValidateStatus(false);
            }
        });
    }else{
        FilterdummyData('Logout');
    }
  },[loginState]);
//   validateStatus
//   alert('老毛執行');



  return (
    // <ItemsList>
    //   {dummyData.map((itemData, index) => (
    //     <ItemContainer
    //       key={index}
    //       onClick={() => setActiveItem(itemData.id)}
    //       //{/* Adding active class when the user clicks */}
    //       className={itemData.id === activeItem ? "active" : ""}
    //     >
    //       <Link to={itemData.path}>
    //         <ItemWrapper>
    //           {itemData.icon}
    //           <ItemName displaySidebar={displaySidebar}>
    //             {itemData.name}
    //           </ItemName>
    //         </ItemWrapper>
    //       </Link>
    //     </ItemContainer>
    //   ))}
    // </ItemsList>

    <ItemsList>
    {sideBarMenue.map((itemData, index) => (
      <ItemContainer
        key={index}
        onClick={() => setActiveItem(itemData.id)}
        //{/* Adding active class when the user clicks */}
        className={itemData.id === activeItem ? "active" : ""}
      >
        <Link to={itemData.path}>
          <ItemWrapper>
            {itemData.icon}
            <ItemName displaySidebar={displaySidebar}>
              {itemData.name}
            </ItemName>
          </ItemWrapper>
        </Link>
      </ItemContainer>
    ))}
  </ItemsList>


   
  );
};

export default SidebarItems;