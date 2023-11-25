import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Home 컴포넌트를 import
import Login from './components/Login'; // Login 컴포넌트를 import
import SignUp from "./components/SignUp"; // SignUp 컴포넌트를 import
import Profile from "./components/user/Profile"; // Profile 컴포넌트를 import
import Management from "./components/admin/Management"; // Management 컴포넌트를 import

/* 게시판 */
import Board from "./components/user/board/Board";// Board 컴포넌트를 import
import BoardDetail from "./components/user/board/BoardDetail";
import BoardShow from "./components/user/board/BoardShow";
import BoardUpdate from "./components/user/board/BoardUpdate";

/* 공지사항 */
import Notice from "./components/admin/notice/Notice"; //  Notice 컴포넌트를 import
import NoticeDetail from "./components/admin/notice/NoticeDetail";
import NoticeShow from "./components/admin/notice/NoticeShow";
import NoticeUpdate from "./components/admin/notice/NoticeUpdate";

/* 배달 */
import Store from "./components/delivery/Store";
import StoreDetail from "./components/delivery/StoreDetail";

import GroupOrderPage from './components/delivery/GroupOrderPage';  // 그룹 주문 페이지 컴포넌트
import GroupOrderDetail from "./components/delivery/GroupOrderDetail";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/management" element={<Management />} />

                <Route path="/board" element={<Board />} />
                <Route path="/boardDetail" element={<BoardDetail />} />
                <Route path="/board/:articleId" element={<BoardShow />} />
                <Route path="/board/:articleId/update" element={<BoardUpdate />} />

                <Route path="/notice" element={<Notice />} />
                <Route path="/noticeDetail" element={<NoticeDetail />} />
                <Route path="/notice/:noticeId" element={<NoticeShow />} />
                <Route path="/notice/:noticeId/update" element={<NoticeUpdate />} />

                <Route path="/store/category/:category" element={<Store />} />
                <Route path="/store/:storeId" element={<StoreDetail />} />

                <Route path="/group-order/:groupOrderId" element={<GroupOrderPage />} />
                <Route path="/group-order/delivery/:groupOrderId" element={<GroupOrderDetail />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
