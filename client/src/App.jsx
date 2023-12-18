/* eslint-disable no-unused-vars */
import Navbar from "./components/navbar";
import ForumPostForm from "./components/forumPostForm";
import ForumPost from "./components/forumPost";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/loginPage";
import SignupPage from "./components/signupPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<ForumPost />} />
          <Route path="/createPost" element={<ForumPostForm />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route> */}

          <Route path="/" element={<SignupPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-post" element={<ForumPostForm />} />
          <Route path="/feed" element={<ForumPost />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
