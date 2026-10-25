
import './Content.css'

const Content = ({ children }) => {
  return (
    <main className="content-wrapper">
       <div className="container-fluid p-5">
          {children}
       </div>
    </main>
  );
};

export default Content;