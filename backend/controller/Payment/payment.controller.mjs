import Stripe from "stripe";
import dotenv from "dotenv";
import db from "../../config/db.config.mjs";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { items } = req.body;
    const { id } = req.params;

    console.log("Received items:", items, "User ID:", id);

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items provided." });
    }

    const courseIds = items.map((item) => item.courseid); // Extract course IDs from items

    // Fetch the existing enrolled_courses field for the user
    const selectQuery = "SELECT enrolled_courses FROM user WHERE user_id = ?";
    db.query(selectQuery, [id], (err, result) => {
      if (err) {
        console.error("Error fetching enrolled courses: ", err);
        return res.status(500).json({ error: "Database query failed." });
      }

      console.log("Database result:", result);

      let enrolledCourses = [];
      if (result.length > 0) {
        const rawEnrolledCourses = result[0].enrolled_courses;
        console.log("Raw enrolled_courses:", rawEnrolledCourses);

        if (rawEnrolledCourses) {
          try {
            // Check if it's already an array or a string
            enrolledCourses = Array.isArray(rawEnrolledCourses)
              ? rawEnrolledCourses // If already an array, use it directly
              : JSON.parse(rawEnrolledCourses); // Otherwise, parse it
            console.log("Parsed enrolled_courses:", enrolledCourses);
          } catch (parseError) {
            console.error("Error parsing enrolled_courses: ", parseError);
            return res
              .status(500)
              .json({ error: "Invalid data in enrolled_courses field." });
          }
        }
      }

      console.log("Existing enrolledCourses array:", enrolledCourses);

      // Merge the new course IDs into the existing array (avoid duplicates)
      const updatedCourses = Array.from(
        new Set([...enrolledCourses, ...courseIds])
      );
      console.log("Updated courses array:", updatedCourses);

      // Update the enrolled_courses field in the database
      const updateQuery =
        "UPDATE user SET enrolled_courses = ? WHERE user_id = ?";
      db.query(
        updateQuery,
        [JSON.stringify(updatedCourses),id], // Stringify the updated array for storage
        (err, updateResult) => {
          if (err) {
            console.error("Error updating enrolled_courses: ", err);
            return res.status(500).json({ error: "Database update failed." });
          }

          console.log("Database update successful:", updateResult);

          // Insert into user_enrollment table with time_created
          const enrollmentQuery = `
            INSERT INTO user_enrollment (user_id, time_created)
            VALUES (?, NOW())
          `;
          db.query(enrollmentQuery, [id], (err, enrollmentResult) => {
            if (err) {
              console.error("Error inserting into user_enrollment: ", err);
              return res
                .status(500)
                .json({ error: "Database insertion failed." });
            }

            console.log("User enrollment logged:", enrollmentResult);

            const lineItems = items.map((item) => ({
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.name,
                },
                unit_amount: item.price * 100, // Convert price to cents
              },
              quantity: item.quantity,
            }));

            // Create the Stripe session
            stripe.checkout.sessions
              .create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                success_url: `${process.env.DOMAIN}/user/${id}/payment`,
                cancel_url: `${process.env.DOMAIN}/user/${id}/payment`,
              })
              .then((session) => {
                res.json({ id: session.id });
              })
              .catch((error) => {
                console.error("Error creating Stripe session: ", error);
                res.status(500).json({
                  error: "Internal Server Error",
                  message: error.message,
                });
              });
          });
        }
      );
    });
  } catch (error) {
    console.error("Error: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
