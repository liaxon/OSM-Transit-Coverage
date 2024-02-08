import "./App.css";

const LabeledInput = ({ label, contents, setContents}) => {
  return (
    <div className="Labeled-Input">
      <div>{label}</div>
      <input
        className="Main-Input"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
    </div>
  );
};

export default LabeledInput;
