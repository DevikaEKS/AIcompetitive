import "./App.css";
import Login from "./Component/Landingpage/Login/Login";
import RegisterPage from "./Component/Landingpage/Register/Register";
import { Footer } from "./Component/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseDetail from "./Component/Admin/Coursedetail/Coursedetail";
import Coursemenubar from "./Component/Student/Coursemenubar/Coursemenubar";
import Contentmodule from "./Component/Instructor/Contentmodule/Contentmodule";
import Sidebarcomp from "./Component/sidebarcomp/sidebarcomp";
import DashboardLayout from "./Component/DashboardLayout/DashboardLayout";
import Admindashboard from "./Component/Admin/Admindashboard/Admindashboard";
import Courseupdation from "./Component/Admin/Courseupdation/Courseupdation";
import Dashboardinstructor from "./Component/Instructor/Dashboardinstructor/Dashboardinstructor";
import Sidebarinstructor from "./Component/Instructor/Sidebarinstructor/Sidebarinstructor";
import RichTextEditorql from "./Component/RichTextEditor/RichTextEditor";
import AdminCredential from "./Component/Admin/Admincredential/Admincredential";
import Categorycreation from "./Component/Admin/Categorycreation/Categorycreation";
import CategoryDropdown from "./Component/Instructor/Categorytree/CategoryDropdown";
import Question from "./Component/Instructor/Question/Question";
// import DisplayContent from "./Component/Admin/Coursecontent/DisplayContent";
import CategoryQuizList from "./Component/Instructor/Questionbank/CategoryQuizList";
import Courselist from "./Component/Instructor/Courselist/Courselist";
import Drkenhome from "./Component/Drken/Drkenhomepage/Drkenhome";
import Courseview from "./Component/Drken/Courseview/Courseview";
import Drmenubar from "./Component/Drken/Drmenubar/Drmenubar";
import Coursevideos from "./Component/Drken/Coursevideos/Coursevideos";
import Videocontent from "./Component/Drken/Videocontent/Videocontent";
import Grade from "./Component/Drken/Grade/Grade";
import CertificateBadge from "./Component/Drken/Badge/CertificateBadge";
import Lessons from "./Component/Drken/Lessons/Lessons";
import Instructors from "./Component/Drken/Instructors/Instructors";
import Overview from "./Component/Drken/Overview/Overview";
import Availablecourses from "./Component/Drken/Availablecourses/Availablecourses";
// import QuestionDisplay from "./Component/Drken/Coursevideos/Questiondisplay";
import Kencoursedashboard from "./Component/Drken/Kencoursedashboard/Kencoursedashboard";
import CourseVideos from "./Component/Drken/Coursevideos/Coursevideos";
import DrmenubarUser from "./Component/Drken/Drmenubar/DrmenubarUser";
import AddCategory from "./Component/Instructor/AddCategory/AddCategory";
import AddCourse from "./Component/Instructor/AddCourse/AddCourse";
import Modulepage from "./Component/Instructor/Modulepage/Modulepage";
import Coursecontent from "./Component/Instructor/Coursecontent/Coursecontent";
import ModuleUpdate from "./Component/Instructor/ModuleUpdate/ModuleUpdate";
import CoursecontentUpdate from "./Component/Instructor/CoursecontentUpdate/CoursecontentUpdate";
import QuestionUpdate from "./Component/Instructor/QuestionUpdate/QuestionUpdate";
// import Module from "./Component/Instructor/Module/Module";
// import CourseContentPage from "./Component/Instructor/CourseContentPage/CourseContentPage";
import QuestionPage from "./Component/Instructor/QuestionPage/QuestionPage";
import { Indiviualmenu } from "./Component/User/UserProfile/UserProfile";
import UpdateCourse from "./Component/Instructor/UpdateCourse/UpdateCourse";
import DashBoardProfile, {
  DashBoardMessage,
  DashBoardPayment,
} from "./Component/User/Dash/Dash";
import { Edit } from "./Component/User/Profile/Edit";
import { Dashboard } from "./Component/Admin/Dashboard/Dashboard";
import CompanyRegister from "./Component/Landingpage/CompanyRegister/CompanyRegister";
import { LicensePurchase } from "./Component/Admin/LicensePurchase/LicensePurchase";
import { CheckPayment } from "./Component/Admin/CheckPayment/CheckPayment";
import { NeftPayment } from "./Component/Admin/NeftPayment/NeftPayment";
import InvitedRegister from "./Component/Landingpage/InvitedRegister/InvitedRegister";
import { Notenrolledfile } from "./Component/Admin/Notenrolledfile/Notenrolledfile";
import SuperAdminDashboard from "./Component/SuperAdmin/SuperAdminDashboard/SuperAdminDashboard";
import { SuperDashboard } from "./Component/SuperAdmin/Dashboard/SuperDashboard";
import { Approve } from "./Component/SuperAdmin/Approve/Approve";
import MapComponent from "./Component/Drken/Mapcomponent/Mapcomponent";
import CourseList from "./Component/Admin/CourseList/CourseList";
import ForgotPassword from "./Component/Landingpage/ForgotPassword/ForgotPassword";
import ResetPassword from "./Component/Landingpage/ResetPassword/ResetPassword";
import SubModule from "./Component/Instructor/SubModule/SubModule";
import Testcreation from "./Component/Instructor/Question/Testcreation/Testcreation";
import UserCourseList from "./Component/Drken/CourseList/CourseList";
import PracticeTest, {CourseDashBoard,MockTest,OldQuestionTest, QuizTest} from "./Component/Drken/CoursePart/CoursePart";
import Modulesidebar from "./Component/Student/modulesidebar/Modulesidebar";
import Drkendashboard from "./Component/Drken/Drkendashboard/Drkendashboard";
import Dashboarduser from "./Component/Drken/Dashboarduser/Dashboarduser";
import TestPractice from "./Component/Drken/TestPractice/TestPractice";
import TestMock from "./Component/Drken/TestMock/TestMock";
import Banner from "./Component/Landingpage/Banner/Banner";
import Competitivenavbar from "./Component/Drken/Competitivenavbar/Competitivenavbar";
import Mytest from "./Component/Landingpage/Mytest/Mytest";
import Enrolled from "./Component/Landingpage/Enrolled/Enrolled";
import CourseBuying from "./Component/Landingpage/CourseBuying/CourseBuying";
import BuyingPage from "./Component/Landingpage/BuyingPage/BuyingPage";
import Purchased from "./Component/User/Purchased/Purchased";
import Successpayment from "./Component/User/Successpayment/Successpayment";
import Studentdashboard from "./Component/User/Studentdashboard/Studentdashboard";
import Enrolledcourses from "./Component/Landingpage/Enrolledcourses/Enrolledcourses";
import QuizPage from "./Component/Drken/QuizPage.js/QuizPage";
import Score from "./Component/User/Score/Score";
import SampleQuestionUpload from "./Component/Instructor/SampleQuestionUpload/SampleQuestionUpload";
import TimerPage from "./Component/Landingpage/BuyingPage/TimerPage";
import Testoverview from "./Component/User/Testoverview/Testoverview";
import Termspage from "./Component/User/Termspage/Termspage";
import Starttest from "./Component/User/Starttest/Starttest";
import AIpart from "./Component/Instructor/Question/AIpart/AIpart";

