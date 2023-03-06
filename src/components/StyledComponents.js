import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const StyledMapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${({ showSidebar }) => (showSidebar ? "75%" : "98%")};
  transition: width 0.5s;
  transition-timing-function: ease-in-out;
`;

export const StyledSidebarContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${({ showSidebar }) => (showSidebar ? "25%" : "2%")};
  transition: width 0.5s;
  transition-timingfunction: ease-in-out;
  box-shadow: 2px 2px 8px #000;
  overflow: scroll;
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  top: 0;
  left: 0;
  padding: 10px;
  position: relative;
  align-items: center;
  line-height: 100%;
`;
