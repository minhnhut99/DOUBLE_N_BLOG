import Example from '@/components/example/Example';
import Admin from '@/pages/admin/Admin';
import CreatePost from '@/pages/create_post/CreatePost';
import Global from '@/pages/global/Global';
import Home from '@/pages/home/Home';
import Login from '@/pages/login/Login';
import ProfileSettings from '@/pages/profile_settings/ProfileSettings';
import NotAccess from '@/pages/not_access/NotAccess';
import Register from '@/pages/register/Register';
import Skeleton from '@/components/skeleton/Skeleton';
import { auth } from '@/recoil/atoms/auth';
import { Editor } from '@tinymce/tinymce-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ListingPosts from '@/pages/listing_posts/ListingPosts';
import { Path } from '@/constant/appConstant';
import DetailPost from '@/pages/detail_post/DetailPost';

const Router = () => {
  const authValue = useRecoilValue(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Global />}>
          <Route path="create-post" element={<CreatePost />} />
          <Route path="home" element={<Home />} />
          <Route path="profile-settings" element={<ProfileSettings />} />
          <Route path={Path.posts} element={<ListingPosts />} />
          <Route path="skeleton" element={<Skeleton count={7} />} />
          <Route
            path={`${Path.detail}/category/:category/:postId`}
            element={<DetailPost />}
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="not-access" element={<NotAccess />} />
        <Route path="admin" element={<Admin />} />
        <Route path="example" element={<Example />} />
        <Route path="editors" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
