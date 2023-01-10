import React, { useState } from "react";
import {useSelector,useDispatch} from 'react-redux';
import Moment from 'moment';
import TokenExpireTimeCounter from './TokenExpireTimeCounter';
import {
  Children,
  SidebarContainer,
  SidebarWrapper,
  SidebarLogoWrapper,
  SidebarLogo,
  SidebarBrand,
  SidebarToggler,
} from "./SidebarStyles";
import BrandLogo from "./BrandLogo.svg";

// import { SidebarItems } from "..";
import { default as SidebarItems } from "./SidebarItems";

const MOBILE_VIEW = window.innerWidth < 468;

export default function Sidebar({ children }) {
  
  const [displaySidebar, setDisplaySidebar] = useState(!MOBILE_VIEW);
  const {expires_time}=useSelector((state)=>state.login);
  const {loginState}=useSelector((state)=>state.login);
  const handleSidebarDisplay = (e) => {
    e.preventDefault();
    if (window.innerWidth > 468) {
      setDisplaySidebar(!displaySidebar);
    } else {
      setDisplaySidebar(false);
    }
  };

  return (
    <React.Fragment>
      <SidebarContainer displaySidebar={displaySidebar}>
        <SidebarWrapper>
          <SidebarLogoWrapper displaySidebar={displaySidebar}>
            {/* Logo wrapper starts */}
            <SidebarLogo href="#">
              <span className="app-brand-logo demo">
                <img src={BrandLogo} alt="Brand logo" />
              </span>
              <SidebarBrand
                displaySidebar={displaySidebar}
                className="app__brand__text"
              >
                Frest
              </SidebarBrand>
              
            </SidebarLogo>
     
            {/* Logo wrapper ends */}
            {/* Toggle button */}
            <SidebarToggler
              displaySidebar={displaySidebar}
              onClick={handleSidebarDisplay}
            >
              <div className="outer__circle">
                <div className="inner__circle" />
              </div>
            </SidebarToggler>
          </SidebarLogoWrapper>
          
          
            {
                (loginState==true)?
                <>
                    <div style={{"textAlign": "center"}}>
                        {/* <h4>Token 使用期限:<br/>{Moment(expires_time).format('YYYY-MM-DD HH:mm:ss')}</h4> */}
                        <TokenExpireTimeCounter/>
                    </div>
                </>
                :''
            }
          
          
            
          
 
            {/* Render the SidebarItems component */}
          <SidebarItems displaySidebar={displaySidebar} />
        </SidebarWrapper>
      </SidebarContainer>
            {/* Render the children */}
      <Children displaySidebar={displaySidebar}>{children}</Children>
    </React.Fragment>
  );
}