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
import Addadvisor from './newproject/addAdvisor';
import Addmember from './newproject/addmember';

export default [{
  path:'/', redirect: '/profilestudent'}, 
  Login,
  Project('/project/:status/:idStudent', true),
  Newproject('/newproject/idProject/:idProject', true),
  Newproject('/newproject'),
  Newproject('/newproject/idProject'),
  Addadvisor('/newproject/addadvisor'),
  Addmember('/newproject/addmember'),
  Profilestudent('/profilestudent')
];
