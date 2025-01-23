import React, { useEffect, useState, useRef } from "react";
import "./Badge.css";
import badge from "../../../Asset/Spinebadge.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function CertificateBadge() {
  const { id } = useParams();
  const [access, setAccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const certificateContentRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}user/gradecertificate/${id}`)
      .then((res) => {
        if (res.data.short === "you need to complete") {
          setMessage(res.data.message);
          setAccess(false);
        } else if (
          res.data.message ===
          "All modules completed. Certificate available for download."
        ) {
          setAccess(true);
        }
      });
  }, [id]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}user/user/${id}`).then((res) => {
      setName(res.data.first_name.trim());
    });
  }, [id]);

  const handleDownloadClick = () => {
    if (access) {
      // Generate certificate image with name for only the specific content
      html2canvas(certificateContentRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "px", "a4");
        pdf.addImage(
          imgData,
          "PNG",
          0,
          0,
          pdf.internal.pageSize.width,
          pdf.internal.pageSize.height
        );
        pdf.save("Certificate.pdf");
      });
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="container certificateparts">
        <h5 className="certificatepara text-center py-3">
          Get Your Certificate
        </h5>
        
        {/* Ref applied only to certificate content */}
        <div className="cetbg my-3" ref={certificateContentRef}>
          <h1>CERTIFICATE</h1>
          <h5>OF COMPLETION</h5>
          <p>PRESENTED TO:</p>
          
          {/* Display dynamic name if access is true, otherwise show static name */}
          <h3>{access ? name : "Aline"}</h3>
          
          <p>
            We proudly present this certificate to {access ? name : "Alina"} in recognition of
            their outstanding achievement.
          </p>
          <img src={badge} alt="Dr Ken Spine" className="badgeimg" />
          <Link>Author Signature</Link>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{message}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      <div className="text-center mt-4">
        <button className="downloadtext updatebtn" onClick={handleDownloadClick}>
          Download
        </button>
      </div>
    </div>
  );
}

export default CertificateBadge;
