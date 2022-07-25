import React from "react";
import './footer.css'

const Footer = () => {
    return(
      <div>
        <footer className="text-center text-lg-start bg-light text-dark">
          
          <section className="d-flex justify-content-center justify-content-lg-between p-3 s1s bs">
            <div className="d-none d-xl-block" >
              <span/>
            </div>

            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook is" viewBox="0 0 30 30">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-envelope is" viewBox="0 0 30 30">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-telephone-fill is" viewBox="0 0 30 30">
                <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
              </svg>
            </div>
          </section>

          <section className="bs">
            <div className="container text-center text-md-start">
              <div className="row">
                <div className="col-md-4 col-lg-3 col-xl-3 mb-md-0">
                  <h6 className="fw-bold mb-4">
                    CAKIES  
                    <p><p className="sls"> "Best cake - Best taste" </p></p>
                  </h6> 
                    <p> Address </p>
                    <p> Business registration certificate number </p>
                    <p> Place of issue </p> 
                    <p> Issue date </p> 
                </div>
                          
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4"> Customer service </h6>
                    <p>
                      <a href="#!" className="text-reset"> Shopping guide </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset"> Shipping policy </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset"> Payment poilcy </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset"> Privacy policy </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset"> Return Policy </a>
                    </p>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center p-4 bs">
              © 2022 Copyright:
              <a> Đỗ Trí Dũng 20209012 </a>
          </div>

        </footer>
      </div> 
    );
}

export default Footer;
