import { Children } from "react";

function TextBlock({header, paragraph, typeStyle, children}) {
  return <div className={`text-block text-block_type_${typeStyle}`}>
    <h3 className={`text-block__header text-block__header_type_${typeStyle}`}>{header}</h3>
    {Children.toArray(children)[0]}
    <p className={`text-block__paragraph text-block__paragraph_type_${typeStyle}`}>{paragraph}</p>
    {Children.toArray(children)[1]}
  </div>;
}

export default TextBlock;
