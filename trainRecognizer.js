const fs = require('fs');
const fr = require('face-recognition');

const loadFaces = require('./loadFaces.js');

exports.addFacesToRecognizer = async(recognizer, nameForFace, dirWithFaceImages) => {
  try {
    const faces = await loadFaces.retreiveFaces(dirWithFaceImages);
    recognizer.addFaces(faces, nameForFace);
  } catch(e) {
    console.log('Error loading faces: ', e);
  }
  return recognizer;
}

exports.saveModelState = (recognizer, fileName) => {
  const modelState = recognizer.serialize();
  fs.writeFileSync(fileName, JSON.stringify(modelState));
}

exports.saveFaces = async(recognizer, nameForFace, dirWithFaceImages, stateFile) => {
  const rc = await addFacesToRecognizer(recognizer, nameForFace, dirWithFaceImages);
  saveModelState(rc, stateFile);
}
