import Example from '@/components/example/Example';
import Admin from '@/pages/admin/Admin';
import CreatePost from '@/pages/create_post/CreatePost';
import Global from '@/pages/global/Global';
import Home from '@/pages/home/Home';
import Login from '@/pages/login/Login';
import ProfileSettings from '@/pages/profile_settings/ProfileSettings';
import NotAccess from '@/pages/not_access/NotAccess';
import Register from '@/pages/register/Register';
import { auth } from '@/recoil/atoms/auth';
import { Editor } from '@tinymce/tinymce-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ListingPosts from '@/pages/listing_posts/ListingPosts';
import { Path } from '@/constant/appConstant';
import DetailPost from '@/pages/detail_post/DetailPost';
import UserSettings from '@/pages/user_settings/UserSettings';
import UserPassword from '@/pages/user_settings/user_password/UserPassword';
import UserPosts from '@/pages/user_settings/my_posts/UserPosts';
import Modal from '@/components/modal/Modal';

const Router = () => {
  const authValue = useRecoilValue(auth);
  const token = authValue?.token;
  const role = authValue.user?.u_role;
  const admin = token && role === 'admin';
  const user = token;

  const privateRoutes = admin && <Route path="admin" element={<Admin />} />;

  const userRoutes = user && (
    <>
      <Route path="create-post" element={<CreatePost />} />
      <Route path="user" element={<UserSettings />}>
        <Route path="profile-settings" element={<ProfileSettings />} />
        <Route path="password" element={<UserPassword />} />
        <Route path="posts" element={<UserPosts />} />
      </Route>
    </>
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Global />}>
          {userRoutes}
          <Route path="home" element={<Home />} />
          <Route path={Path.posts} element={<ListingPosts />} />
          <Route
            path={`${Path.detail}/category/:category/:postId`}
            element={<DetailPost />}
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="not-access" element={<NotAccess />} />
        <Route path="example" element={<Example />} />
        <Route path="editors" element={<Editor />} />
      </Routes>
      {privateRoutes}
    </BrowserRouter>
  );
};

export default Router;
