const { optimize } = require("svgo");
const fs = require("fs");

const svg = fs.readFileSync("./src/shared/assets/icons/theme-dark.svg", "utf8");

const result = optimize(svg, {
  plugins: [
    {
      name: "convertColors",
      params: {
        currentColor: true,
      },
    },
  ],
});

console.log(result.data);
