import { getArrayComments, getRandomInt } from './util.js';

const OBJECT_COUNT = 25;
const MAX_LIKE_COUNT = 200;
const MAX_ID = 200;

const getArrayData = () => {

    let arrayCheckId = [];
    let arrayCheckFoto = [];

    let arrayCheckCommentsId = [];
    let currentArray = [];

    for (let i = 1; i <= OBJECT_COUNT; i++) {

        currentArray.push({
            'id': getRandomInt(1, OBJECT_COUNT, arrayCheckId),
            'url': `photos/${getRandomInt(1, OBJECT_COUNT, arrayCheckFoto)}.jpg`,
            'description': 'Описание фотографии',
            'likes': getRandomInt(15, MAX_LIKE_COUNT),
            'comments': getArrayComments(arrayCheckCommentsId, MAX_ID),
        }, )
    }
    // console.log(currentArray)
    return currentArray;
}

const getData = getArrayData();

export { getData };
