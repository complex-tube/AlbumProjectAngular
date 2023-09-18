import { createAction } from '@ngrx/store';

export namespace CardsActions {
  export const getImages = createAction('[Cards List] Get Images');
  export const createImagesFolder = createAction(
    '[Register Window] Create Image Folder For New User',
  );
  export const uploadImage = createAction('[Cards List] Upload Image');
  export const deleteImage = createAction('[Cards List] Delete Image');
  export const editImage = createAction('[Card Edit Window] Edit Image');
}
