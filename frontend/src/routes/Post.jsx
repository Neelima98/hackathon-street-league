import { useParams, Link, useNavigate } from "react-router";
import Header from "../components/Reusables/Headers/AltHeader/AltHeader";
import UserIconSmall from "../assets/UserIconSmall";
import GridButton from "../components/Reusables/Buttons/GridButton";
import LockIcon from "../assets/LockIcon";
// TODO: Implement new API - import { fetchVideoDetails } from "../api/video";
import { useEffect, useState, useContext } from "react";

import YoutubeVideo from "../components/YoutubeVideo";
// TODO: Implement new API - import { fetchSeriesVideosById } from "../api/series";
import { AuthContext } from "../context/AuthContext";
import { ModalContext } from "../components/Reusables/Modal/ModalContext";
import { useTranslation } from "react-i18next";

export default function Post() {
  const pdfFileName = "LO1.1 Lesson Plan Customer Service England 25-26.pdf";
  const pdfPath = `/pdfs/${pdfFileName}`;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = pdfFileName;
    link.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Title and Download Section */}
      <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">{pdfFileName}</h1>
        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Download PDF
        </button>
      </div>

      {/* PDF Viewer using iframe */}
      <iframe
        src={pdfPath}
        style={{ width: "100%", height: "700px", border: "1px solid #ddd", borderRadius: "8px" }}
        title="PDF Viewer"
      />
    </div>
  );
}

