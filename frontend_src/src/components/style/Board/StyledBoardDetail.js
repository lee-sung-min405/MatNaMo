import {
    AddressMainOption, BodyWrapper,  Box_1, Button_1, Button_2,
    Content_Input_1, Content_Input_2, Content_Input_3, Content_Textarea_1,
    ErrorText,
    ErrorText_Wrapper,
    FontOptionOne,
    HeaderFont, ImgFont, Input_1, LabelOption, Picture_Content_Wrapper,
    Section_Content_Wrapper
} from "../../admin/notice/NoticeDetailCss";
import React, {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const StyledBoardUpdate = ({ }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [orderLink, setOrderLink] = useState('');
    const [address, setAddress] = useState('');

    const [title1, setTitle1] = useState("");
    const [section, setSection] = useState("");

    const [errorTitle, setErrorTitle] = useState("");
    const [errorSection, setErrorSection] = useState("");

    function titleOnChange(event) {
        const value = event.target.value;
        setTitle1(value);
        if (event.target.value !== "") {
            setErrorTitle("");
        }
    }
    function sectionOnChange(event) {
        const value = event.target.value;
        setSection(value);
        if (event.target.value !== "") {
            setErrorSection("");
        }
    }

    //  주소 API
    const openAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 선택한 주소를 가져와서 입력 필드를 업데이트
                setAddress(data.address);
            },
        }).open();
    };

    const handleSubmit = () => {
        const article = { title, content, orderLink, address};

        if (!title1) {
            setErrorTitle("* 제목이 입력되지 않았습니다.");
            Swal.fire({
                title: '작성 실패',
                text: '제목을 입력하세요.',
                icon: 'warning',
                confirmButtonText: '확인'
            });
        } else {
            setErrorTitle("");
        }

        if (!section) {
            setErrorSection("* 내용이 입력되지 않았습니다.");
            Swal.fire({
                title: '작성 실패',
                text: '내용을 입력하세요.',
                icon: 'warning',
                confirmButtonText: '확인'
            });
        } else {
            setErrorSection("");
        }
        if (title1 && section) {
            // 서버로 게시글 데이터를 보내는 POST 요청
            axios.post('/board/detail', article)
                .then(response => {
                    // 게시글 작성 성공 시 작업을 수행
                    console.log('게시글이 작성되었습니다.');
                    Swal.fire({
                        title: '성공!',
                        text: '게시글이 등록되었습니다.',
                        icon: 'success',
                        confirmButtonText: '확인'
                    });
                    window.location.href = "/board"; // 게시판 페이지로 리다이렉트

                })
                .catch(error => {
                    // 오류 처리
                    console.error('게시글 작성 중 오류가 발생했습니다:', error);
                    Swal.fire({
                        title: '오류!',
                        text: '게시글 작성 중 오류가 발생했습니다.',
                        icon: 'error',
                        confirmButtonText: '확인'
                    });
                });
        }
    }

    return (
        <>
            <BodyWrapper>
                <HeaderFont>게시글 등록</HeaderFont>
                <Section_Content_Wrapper>
                    <ErrorText_Wrapper>
                        <FontOptionOne>제목</FontOptionOne>
                        <ErrorText>{errorTitle}</ErrorText>
                    </ErrorText_Wrapper>

                    <Content_Input_1
                        placeholder="제목을 작성해주세요."
                        type="text"
                        value={title}
                        onChange={e => {
                            setTitle(e.target.value);
                            // 다른 이벤트 핸들러 호출
                            titleOnChange(e);
                        }}
                    ></Content_Input_1>

                    <ErrorText_Wrapper>
                        <FontOptionOne>내용</FontOptionOne>
                        <ErrorText>{errorSection}</ErrorText>
                    </ErrorText_Wrapper>

                    <Content_Textarea_1
                        placeholder="내용을 작성해주세요."
                        value={content}
                        onChange={e => {
                            setContent(e.target.value)
                            // 다른 이벤트 핸들러 호출
                            sectionOnChange(e);
                        }}

                    ></Content_Textarea_1>

                    <ErrorText_Wrapper>
                        <FontOptionOne>주소</FontOptionOne>
                        {/*<ErrorText>{errorAddress}</ErrorText>*/}
                    </ErrorText_Wrapper>

                    <AddressMainOption>
                        <Content_Input_3
                            placeholder="07250"
                            // onChange={addressOnChange}
                        ></Content_Input_3>
                        <Button_1 onClick={openAddressSearch}>
                            도로명 검색
                        </Button_1>
                    </AddressMainOption>

                    <Content_Input_1 type="text" placeholder="주소" value={address} readOnly></Content_Input_1>
                    <Content_Input_1 placeholder="상세 주소"></Content_Input_1>
                    <ErrorText_Wrapper>
                        <FontOptionOne>그룹 주문</FontOptionOne>
                        {/*<ErrorText>{errorYoutubeLink}</ErrorText>*/}
                    </ErrorText_Wrapper>

                    <Content_Input_2
                        placeholder="그룹주문 링크를 작성해주세요."
                        value={orderLink}
                        onChange={e => setOrderLink(e.target.value)}
                        // onChange={youtubeLinkOnChange}
                    ></Content_Input_2>

                    <FontOptionOne>사진 첨부</FontOptionOne>
                    <Picture_Content_Wrapper>
                        <Box_1>
                            <ImgFont>Upload</ImgFont>
                        </Box_1>
                        <Box_1>
                            <ImgFont>Upload</ImgFont>
                        </Box_1>
                        <Box_1>
                            <ImgFont>Upload</ImgFont>
                        </Box_1>
                    </Picture_Content_Wrapper>

                    <FontOptionOne>메인 설정</FontOptionOne>
                    <AddressMainOption>
                        <Input_1 type="radio"></Input_1>
                        <LabelOption>유튜브</LabelOption>

                        <Input_1 type="radio"></Input_1>
                        <LabelOption>사진</LabelOption>
                    </AddressMainOption>
                </Section_Content_Wrapper>

                <Button_2  onClick={handleSubmit}>등록하기</Button_2>
            </BodyWrapper>
        </>
    );
};

export default StyledBoardUpdate;