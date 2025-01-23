import express from "express";
import {
  addCategory,
  getCategoriesByCertificateId,
  getCategory,
  getCertificateTypes,
  getCoursesBySubCategoryId,
} from "../../controller/Course/category.controller.mjs";
import upload from "../../middleware/fileUpload.mjs";
const router = express.Router();

router.get("/certificates", getCertificateTypes);
router.get("/getcategory", getCategory);
router.post("/addcategory", upload.single("categoryImage"), addCategory);

router.get("/subcategories/:certificate_id", getCategoriesByCertificateId);
router.get("/subcourses/:sub_category_id", getCoursesBySubCategoryId);

export default router;
