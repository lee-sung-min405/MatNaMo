import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export  const NoticeCssBody = styled.div`
display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`
export const TheadType1=styled.thead`
  border-bottom: 2px solid black;
`
export  const ThType1=styled.th`
  padding-bottom: 10px;
  font-size: 19px;
  font-weight: 700;
  padding-right: 1080px;
`
export const TableType1=styled.table`
  width: 1200px;
  border-collapse: collapse;
  margin-bottom: 100px;
`
export  const TbodyType = styled.tbody`
  height: 181px;
`

export const TrType1=styled.tr`
  :hover {background-color: #F2D395;}
`

export  const Tdtype1=styled.td`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`

export  const Tdtype4=styled.td`
  text-align: start;
  margin: 0px;
  margin-bottom: 10px;
  font-weight: 400;
  font-size: 16px;
  color: #828282;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid #BDBDBD;
`

export  const Tdtype2=styled.td`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 55px;
  padding-right: 55px;
  background-color: #e49400;
  font-size: 25px;
  font-weight: 700;
  color: white;
  border-right: 20px solid #F7EDD9;
`

export  const Tdtype3=styled.td`
  position: relative;
  width: 190px;
  text-align: end;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-right: 30px;
  border-bottom: 1px solid #ddd;
  font-weight: 700;
  font-size: 19px;
  padding-left: 600px;
`
export const TdContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid #ddd;
  margin-left: 30px;
`
export const TableFontType1 = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #4F4F4F;
`
export const TableFontType2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-weight: 500;
  font-size: 16px;
  color: #4F4F4F;
`
export const TableFontType4 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-weight: 500;
  font-size: 16px;
  color: #4F4F4F;
`


export const TableFontType3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: flex-start;
  font-weight: 500;
  font-size: 16px;
  color: #4F4F4F;
`

export const TableImage1 = styled.img`
  margin: 0px;
  margin-right: 6px;
  padding: 0px;
  object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
  width: 24px;
  height: 24px;
  //position: relative;
  //z-index: 0;
`;
export const TableImage2 = styled.img`
  margin: 0px;
  margin-right: 5px;
  padding: 0px;
  object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
  width: 25px;
  height: 25px;
  position: absolute;
  bottom: 47px;
  right: 150px;
  //position: relative;
  //z-index: 0;
`;
export const WriteImage2 = styled.img`
  margin: 0px;
  margin-right: 6px;
  padding: 0px;
  object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
  width: 24px;
  height: 24px;
  position: absolute;
  left: 7px;
  top: 12px;
`;


export  const TableLinkType =styled(Link)`
  text-decoration: none;
  font-weight: 500;
  font-size: 24px;
  color: black;
`

export const NoticeFontType1 = styled.div`
  font-size: 30px;
  font-weight: 800;
  margin-bottom: 50px;
`
export const WriteButton =styled.button`
  width: 180px;
  height: 52px;
  border-radius: 10px;
  border: 1px solid #F2F2F2;
  font-weight: 500;
  font-size: 16px;
  background-color: white;
  position: relative;
  padding-left: 30px;
  margin-top: 0px;
  margin-bottom: 100px;
  position: relative;
  left: 1000px;
  cursor: pointer;
  
`

export const TbodyDivType1=styled.div`
  max-height: 620px; /* 원하는 높이로 설정 */
  overflow-y: auto; /* 세로 스크롤이 필요할 때만 스크롤 나타나도록 설정 */
`