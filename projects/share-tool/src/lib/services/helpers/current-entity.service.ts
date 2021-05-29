import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentEntityService {

  private CurrentEntity:string = 'currentEntity';

  constructor() { }

  /**
   * @returns get the currently entity in use
   */
  getCurrentEntity(){
    return sessionStorage.getItem(this.CurrentEntity);
  }

  /**
   * set the id of the currently in use entity
   * @param entityID the ID if current entity
   */
  setCurrentEntity(entityID:string){
    sessionStorage.setItem(this.CurrentEntity, entityID);
  }

  /**
   * clear the current entity in use
   */
  clear() {
    sessionStorage.removeItem(this.CurrentEntity);
  }
}