// import Testdashboard from "./Component/User/Testdashboard/Testdashboard";
// import Examspart from "./Component/User/Examspart/Examspart";
// import Examsidepart from "./Component/User/Examsidpart/Examsidepart";
// import RichTextEditor from './Component/Instructor/Richtexteditor/Richtexteditor';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/reset_password/:token" element={<ResetPassword />} />
          <Route path="/inv_register/:id" element={<InvitedRegister />} />
          <Route path="/business_register" element={<CompanyRegister />} />
          {/* <Route path="/std" element={<Studentdashboard />} /> */}
          {/* <Route path="/" element={[<Menubar />, <Banner />, <Footer />]} /> */}
          <Route path="/" element={[<Competitivenavbar />, <Banner />]}/>
          <Route path="/mytest/:id" element={[<Competitivenavbar />, <Mytest />]}/>
          <Route path="/enrolled/:id" element={[<Competitivenavbar />, <Enrolled />]}/>
          <Route path="/exams/:id/:sub" element={[<Competitivenavbar />, <CourseBuying />]}/>
          <Route path="/exams/payment/:id/:course" element={[<Competitivenavbar />, <BuyingPage />]}/>
          <Route path="/timer/:id/:course/:quizTypeId" element={<TimerPage/>} />
          <Route path="/quizattempt/:id/:course/:quiz_type" element={[<Competitivenavbar />, <QuizPage />]} />
          <Route path="/score/:id/:course/:quiz_type" element={[<Competitivenavbar />, <Score />]} />
          <Route path="/course" element={<Contentmodule />} />
          <Route path="/en" element={[<Competitivenavbar />, <Enrolledcourses />]}/>
          {/* <Route path='/rch' element={<RichTextEditorql/>}/> */}
          <Route path="/superadmin/:id*" element={<SuperAdminDashboard />}>
            <Route path="dashboard" element={<SuperDashboard />} />
            <Route path="approve" element={<Approve />} />
          </Route>

          <Route path="/admindashboard/:id*" element={<Admindashboard />}>
            <Route path="coursedetail" element={<CourseDetail />} />
            <Route path="courseupdate" element={<Courseupdation />} />
            <Route path="admincredential" element={<AdminCredential />} />
            <Route path="category" element={<Categorycreation />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="purlicense" element={<LicensePurchase />} />
            <Route path="check/:quantity" element={<CheckPayment />} />
            <Route path="neft/:quantity" element={<NeftPayment />} />
            <Route path="notenroll" element={<Notenrolledfile />} />
            <Route path="courselist" element={<CourseList />} />
          </Route>
          <Route path="/purchased" element={<Purchased />} />
          <Route path="/instructordashboard/:id*" element={<Dashboardinstructor />}>
            <Route path="courselist" element={<Courselist />} />
            <Route path="addpagecontent" element={[<Coursecontent />]} />
            <Route path="updatepagecontent" element={[<CoursecontentUpdate />]}/>
            <Route path="test" element={<Testcreation />} />
            <Route path="addmodule" element={[<Modulepage />]} />
            <Route path="addsubmodule" element={<SubModule />} />
            <Route path="updatemodule" element={[<ModuleUpdate />]} />
            <Route path="quilltxt" element={<QuestionPage />} />
            <Route path="addquestion" element={<Question />} />
            <Route path="updatequestion" element={<QuestionUpdate />} />
            <Route path="questionbank" element={<CategoryQuizList />} />
            <Route path="category" element={<AddCategory />} />
            <Route path="coursecreation" element={<AddCourse />} />
            <Route path="coursecreation/:course" element={<UpdateCourse />} />
            <Route path="samplequestionupload" element={<SampleQuestionUpload/>} />
          </Route>
          <Route path="/instructorsidebar" element={<Sidebarinstructor />} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
          <Route path="/dropdowncategory" element={<CategoryDropdown />} />    
          <Route path="/questioncreation" element={<Question />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/user/:id" element={[<DrmenubarUser />, <UserCourseList />]}/>
          <Route path="/videos/:id" element={[<DrmenubarUser />, <Videocontent />]}/>
          <Route path="/grade/:id" element={[<DrmenubarUser />, <Grade />]} />
          <Route path="/badge/:id" element={[<DrmenubarUser />, <CertificateBadge />]}/>
          {/* <Route path="/courseview" element={<Courseview/>}/> */}
          <Route path="/lesson" element={<Lessons />} />
          <Route path="/instructor" element={<Instructors />} />
          <Route path="/courseoverview" element={<Overview />} />
          <Route path="/courseview" element={<Courseview />} />
          <Route
            path="/allcourselist/:id"
            element={[<DrmenubarUser />, <Availablecourses />]}/>
          {/* <Route path="/quizquestions" element={<QuestionDisplay />} /> */}
          <Route
            path="/ken/:course/:module/:id"
            element={[<DrmenubarUser />, <CourseVideos />]} />
          <Route
            path="/ken/:course/:module/undefined"
            element={[<Drmenubar />, <CourseVideos />]}/>
          {/* User Route */}
          <Route
            path="/user/:id/profile" element={[<DrmenubarUser />, <DashBoardProfile />]}/>
          <Route path="/user/:id/message" element={[<DrmenubarUser />, <DashBoardMessage />]}/>
          <Route path="/user/:id/payment" element={[<DrmenubarUser />, <DashBoardPayment />]}/>
          <Route path="/user/:id/editprofile" element={<Edit />} />
          <Route path="/user/:id/dash/:courseid" element={<CourseDashBoard />}/>
          <Route path="/user/:id/:courseid/practice/:quiz" element={<PracticeTest />}/>
          <Route path="/user/:id/:courseid/mock/:quiz" element={<MockTest />} />
          <Route path="/user/:id/:courseid/old-questions/:quiz" element={<OldQuestionTest />} />
          {/* <Route path="/testpart/" element={<Testdashboard/>}> */}
          {/* <Route path="examspart" element={<Examspart/>}/> */}
          {/* </Route> */}  
          <Route path="/mp" element={<MapComponent />} />
          <Route path="/successpayment" element={<Successpayment />} />
          <Route path="/userpart/:id/" element={<Dashboarduser />}>
            <Route path="dash/:courseid" element={<TestMock />} />
            <Route path="addsubmodule" element={<SubModule />} />
            <Route path=":courseid/practice/:quiz" element={<TestPractice />} />
            <Route path="quiz/:insertid" element={<QuizTest />} />
            {/* <Route path=":courseid/mock/:quiz" element /> */}
          </Route>
<Route path="/testoverview" element={[<Competitivenavbar/>,<Testoverview/>]}/>
<Route path="/terms/:id" element={[<Competitivenavbar/>,<Termspage/>]}/>
<Route path="/starttest/:id" element={[<Competitivenavbar/>,<Starttest/>]}/>
<Route path="/ai" element={<AIpart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
