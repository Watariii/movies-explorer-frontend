import TextBlock from "../TextBlock/TextBlock";

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title" id="techs">
        Технологии
      </h2>
      <TextBlock
        header="7 технологий"
        paragraph="На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте."
        typeStyle="techs"
      />
      <ul className="techs__stack-list">
        <li className="techs__stack">HTML</li>
        <li className="techs__stack">CSS</li>
        <li className="techs__stack">JS</li>
        <li className="techs__stack">React</li>
        <li className="techs__stack">Git</li>
        <li className="techs__stack">Express.js</li>
        <li className="techs__stack">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
