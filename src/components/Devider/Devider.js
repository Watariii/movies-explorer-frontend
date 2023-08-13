function Devider({children, type}) {
    return (
      <section className={`devider devider_type_${type}`}>
        {children}
      </section>
    );
  }
  
  export default Devider;