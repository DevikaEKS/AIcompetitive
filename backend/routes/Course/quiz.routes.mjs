import express from "express";
import {
  addBulkQuestion,
  addQuestion,
  createQuiz,
  createQuizAttempt,
  downloadSampleQuestionFormat,
  fetchQuizQuestions,
  getPracticeTestDifficulty,
  getQuestion,
  getQuestionByModule,
  getQuestionsByModuleAndCourse,
  getQuestionsWithAnswers,
  getQuizAttemptsByUserId,
  getQuizType,
  getSampleQuestionsByCourseAndQuizType,
  practiceTestCreation,
  practiceTestGetQuestions,
  saveQuizAttempt,
  storeSampleQuestionData,
  testCreation,
  updateQuestionByModule,
} from "../../controller/Course/quiz.controller.mjs";
import upload from "../../middleware/fileUpload.mjs";
const router = express.Router();

router.post("/addquestion", addQuestion);
router.post("/uploadquestions", upload.single("file"), addBulkQuestion);
router.get("/download-sample", downloadSampleQuestionFormat);

router.get("/getquestion", getQuestion);
router.get("/getmodulequestions/:moduleId", getQuestionByModule);
router.post("/updatequestion", updateQuestionByModule);
router.get("/questions/:course/:module", getQuestionsByModuleAndCourse);
router.get("/getquiztype", getQuizType);
router.get("/fetch/:courseId/:moduleId/:quizTypeId", fetchQuizQuestions);

router.post("/createquiz", createQuiz);
router.post("/savequiz/:user_id/:ass_id/:module", saveQuizAttempt);

router.get("/getcorrectanswers/:courseid/:moduleid", getQuestionsWithAnswers);

// -----------------------------------------------------------------

router.post("/createtest", upload.single("image"), testCreation);
router.post("/practicetest", practiceTestCreation);

router.get("/practicequestion/:id", practiceTestGetQuestions);
router.get('/practicedifficulty/:id/:user_id',getPracticeTestDifficulty)

router.post('/storesamplequestion',storeSampleQuestionData)
router.get("/sample-past-papers/:courseid/:quiz_type_id", getSampleQuestionsByCourseAndQuizType);

router.post("/quiz-attempts", createQuizAttempt);
// Get quiz attempts by user ID
router.get("/quiz-attempts/user/:user_id/:courseid/:quiz_type", getQuizAttemptsByUserId);

export default router;
