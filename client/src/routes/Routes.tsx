import Example from '@/components/example/Example';
import Admin from '@/pages/admin/Admin';
import CreatePost from '@/pages/create_post/CreatePost';
import Global from '@/pages/global/Global';
import Login from '@/pages/login/Login';
import NotAccess from '@/pages/not_access/NotAccess';
import Register from '@/pages/register/Register';
import { auth } from '@/recoil/atoms/auth';
import { Editor } from '@tinymce/tinymce-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const Router = () => {
  const authValue = useRecoilValue(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Global />}>
          <Route path="/create-post" element={<CreatePost />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/not-access" element={<NotAccess />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/example" element={<Example />} />
        <Route path="editors" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
