import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseSidebar from "../CourseSidebar/CourseSidebar";
import CourseDash from "../CourseDash/CourseDash";
import TestPractice from "../TestPractice/TestPractice";
import TestMock from "../TestMock/TestMock";
import TestOldQuestion from "../TestOldQuestion/TestOldQuestion";
import QuizPage from "../QuizPage.js/QuizPage";

function PracticeTest() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <CourseSidebar />
        </div>
        {/* <div className="col-lg-1"></div> */}
        <div className="col-sm-10">
          <TestPractice />
        </div>
      </div>
    </div>
  );
}
export default PracticeTest;

export function CourseDashBoard() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <CourseSidebar />
        </div>
        {/* <div className="col-lg-1"></div> */}
        <div className="col-sm-10">
          <CourseDash />
        </div>
      </div>
    </div>
  );
}

export function MockTest() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <CourseSidebar />
        </div>
        {/* <div className="col-lg-1"></div> */}
        <div className="col-sm-10">
          <TestMock />
        </div>
      </div>
    </div>
  );
}

export function OldQuestionTest() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <CourseSidebar />
        </div>
        {/* <div className="col-lg-1"></div> */}
        <div className="col-sm-10">
          <TestOldQuestion />
        </div>
      </div>
    </div>
  );
}

export function QuizTest() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* <div className="col-lg-1"></div> */}
        <div className="col-sm-12">
          <QuizPage />
        </div>
      </div>
    </div>
  );
}
