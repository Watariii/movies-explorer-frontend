import TextBlock from "../TextBlock/TextBlock";
import Portfolio from "../Portfolio/Portfolio";
import aboutMePhoto from "../../images/about-me__photo.jpg";
import { Link } from "react-router-dom";
function AboutMe() {
  return (
    <>
      <section className="about-me" id="aboutMe">
        <h2 className="about-me__title">
          Студент
        </h2>
        <div className="about-me__info">
          <TextBlock
            header="Никита"
            paragraph="Я родился в Сызрани, Самарской области, закончил аэрокосмический факультет Московского авиационного института. 
        Увлекаюсь спортом и все что связано с космической тематикой. 
        С 2017 года работаю в РКК Энергия. В 2022 начал учиться в Яндекс.Практикуме веб-разработке.
        В настоящее время увлекся веб-разработкой и после окончания курса планирую сменить профессию."
            typeStyle="about-me"
          >
            <h4 className="about-me__subtitle">Инженер, 28 лет</h4>
            <Link
              to="https://github.com/Watariii?tab=repositories"
              className="about-me__link"
              target="_blank"
            >
              Github
            </Link>
          </TextBlock>
          <img
            className="about-me__photo"
            src={aboutMePhoto}
            alt="фото со мной"
          ></img>
        </div>
        <Portfolio />
      </section>
    </>
  );
}
export default AboutMe;
