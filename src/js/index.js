import 'normalize.css';
import cat from '../asset/cat1.png';
import Rx from 'rx';
import Konva from 'konva';
import { getPhoto, getImage, getImagePromise } from './request';
import {
  reposTemplate,
  userTemplate
} from './templates';
import '../css/base.css';
   

var canvas = document.querySelector('#canvas_container');



const clipers = img => Array.from(Array(9).keys()).map(num => {
  const clipX = img.width / 3;
  const clipY = img.height / 3;
  return new Konva.Group({
      x: Math.random()*1000 % 200,
      y: Math.random()*1000 % 200,
      clip: {
          x : (num % 3) * clipX,
          y : Math.floor(num / 3) * clipY,
          width : clipX,
          height : clipY
      },
      draggable: true
  });
})


const buildStage = image => {
  const stage = new Konva.Stage({
    container: 'canvas_container',
    width: 700,
    height: 700
  });
  const layer = new Konva.Layer();

  const groups = clipers(image);

  clipers(image).forEach(group => {
    group.add(new Konva.Image({ image: image, x: 0, y: 0 }))
    
    layer.add(group)
  });

  // layer.add(originImage);
  stage.add(layer);
}


$(() => {
  $("#target-img").attr('src', cat)
  getImagePromise(cat).then(img => {
    buildStage(img)
  }).catch(err => console.log(err))
});