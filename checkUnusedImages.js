const fs = require('fs');
const path = require('path');

// Đường dẫn đến các thư mục
const imagesDir = './src/img';
const srcDir = './src';

// Hàm để đọc tất cả các file trong một thư mục (bao gồm cả thư mục con)
function readFilesRecursively(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            readFilesRecursively(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });
    return fileList;
}

// Đọc tất cả các file ảnh
const imageFiles = readFilesRecursively(imagesDir)
    .filter(file => /\.(png|jpg|jpeg|gif|svg|webp|ico)$/i.test(file));

// Đọc tất cả các file HTML, JS, CSS
const sourceFiles = readFilesRecursively(srcDir)
    .filter(file => /\.(html|js|css)$/i.test(file));

// Hàm kiểm tra xem một file ảnh có được sử dụng không
function isImageUsed(imagePath, sourceFiles) {
    const imageName = path.basename(imagePath);
    const searchPattern = `${imageName}`;

    return sourceFiles.some(sourceFile => {
        const content = fs.readFileSync(sourceFile, 'utf8');
        return content.includes(searchPattern);
    });
}

// Kiểm tra mỗi file ảnh
const unusedImages = imageFiles.filter(imagePath => !isImageUsed(imagePath, sourceFiles));

console.log('Unused images:');
console.log(unusedImages);

const deleteUnusedImages = () => {
    unusedImages.forEach(imagePath => {
        try {
            fs.unlinkSync(imagePath);
            console.log(`Đã xóa file: ${imagePath}`);
        } catch (err) {
            console.error(`Lỗi khi xóa file ${imagePath}:`, err);
        }
    });
};

// Hỏi người dùng xác nhận trước khi xóa
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Bạn có chắc chắn muốn xóa các file ảnh không sử dụng? (y/n) ', answer => {
    if (answer.toLowerCase() === 'y') {
        deleteUnusedImages();
        console.log('Đã xóa xong các file ảnh không sử dụng.');
    } else {
        console.log('Hủy thao tác xóa.');
    }
    readline.close();
});