import TextBlock from "../TextBlock/TextBlock";
function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title" id="aboutProject">
        О проекте
      </h2>
      <div className="about-project__two-columns">
        <TextBlock
          header="Дипломный проект включал 5 этапов"
          paragraph="Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки."
          typeStyle="about-project"
        />
        <TextBlock
          header="На выполнение диплома ушло 5 недель"
          paragraph="У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься."
          typeStyle="about-project"
        />
      </div>
      <div className="about-project__timeline">
        <div className="about-project__backend">
          <h4 className="about-project__backend-week">1 неделя</h4>
          <p className="about-project__work">Back-end</p>
        </div>
        <div className="about-project__frontend">
          <h4 className="about-project__frontend-week">4 недели</h4>
          <p className="about-project__work">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
