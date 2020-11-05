import Login from './login';
import Staff from './staff';
import Student from './student';
import Advisor from './advisor';
import Project from './project';
import Semester from './semester';
import Quota from './quota';
import Projecttype from './projecttype';
import Cookies from 'js-cookie';
import Newproject from './newproject';
import Newadvisor from './newadvisor';
import Addadvisor from './newproject/addadvisor';
import Addmember from './newproject/addmember';

export default [{path:'/', redirect:'/student'}, Login, Staff, Student, Advisor, Project('/project'),Semester,Quota,Projecttype,
Newproject('/newproject'),
Newadvisor('/newadvisor'),
Newproject('/newproject/idProject/:idProject', true),
Addadvisor('/newproject/addadvisor/idProject/:idProject',true),
Addmember('/newproject/addmember/idProject/:idProject',true)
];
