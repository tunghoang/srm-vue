import Login from './login';
import Staff from './staff';
import Student from './student';
import Klass from './klass';
import Advisor from './advisor';
import Project from './project';
import Semester from './semester';
import Quota from './quota';
import QuotaChecking from './quota-checking';
import Projecttype from './projecttype';
import Config from './config';
import Cookies from 'js-cookie';
import Newproject from './newproject';
import Newadvisor from './newadvisor';
import Addadvisor from './newproject/addadvisor';
import Addmember from './newproject/addmember';

export default [{path:'/', redirect:'/student'}, Login, Staff, Student, Klass, Advisor, Project('/project'),
Semester,Quota,QuotaChecking,Projecttype,Config,
Newproject('/newproject'),
Newadvisor('/newadvisor'),
Newproject('/newproject/idProject/:idProject', true),
Addadvisor('/newproject/addadvisor/idProject/:idProject',true),
Addmember('/newproject/addmember/idProject/:idProject',true)
];
