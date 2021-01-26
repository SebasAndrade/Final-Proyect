//Dependencies
import { useState, useEffect, useContext } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import clientAxios from '../config/Axios';
import Comments from '../components/Cards/Comments';
import AuthContext from './../context/auth/authContext'
//Icons
import { AiOutlineYoutube, AiOutlineCloudDownload, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FcApproval, FcSmartphoneTablet } from 'react-icons/fc'
import { CgInfinity } from 'react-icons/cg'
//Css
import '../styles/courseDetail.css';
import '../styles/colorspallete.css';


const CourseDetail = ({ match }) => {
    const { user } = useContext(AuthContext)
    const [course, setCourse] = useState([]);
    const [comment, setComment] = useState([]);
    const [isAllowed,setIsAllowed] = useState(false)
    const { name, description, image, directedBy, subscription } = course;
    const idCourse = match.params.idCourse;

    useEffect(() => {
        const getCoursesById = async () => {
            try {
                const course = await clientAxios.get(`/courses/id/${idCourse}`);
                setCourse(course.data);
            } catch (error) {
                console.log(error);
            }
        }
        const getComment = async () => {
            try {
                const comments = await axios.get('https://jsonplaceholder.typicode.com/comments?postId=1')
                setComment(comments.data);
            } catch (error) {
                console.log(error)
            }
        }
        getCoursesById();
        getComment();
        console.log('hola');
    }, [idCourse]);
    useEffect(()=>{
        setIsAllowed(isAllowedQuestion(user.subscription,course.subscription))
    },[course])
    const isAllowedQuestion = (userSub, courseSub) => {
        switch (userSub) {
            case 'Diamond':
                return true;
            case 'Gold':
                if (courseSub === 'Diamond') {
                    return false
                }
                else {
                    return true
                }
            case 'Free':
                if (courseSub === 'Free') {
                    return true
                }
                else {
                    return false
                }
            default: return false
        }
    }
    return (
        <div className="bg-color1 containerDetail  main-content">
            <div className="bodyDetail">
                <div className="infoDetail">
                    <h1>{name}</h1>
                    <h3>{description}</h3>
                    <p>Dictated by: <b> {directedBy}</b></p>
                    <p> <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiOutlineStar /> (3.773) qualifications from 12.800 students</p>
                    <Button className="detailBtn">Share</Button>
                </div>
            </div>
                <div className="cardDetail ">
                    <Card style={{ width: '18rem', heigth: '28rem' }}>
                        <div className="">
                            <Card.Img className="cardImage" src={image} />
                            <Card.Body >
                                <h1> {subscription}</h1>
                                <Button className="btnBuy" >{isAllowed?'Empezar ahora!':'Tu suscripción no te permite realizar este curso'}</Button>
                            </Card.Body>
                        </div>
                        <Card.Footer className="benefitsCourse ">
                            <p>This Course Includes:</p>
                            <ul style={{ listStyle: 'none' }}>
                                <li> <AiOutlineYoutube /> 28 hours off on demand video</li>
                                <li> <AiOutlineCloudDownload /> 24 downloadable resources</li>
                                <li> <CgInfinity /> Lifetime access</li>
                                <li> <FcSmartphoneTablet /> You can access from mobile devices</li>
                                <li> <FcApproval /> Certificate of completion</li>
                            </ul>
                        </Card.Footer>
                    </Card>
                </div>
                

            <div className="card-twoDetail">
                <Card>
                    <Card.Body>
                        <h1> You will learn </h1>
                        <li>To create profesional web application</li>
                        <li>A lot of tools, techniques and tricks</li>
                        <li>Get a job as a ReactJS developer</li>
                        <li>Deploy a Firebase</li>
                        <li>Get to know ES6, React and Redux thoroughly</li>
                        <li>All the Hooks: useState, useRef, useEffect, useDebugValue, useMemo, useCallback, useReducer, useContext</li>
                        <li>Apply design patterns and best practices: TDD, SOLID, DRY</li>
                    </Card.Body>
                </Card>
            </div>
            <div className="requiredDetail">
                <h1> Requirements</h1>
                <ul>
                    <li> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis quisquam, veniam, fuga perspiciatis quam a blanditiis, ratione ducimus nesciunt adipisci unde delectus quo recusandae. Iusto qui impedit est quisquam optio! </li>
                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis quisquam, veniam, fuga perspiciatis quam a blanditiis, ratione ducimus nesciunt adipisci unde delectus quo recusandae. Iusto qui impedit est quisquam optio!</li>
                </ul>
                <h1>Who is this course for?</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis quisquam, veniam, fuga perspiciatis quam a blanditiis, ratione ducimus nesciunt adipisci unde delectus quo recusandae. Iusto qui impedit est quisquam optio!</p>
            </div>
            <div className="opinionCards">
                <h1>Course opinions</h1>
                {
                    comment.length === 0 ? 'There are not available courses' : (
                        comment.map((commentsForm, index) => (
                            <Comments key={index} commentsForm={commentsForm} />
                            ))
                            )
                        }
            </div>
                        
        </div>
    )
}
export default CourseDetail;