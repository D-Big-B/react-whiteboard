import React, { useEffect } from "react";

import "./style.css";

let canvas;
let ctx;

export default function Board({ color, size }) {
  useEffect(() => {
    drawOnCanvas();
  }, []);

  useEffect(() => {
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
  }, [color, size]);

  const drawOnCanvas = () => {
    canvas = document.querySelector("#board");
    ctx = canvas.getContext("2d");
    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));
    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - canvas.offsetLeft;
        mouse.y = e.pageY - canvas.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    canvas.addEventListener(
      "mousedown",
      function () {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );

    const onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();
    };
  };
  return (
    <div className="sketch" id="sketch">
      <canvas className="board" id="board"></canvas>
    </div>
  );
}
