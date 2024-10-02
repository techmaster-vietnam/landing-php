const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "src");

const convertExtFiles = (dir) => {
  try {
    fs.readdir(dir, (err, files) => {
      if (err) {
        return console.log(err);
      }

      files.forEach((file) => {
        const filePath = path.join(dir, file);

        fs.stat(filePath, (err, stat) => {
          if (err) {
            return console.log(err);
          }

          if (stat.isDirectory()) {
            convertExtFiles(filePath);
          } else {
            const ext = path.extname(file).toLowerCase();

            if (ext === ".html" || ext === ".js" || ext === ".css") {
              const content = fs.readFileSync(filePath, "utf8");
              const contentReplace = content.replace(
                /\.(png|jpe?g)/gi,
                ".webp"
              );

              fs.writeFileSync(filePath, contentReplace);
            }
          }
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

convertExtFiles(directoryPath);
