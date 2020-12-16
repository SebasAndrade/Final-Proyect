//Dependencies
import { useContext } from "react";
import { AdminpageContext } from "../context/AdminpageContext";
//Components
import CourseCard from '../components/Cards/CourseCard';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import Banner from '../components/Banner/Banner';
//CSS
import "../components/Banner/Banner.css"

const Home = () => {
  const { courses, setCourses } = useContext(AdminpageContext);
    return (
      <>
        <div className="homeBody">
          <HeroSlider />
          <div className="row cardCourse m-0 justify-content-center">
            {
              courses.length === 0
              ? "No hay cursos disponibles"
                : courses.map((courseCard, index) => (
                  <CourseCard key={index} courseCard={courseCard} />
                ))
            }
          </div>
          <Banner />
        </div>
      </>
    );
}
export default Home;
