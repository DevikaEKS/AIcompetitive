import db from "../../config/db.config.mjs";

export const getCertificateTypes = (req, res) => {
  const query = 'SELECT * FROM type_of_certificate';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching certificate types:', error);
      return res.status(500).json({ message: 'Failed to fetch data', error });
    }
    return res.status(200).json({ certificates: results });
  });
};

export const getCategory = (req, res) => {
  const getCategory = "select * from course_category";

  db.query(getCategory, (err, result) => {
    if (err) {
      console.log("error", err);
      res.json({ message: "db_error" });
    } else {
      res.status(200).json({ result });
    }
  });
};

export const addCategory = (req, res) => {
  const { course_category_name, certificate_id } = req.body;
  const category_image = req.file ? `/uploads/${req.file.filename}` : null;

  // Validate inputs
  if (!course_category_name || !certificate_id) {
    return res.json({ message: "course_category_name and certificate_id are required" });
  }

  if (!category_image) {
    return res.json({ message: "Category image is required" });
  }

  const addCategoryQuery = `
    INSERT INTO course_category (course_category_name, certificate_id, image) 
    VALUES (?, ?, ?)
  `;

  db.query(
    addCategoryQuery,
    [course_category_name, certificate_id, category_image],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ message: "Database error occurred" });
      }

      const newCategoryId = result.insertId;
      return res.json({
        message: "Category and image added successfully",
        course_category_id: newCategoryId,
        course_category_name: course_category_name,
        certificate_id: certificate_id,
        category_image: category_image,
      });
    }
  );
};


// ------------

export const getCategoriesByCertificateId = (req, res) => {
  const { certificate_id } = req.params;
  console.log(certificate_id);
  // Check if certificate_id is provided
  if (!certificate_id) {
    return res.status(400).json({ message: "Certificate ID is required." });
  }

  // Query to fetch categories based on certificate_id
  const query = `
    SELECT 
      course_category_id, 
      certificate_id, 
      course_category_name, 
      CONCAT(?, image) AS image 
    FROM 
      course_category 
    WHERE 
      certificate_id = ?
  `;

  // Using environment variable for base URL
  const baseUrl = process.env.URL || "http://localhost:3000";

  db.query(query, [baseUrl, certificate_id], (err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).json({ message: "Internal server error." });
    }

    // Return the fetched data
    if (results.length > 0) {
      res.status(200).json({ categories: results });
    } else {
      res
        .status(404)
        .json({ message: "No categories found for this certificate ID." });
    }
  });
};

export const getCoursesBySubCategoryId = (req, res) => {
  const { sub_category_id } = req.params;

  // Validate sub_category_id
  if (!sub_category_id) {
    return res.status(400).json({ message: "Sub-category ID is required." });
  }

  // Query to fetch courses by sub_category_id
  const query = `
    SELECT 
      courseid, 
      coursename 
    FROM 
      courses 
    WHERE 
      course_category_id = ?
  `;

  db.query(query, [sub_category_id], (err, results) => {
    if (err) {
      console.error("Error fetching courses:", err);
      return res.status(500).json({ message: "Internal server error." });
    }

    // Return the fetched data
    if (results.length > 0) {
      res.status(200).json({ courses: results });
    } else {
      res
        .status(404)
        .json({ message: "No courses found for this sub-category ID." });
    }
  });
};

