const fr = require('face-recognition');
const readline = require('readline');

const loadFaces = require('./loadFaces.js');
const trainRecognizer = require('./trainRecognizer.js');
const draw = require('./draw.js');

let recognizer = fr.FaceRecognizer();
const detector = fr.FaceDetector();
// const detector = fr.FrontalFaceDetector();

const loadAllFaces = async(outputStateFile) => {
  try {
    recognizer = await trainRecognizer.addFacesToRecognizer(recognizer, 'Richard Hammond', 'training/RichardHammond');
    recognizer = await trainRecognizer.addFacesToRecognizer(recognizer, 'Jeremy Clarkson', 'training/JeremyClarkson');
    recognizer = await trainRecognizer.addFacesToRecognizer(recognizer, 'James May', 'training/JamesMay');
    trainRecognizer.saveModelState(recognizer, outputStateFile);
  } catch (e) {
    console.log('Error loading all faces: ', e);
  }
}

const predictFace = async(outputStateFile, imageFile) => {
  const modelState = require(outputStateFile);
  recognizer.load(modelState);

  const image = fr.loadImage(imageFile);

  const detectedFaces = detector.detectFaces(image);
  console.log(detectedFaces);
  const predictDetectedFace = recognizer.predictBest(detectedFaces[0]);
  console.log('detectedFace prediction', predictDetectedFace);
  const predictedName = predictDetectedFace.className;

  const faceRectangles = detector.locateFaces(image);
  faceRectangles.forEach((MmodRect) => {
    console.log(MmodRect);
    console.log(predictedName);
    draw.drawRect(imageFile, 'test.jpg', predictedName,
    MmodRect.rect.left, MmodRect.rect.top, MmodRect.rect.right, MmodRect.rect.bottom);
  });

  console.log(image);
  const predictImage = recognizer.predict(image);
  console.log('Image prediction', predictImage);
}

const predictMultipleFaces = async(outputStateFile, imageFile) => {
  console.log('Start Detecting Faces: ', new Date());
  const modelState = require(outputStateFile);
  recognizer.load(modelState);

  const image = fr.loadImage(imageFile);

  const detectedFaces = detector.detectFaces(image);
  const predictedNames = detectedFaces.map(face => {
    const predictedFace = recognizer.predictBest(face);
    return predictedFace.className;
  })

  console.log('detectedFace prediction', predictedNames);

  const faceRectangles = detector.locateFaces(image);
  const rectangles = faceRectangles.map((MmodRect, i) => {
    return {
      rect: {
        x: MmodRect.rect.left,
        y: MmodRect.rect.top,
        x1: MmodRect.rect.right,
        y1: MmodRect.rect.bottom,
      },
      name: predictedNames[i]
    }
  });

  draw.drawRects(imageFile, 'test.jpg', rectangles);
  console.log('End Detecting Faces: ', new Date());
}

// loadFaces.storeImagesFiles('forDetection', 'detectedFaces', 'test');
// loadAllFaces('model.json');
// draw.drawRect('testImages/JeremyClarkson1.jpg', 'test.jpg', 'Name Test', 972, 311, 1559, 898);
// predictFace('./model.json', 'testImages/JeremyClarkson2.jpg');
predictMultipleFaces('./model.json', 'testImages/gt10.jpg');
