import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { Star, Users, Clock, Video, CheckCircle, ChevronLeft } from "lucide-react";
import RegisterForm from "./RegisterForm";
import './CourseDetails.css';


export default function DetailCours() {
  const navigate = useNavigate();
  const location = useLocation();
  const { course } = location.state || {};
  const [showForm, setShowForm] = useState(false);


  if (!course) return <h2>Cours non trouvé</h2>;

  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)}>
        <ChevronLeft /> Retour
      </button>

      <div className="detail-header">
        <img src={course.image} alt={course.title} className="detail-image" />
        <div className="detail-info">
          <h1>{course.title}</h1>
          <p>{course.description}</p>

          <div className="detail-instructor">
            <img src={course.instructorImage} alt={course.instructor} />
            <span>{course.instructor}</span>
          </div>

          <div className="detail-stats">
            <div><Star /> {course.rating} ({course.reviews} avis)</div>
            <div><Users /> {course.students.toLocaleString()} étudiants</div>
            <div><Clock /> {course.duration}</div>
          </div>

          <div className="detail-features">
            <div><Video /> {course.lessons} leçons</div>
            <div><CheckCircle /> Certificat</div>
          </div>

          <div className="detail-price">
            <span>{course.price}€</span>
            <span className="original">{course.originalPrice}€</span>
          </div>
{!showForm && (
        <button className="btn-register" onClick={() => setShowForm(true)}>
          S'inscrire maintenant
        </button>
      )}

      {/* الفورم يظهر إذا showForm=true */}
      <div className="form-container">
        {showForm && (
          <RegisterForm
            courseId={course._id}
            onSuccess={() => setShowForm(false)} // <-- الفورم يختفي بعد التسجيل
          />
        )}
      </div>

        </div>
      </div>

     <section className="detail-features-list">
  <h2>Ce que vous apprendrez :</h2>
  <ul>
    {course.features?.map((f, i) => <li key={i}>{f}</li>)}
  </ul>
</section>
    </div>
  );
}
