import Login from './login';
import Staff from './staff';
import Student from './student';

export default [{path:'/', redirect: '/student'}, Login, Staff, Student];
