import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EntryGeneretor {

  createRecord(userID:String, componentID:String, editStart:Date | undefined, editEnd:Date | undefined){
    return {userID, componentID, editStart, editEnd,}
  }

}
