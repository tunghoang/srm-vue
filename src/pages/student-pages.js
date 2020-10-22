import Login from './login';
import Staff from './staff';
import Student from './student';
import Advisor from './advisor';
import Project from './project';
import Semester from './semester';
import Quota from './quota';
import Projecttype from './projecttype';
import project from './project';
import Newproject from './newproject';
import Profilestudent from './profilestudent';

export default [{
  path:'/', redirect: '/profilestudent'}, 
  Login,
  Project('/project/:status/:idStudent', true),
  Newproject('/newproject'),
  Profilestudent('/profilestudent')
];
