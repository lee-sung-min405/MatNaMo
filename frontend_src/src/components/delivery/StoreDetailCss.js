import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import storeImage from "../images/storeImage.png";
import React from "react";


export const StoreDetailBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const StoreDetailBody2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 300px;
`
export const StoreDetailBar = styled.div`
  box-sizing: border-box;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px 10px 10px 10px;
  background-color: #FFFBF6;
  border: 1px solid #BDBDBD;
`
export const StoreDetailBarFlex = styled.div`
  height: 900px;
  margin-left: 0px;
`
export const StoreDetailBarFlex2 = styled.div`
  height: 900px;
  margin-left: 50px;
`

export const StoreDetailBarAll = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  position: sticky;
  top: 0;
`

export const StoreDetailBarHeader= styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #E49400;
  border-radius: 10px 10px 0px 0px;
`
export const StoreDetailStoreImage1=styled.img`
  width: 600px;
  height: 230px;
  object-fit: contain;
  margin-bottom: 5px;
`


export const StoreDetailStoreMenuImage1=styled.img`
  width: 370px;
  height: 200px;
  object-fit: contain;
  background-color: darkgray;
  cursor: pointer
`

export const StoreDetailStoreMenuImage2=styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  background-color: darkgray;
  cursor: pointer
`


export const StoreDetailBarHeaderText = styled.div`
  color: white;
  margin-left: 20px;
  font-weight: 600;
  font-size: 17px;
`
export const StoreDetailBarHeaderText2 = styled.div`
  color: white;
  margin-right: 3px;
  font-weight: 400;
  font-size: 14px;
`
export const StoreDetailBarHeaderIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const StoreDetailHeaderIconImage = styled.img`
  margin: 0px;
  padding: 0px;
  object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
  width: 26px;
  height: 26px;
  margin-right: 20px;
`;

export const StoreDetailSectionText1 = styled.div`
  margin: 10px;
  font-size: 12px;
  font-weight: 500;
  color: darkgrey;
`;

export const StoreDetailSectionText2 = styled.div`
  margin: 10px;
  font-size: 16px;
  font-weight: 600;
  color: black;
`;

export const StoreDetailFooter = styled.div`
  width: 100%;
  margin-top: 20px;
  background-color :  #BDBDBD;
  border-radius: 0px 0px 10px 10px;
  text-align: end;
`;

export const StoreDetailButtonType1 = styled.button`
  width: 300px;
  height: 40px;
  background-color: #E49400;
  color: white;
  border-radius: 5px;
  margin: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
`
export const StoreDetailButtonType2 = styled.button`
  width: 300px;
  height: 40px;
  background-color: #E49400;
  color: white;
  margin: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
`

export const StoreDetailStore = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid #BDBDBD;
  width: 1270px;
  margin-top: 40px;
  background-color: #FFFBF6;
  border-radius: 5px;
  
`
export const StoreDetailStoreHeader = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 30px;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #BDBDBD;
  font-weight: 600;
  font-size: 15px;
  background-color: #E49400;
  color: white;
`

export const StoreDetailStoreTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
`

export const StoreDetailStoreTitle2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 50px;
`

export const StoreDetailStoreText1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  margin-left: 10px;
  font-size: 19px;
`

export const StoreDetailStoreText2 = styled.div`
  color: gray;
  margin-right: 10px;
`
export const StoreDetailStoreText3 = styled.div`
  font-weight: 600;
  font-size: 24px;
  margin-left: 100px;
  border-bottom: 1px solid black;
  width: 1100px;
  padding: 10px;
`

export const StoreDetailStoreText4 = styled.div`
  font-weight: 400;
  font-size: 19px;
  margin-left: 100px;
  margin-top: 10px;
  padding: 10px;
`

export const StoreDetailStoreMenu = styled.div`
  margin-bottom: 50px;
  margin-top: 30px;
  background-color: #FFFBF6;
  border: 1px solid #BDBDBD;
  border-radius: 5px;
`

export const StoreDetailStoreMenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: #FFFBF6;
  border-bottom: 1px solid #BDBDBD;
`

export const StoreDetailStoreMenuHeaderFont = styled.div`
  background-color: #FFFBF6;
  border-bottom: 2px solid #BDBDBD;
  font-size: 24px;
  font-weight: 500;
  margin: 10px;
  cursor: pointer;
  :hover {border-bottom: 2px solid #E49400;}
`

export const StoreDetailStoreMenuSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-collapse: collapse;
  max-width: 1270px;
  overflow-y: auto;
`


export const StoreDetailStoreMenuSection2 = styled.div`
  width: 100%;
  background-color: white;
  cursor: pointer;
  border-top : 1px solid #BDBDBD;
`
export const StoreDetailStoreMenuSection3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-collapse: collapse;
  width: 1270px;
`

export const StoreDetailStoreMenuSectionFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 10px;
  border: 1px solid #BDBDBD;
`
export const ModalFlexType1= styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
export const ModalFlexType2= styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const ModalFlexType3= styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const ModalButton =styled.button`
  width: 100%;
`

export const ModalHr =styled.hr`
  width: 100%;
`

export const ModalFont1=styled.div`
  color: black;
  font-size: 15px;
  font-weight: 600;
`

export const ModalFont2=styled.div`
  color: gray;
  font-size: 15px;
  font-weight: 400;
`
