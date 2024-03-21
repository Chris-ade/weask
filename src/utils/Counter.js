import React, { useEffect, useState } from "react";

const Counter = ({
  max = 100,
  opacity = 0.8,
  color = "#363642",
  input = true,
  className,
  inputType = "text",
  onChange,
  onClick,
  textArea = false,
}) => {
  const [remaining, setRemaining] = useState(max);

  useEffect(() => {
    const inputEl = document.getElementById("character-counter-input");
    inputEl.addEventListener("input", updateRemaining);

    return () => {
      inputEl.removeEventListener("input", updateRemaining);
    };
  }, []);

  const updateRemaining = () => {
    const inputEl = document.querySelectorAll(".character-counter-input");
    inputEl.forEach((element) => {
      const valueLength = element.value.length;
      const remainingChars = max - valueLength;
      setRemaining(remainingChars);
    });
  };

  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
    updateRemaining();
  };

  const positionStyle = textArea
    ? { bottom: "10px" }
    : { top: "50%", transform: "translateY(-50%)" };

  return (
    <div className="character-wrap" style={{ position: "relative" }}>
      {!textArea ? (
        <input
          id="character-counter-input"
          className={`${className} character-counter-input`}
          type="text"
          onChange={handleChange}
          style={{ paddingRight: "35px" }}
          required
        />
      ) : (
        <textarea
          id="character-counter-input"
          className={`${className} character-counter-input`}
          onChange={handleChange}
          style={{ paddingRight: "35px" }}
          required
        ></textarea>
      )}
      <span
        className="remaining"
        style={{
          position: "absolute",
          opacity,
          color,
          right: "10px",
          ...positionStyle,
        }}
      >
        {remaining}
      </span>
    </div>
  );
};

export default Counter;
