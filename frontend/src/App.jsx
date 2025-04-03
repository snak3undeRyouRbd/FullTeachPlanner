import siteLogo from './assets/images/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css'

function App() {

  return (
    <>
      <div>
        <a href="" target="_blank">
          <img src={siteLogo} className="logo" alt="Site logo" />
        </a>
      </div>
      <h1>Календар планувальник для учнів</h1>
      <div className="card">
      <p className="read-the-docs">
        Опис проекту<br />
        Календар-планувальник для учнів, який дозволяє вчителям створювати події та планувати заходи. Можливі типи подій:<br />

        Екзамен<br />
        Контрольна робота<br />
        Шкільні заходи<br />
        Батьківські збори<br />
        Особисті події<br />
      </p>
      </div>
    </>
  )
}

export default App
