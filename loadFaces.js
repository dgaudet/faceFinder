const util = require('util');
const fr = require('face-recognition');
const fs = require('fs');

const detector = fr.FaceDetector();
const readdir = util.promisify(fs.readdir);

exports.retreiveFaces = async(fromDir) => {
  let faces = [];
  try {
    faces = await this.storeImagesFiles(fromDir);
  } catch (e) {
    console.log('Error loading faces: ', e);
  }
  return faces;
}

exports.storeImagesFiles = async(fromDir, toDir, filePrefix) => {
  console.log('Start Loading Faces: ', new Date());
  const files = await getFileNames(fromDir);
  const filteredFileNames = files.filter(file => file !== '.DS_Store');

  let allFaces = [];

  filteredFileNames.forEach(file => {
    const fileName = `${fromDir}/${file}`;
    console.log(`Loading file: ${fileName}`);
    const image = fr.loadImage(fileName);
    const faceImages = detector.detectFaces(image);
    if(toDir !== undefined && toDir.trim().length > 0) {
      faceImages.forEach((img, i) => saveImage(toDir, `${filePrefix}-${file}-${i}.png`));
    }
    allFaces = allFaces.concat(faceImages);
  });

  console.log('End Loading Faces: ', new Date());

  return allFaces;
};

const saveImage = (image, toDir, fileName) => {
  fr.saveImage(`${toDir}/${fileName}`, image);
}

async function getFileNames(dir) {
  let fileNames;
  try {
    const names = await readdir(dir);
    fileNames = names;
  } catch (e) {
    console.log(`There was a problem loading file names from ${dir}`, e);
  }

  return fileNames;
}
