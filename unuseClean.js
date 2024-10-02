const fs = require("fs");
const path = require("path");

const imagesDir = "./src/img";
const srcDir = "./src";

function readFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      readFilesRecursively(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const imageFiles = readFilesRecursively(imagesDir).filter((file) =>
  /\.(png|jpg|jpeg|gif|svg|webp|ico)$/i.test(file)
);

const sourceFiles = readFilesRecursively(srcDir).filter((file) =>
  /\.(html|js|css)$/i.test(file)
);

function isImageUsed(imagePath, sourceFiles) {
  const imageName = path.basename(imagePath);
  const searchPattern = `${imageName}`;

  const searchExt = sourceFiles.some((sourceFile) => {
    const content = fs.readFileSync(sourceFile, "utf8");
    return (
      content.includes(`/${searchPattern}`) || content.includes(searchPattern)
    );
  });

  return searchExt;
}

const unusedImages = imageFiles.filter(
  (imagePath) => !isImageUsed(imagePath, sourceFiles)
);

console.log(unusedImages);

const deleteUnusedImages = () => {
  unusedImages.forEach((imagePath) => {
    try {
      fs.unlinkSync(imagePath);
    } catch (err) {
      console.error(`Lỗi khi xóa file ${imagePath}:`, err);
    }
  });
};

deleteUnusedImages();
