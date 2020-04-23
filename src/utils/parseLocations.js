const csv = require("csv-parse");
const fs = require("fs");

fs.createReadStream("make_model_type.csv")
  .pipe(csv({ columns: true, skip_lines_with_empty_values: false }))
  .on("data", (row) => {
    raw_array.push(row);
  })
  .on("end", () => {
    parse_array(raw_array);
  });
