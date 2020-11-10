import Login from './login';
import Staff from './staff';
import Student from './student';
import Advisor from './advisor';
import Project from './project';
import Semester from './semester';
import Quota from './quota';
import Projecttype from './projecttype';
import Profileadvisor from './profileadvisor';
import Newadvisor from './newadvisor';
import Newproject from './newproject';
import Addadvisor from './newproject/addadvisor';
// redirect: '/project/unsupervised/0'
export default [
  {path:'/', redirect: '/profileadvisor', props: true}, 
  Login, 
  Project('/project/:status/:idAdvisor', true),
  Profileadvisor('/profileadvisor'),
  Newproject('/newproject/idProject/:idProject/idAdvisor/:idAdvisor', true),
  Newadvisor('/newadvisor'),
  Addadvisor('/newproject/addadvisor/idProject/:idProject', true),
];



