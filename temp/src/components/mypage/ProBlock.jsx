function ProBlock(props) {
  return (
    <>
      <div className="my_top-left-each">
        <div className="my_top-left-top">{props.title}</div>
        <div className="my_top-left-top">{props.day}</div>
        <div className="my_top-left-bottom">{props.count}</div>
      </div>
    </>
  );
}

export default ProBlock;
