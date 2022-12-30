const About = () => {
    return (
        <div className="container">
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            What liteForum is about?
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                            <strong>liteForum is a lightweight web app designed with simplicity in mind.</strong> Powered by React and Ruby on Rails, it achieves full CRUD functionality with a minimalistic design. In the future, I hope to add more features to the app and make it a dedicated forum for CS students to discuss Ph.D. applications.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Current Limitations
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body">
                            <strong>liteForum is still in its Beta.</strong> Primarily served as a learning tool for myself, it has yet to be ready for production. The current limitations include: <strong>1.</strong> Lack of support for images. <strong>2.</strong> Lack of spam protection. This is primarily due to the absence of industry-standard tools such as AWS S3 and reCAPTCHA. <strong>3.</strong> Features like page navigation and search still need to be implemented.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Contact me
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                        <div className="accordion-body">
                            My personal web page is not yet ready lol. But you can reach me at <a href="mailto:nobles-useless.0e@icloud.com">this email address.</a>
                        </div>
                    </div>
                </div>
            </div>
            <img src="//clustrmaps.com/map_v2.png?cl=ffffff&w=a&t=n&d=0QrDbH61H9JzvyMfb4suIgMUwnqTponTI60TKCEM454&co=2d78ad&ct=ffffff" style={{ borderRadius: '10%', display: 'block', margin: '18px auto 0' }} />
        </div>)
}

export default About;