import SyntaxHighlighter from "react-syntax-highlighter";

const CodeBlock = ({ code }) => {
  return (
    <SyntaxHighlighter
      children={code}
      language="lua"
      customStyle={{
        backgroundColor: "transparent",
      }}
    />
  );
};

export default CodeBlock;
