import React, { useState, useEffect } from "react";
import "./home.css";
import fonder from "../../assets/founder.jpg";
import school from "../../assets/schoolimg.jpg";
import Admistater1 from "../../assets/Admistater1.jpg";
import ceomis from "../../assets/ceomis.jpg";
import chairman from "../../assets/chairman.webp";
import corospondent from "../../assets/corospondent.webp";
import operationshead from "../../assets/operationshead.jpg";
import principal from "../../assets/principal.jpg";



const Home = () => {

  const statsData = [
    { label: 'FACULTIES', target: 1000 },
    { label: 'STUDENTS', target: 15000 },
    { label: 'BRANCHES', target: 8 },
    { label: 'CITIES', target: 5 }
  ];

  const [animatedCounts, setAnimatedCounts] = useState(statsData.map(() => 0));
  const [shouldAnimate, setShouldAnimate] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedCounts(statsData.map(() => 0));
      setShouldAnimate(true);
    }, 10000);

    return () => clearInterval(interval);
  }, []);



  const AnimatedCounter = ({ target, index }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!shouldAnimate) return;

      let start = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 20);

      return () => clearInterval(timer);
    }, [shouldAnimate, target]);

    return <p>{count.toLocaleString()}+</p>;
  };



  return (
    <>
      <div>
        <div>
        </div>

        <div className="fonderinto">
          <div>
            <img src={fonder} alt="img" />
          </div>
          <div>
            <h3>Founder’s Message</h3>
            <p>
              Today’s education is no more defined by boundaries. Now a days,
              knowledge is shared globally irrespective of time, <br />{" "}
              distance, geography or language through a technology platform
              (internet). Children of today need an education that <br />{" "}
              prepares them to meet the challenges of a competitive world. While
              academic strength is essential to survive, they need <br /> good
              communication skills, good character and an attitude to be
              lifelong learners and contribute in a positive way to the <br />{" "}
              society, at large. Ethics and etiquettes, morals and discipline,
              values and culture, all need to be ingrained into them to make{" "}
              <br /> them good beings who are capable of becoming global
              citizens.{" "}
            </p>
          </div>
        </div>

        <div className="schoolinfo">
          <div>
            <img src={school} className="schholimgs" alt="img" />
          </div>
          <div>
            <h3>Saraswathi Bhavan school's</h3>
            <p>
              Saraswathi Bhavan School renders quality education stressing on
              human excellence to transform and mould the younger generation <br /> to
              become dutiful and responsible individuals.  Saraswathi Bhavan
              School has a boarding facility, accommodating 880 inmates in a
              homely <br /> atmosphere imparting liberal education with traditional
              values of Empathy, Respect and Discipline where no fears prevail,
              a vision that <br /> leads to change. The purpose, the aim and the drive
              of  Saraswathi Bhavan School is to equip the student with the best
              available technology, <br /> so that he may function with clarity and
              efficiency in the modern world. It is far more important to create
              the right climate so that the child <br />may develop fully into a
              complete human being.
            </p>
          </div>
        </div>

        <div className="facstucit">
          <div>
            <AnimatedCounter target={statsData[0].target} index={0} style={{ marginLeft: "3px", fontSize: "50px" }} />
            <p><i className="fa-solid fa-map"></i></p>
            <strong>{statsData[0].label}</strong>
          </div>

          <div>
            <AnimatedCounter target={statsData[1].target} index={1} style={{ marginLeft: "3px", fontSize: "50px" }} />
            <p><i className="fa-solid fa-book-open"></i></p>
            <strong>{statsData[1].label}</strong>
          </div>

          <div>
            <AnimatedCounter target={statsData[2].target} index={2} style={{ marginLeft: "3px", fontSize: "50px" }} />
            <p><i className="fa-solid fa-building"></i></p>
            <strong>{statsData[2].label}</strong>
          </div>

          <div>
            <AnimatedCounter target={statsData[3].target} index={3} style={{ marginLeft: "3px", fontSize: "50px" }} />
            <p><i className="fa-solid fa-earth-americas"></i></p>
            <strong>{statsData[3].label}</strong>
          </div>
        </div>


        <div className="headAdministater"><h2>Our Skilled Administrators </h2></div>
        <div className="administaation">
          <div>
            <img id="imgadministation" src={chairman} alt="img" />
            <p style={{ marginLeft: "20px", marginTop: "10px" }}> Chairman :  Siva Shankara Modi</p>
          </div>

          <div>
            <img id="imgadministation" src={principal} alt="img" />
            <p style={{ marginLeft: "40px", marginTop: "10px" }}>Principal : Raghu madhav</p>
          </div>

          <div>
            <img id="imgadministation" src={ceomis} alt="img" />
            <p style={{ marginLeft: "70px", marginTop: "10px" }}>CEO : Murali Krishna</p>
          </div>

          <div>
            <img id="imgadministation" src={corospondent} alt="img" />
            <p style={{ marginLeft: "50px", marginTop: "10px" }}>Correspondent : Nehasvi</p>
          </div>

          <div>
            <img id="imgadministation" src={operationshead} alt="img" />
            <p style={{ marginLeft: "30px", marginTop: "10px" }}>Operation Head : Sai Sharanya</p>
          </div>

          <div>
            <img id="imgadministation" src={Admistater1} alt="img" />
            <p style={{ marginLeft: "50px", marginTop: "10px" }}>Administrtor : Vashmitha </p>
          </div>

        </div>


      </div>
    </>
  );
};

export default Home;
