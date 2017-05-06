import Rx from 'rx';
import { polyfill } from 'es6-promise';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

polyfill();

export const getImagePromise = url => {   
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const edge = Math.sqrt(Math.pow(img.width, 2) + Math.pow(img.height, 2))
        const slope = 800 / edge;
        img.width = img.width * slope;
        img.height = img.height * slope;
        resolve(img);
      };
      img.onerror = (err) => {
        console.log(err)
        reject(err)
      }
    });
}

const getPhotoPromise = () => {
  return new Promise((resolve, reject) => {
    NProgress.start();
    NProgress.set(0.4);
    $.ajax({
      type: "GET",
      url: `https://api.imgur.com/3/gallery/random/random/0`,
      success: (res) => {
        NProgress.done();
        const data = res.data.filter(item => !!~["image/png", "image/jpeg"].indexOf(item.type))
        resolve(data[parseInt(Math.random()*1000) % data.length]);
      },
      error: (err) => {
        console.log(err);
        NProgress.done();
        resolve([]);
      }
    });
  });
};

export const getPhoto = () => Rx.Observable.fromPromise(getPhotoPromise());  
export const getImage = () => Rx.Observable.fromPromise(getImagePromise());