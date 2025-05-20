// import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import ProfileForm from '../components/ProfileForm';

const PersonAdd = () => {


  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>Додати людину</h1>
        <ProfileForm />
      </div>
      <SiteFooter />
    </div>
  );
};

export default PersonAdd;