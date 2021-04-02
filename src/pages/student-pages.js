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
import Addadvisor from './newproject/addadvisor';
import Addmember from './newproject/addmember';
import Manual from './manual';

export default [{
  path:'/', redirect: '/manual/students'}, 
  Login,
  Project('/project/:status/:idStudent', true),
  Newproject('/newproject/idProject/:idProject/idStudent/:idStudent', true),
  Newproject('/newproject/idStudent/:idStudent', true),
  Newproject('/newproject/idProject'),
  Addadvisor('/newproject/addadvisor/idProject/:idProject', true),
  Addmember('/newproject/addmember/idProject/:idProject', true),
  Manual('/manual/:userClass', true),
  Profilestudent('/profilestudent/')
];
