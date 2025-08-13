import React, { useState } from 'react';
import './App.css';

const Calculator = () => {
  const [expression, setExpression] = useState("");

  const display = (val) => {
    if (val === '=') {
      calculate(expression);
    } else {
      setExpression((prev) => prev + val);
    }
  };

  const calculate = (exp) => {
    try {
      let input = exp.match(/\d+(\.\d+)?/g);
      let op = exp.match(/[+\-*/]/g);

      if (!input || !op) return;

      let temp_op = [];
      let temp_input = [];
      let result = parseFloat(input[0]);

      for (let i = 0; i < op.length; i++) {
        const nextVal = parseFloat(input[i + 1]);
        if (op[i] === "*") {
          result *= nextVal;
        } else if (op[i] === "/") {
          result /= nextVal;
        } else {
          temp_op.push(op[i]);
          temp_input.push(result);
          result = nextVal;
        }
      }

      temp_input.push(result);
      result = temp_input[0];

      for (let i = 0; i < temp_op.length; i++) {
        if (temp_op[i] === "+") {
          result += temp_input[i + 1];
        } else if (temp_op[i] === "-") {
          result -= temp_input[i + 1];
        }
      }

      setExpression(result.toString());
    } catch (error) {
      setExpression("Error");
    }
  };

  const clear = () => {
    setExpression("");
  };

  const refresh = () => {
    window.location.reload();
  };

  return (
    <div className="back">
      <div className="total">
        <h3 className="cal">CALCULATOR</h3>
        <div>
          <input type="text" className="t1" value={expression} readOnly />
        </div>
        <div className="button">
          {["1", "2", "3", "+"].map((val) => (
            <button key={val} className="b1" onClick={() => display(val)}>
              {val}
            </button>
          ))}<br />

          {["4", "5", "6", "-"].map((val) => (
            <button key={val} className="b1" onClick={() => display(val)}>
              {val}
            </button>
          ))}<br />

          {["7", "8", "9", "*"].map((val) => (
            <button key={val} className="b1" onClick={() => display(val)}>
              {val === "*" ? "x" : val}
            </button>
          ))}<br />

          {[".", "0", "=", "/"].map((val) => (
            <button key={val} className="b1" onClick={() => display(val)}>
              {val === "/" ? "%" : val}
            </button>
          ))}<br />

          {/* Clear and Refresh buttons */}
          <button className="b1" onClick={clear}>C</button>
         
        </div>
      </div>
    </div>
  );
};

export default Calculator;
