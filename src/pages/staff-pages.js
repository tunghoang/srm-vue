import Login from './login';
import Staff from './staff';
import Student from './student';
import Advisor from './advisor';
import Project from './project';
import Semester from './semester';
import Quota from './quota';
import Projecttype from './projecttype';
import Cookies from 'js-cookie';

export default [{path:'/', redirect:'/student'}, Login, Staff, Student, Advisor, Project('/project'),Semester,Quota,Projecttype];
