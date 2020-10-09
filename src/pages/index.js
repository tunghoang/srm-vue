import Login from './login';
import Staff from './staff';
import Student from './student';
import Advisor from './advisor';
<<<<<<< Updated upstream
import Project from './project';
import Semester from './semester';

export default [{path:'/', redirect: '/student'}, Login, Staff, Student, Advisor,Project,Semester];
=======
import Semester from './semester';
import Project from './project';

export default [{path:'/', redirect: '/student'}, Login, Staff, Student,Advisor,Semester,Project];

>>>>>>> Stashed changes
