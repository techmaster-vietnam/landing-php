const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const directoryPath = path.join(__dirname, "src");

const convertImageFiles = (dir) => {
  try {
    fs.readdir(dir, (err, files) => {
      if (err) {
        return console.log("Cannot read directory: " + err);
      }

      files.forEach((file) => {
        const filePath = path.join(dir, file);
        fs.stat(filePath, (err, stat) => {
          if (err) {
            return console.log("Cannot read file: " + err);
          }

          if (stat.isDirectory()) {
            convertImageFiles(filePath);
          } else {
            const ext = path.extname(file).toLowerCase();
            if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
              const outputFilePath = filePath.replace(ext, ".webp");

              sharp(filePath)
                .toFormat("webp")
                .toFile(outputFilePath, (err) => {
                  if (err) {
                    return console.log("Cannot convert file: " + err);
                  }

                  fs.unlink(filePath, (err) => {
                    if (err) {
                      return console.log("Cannot delete original file: " + err);
                    }
                    console.log(`Deleted original file: ${filePath}`);
                  });
                });
            }
          }
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

convertImageFiles(directoryPath);
