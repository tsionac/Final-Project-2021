class ActiveEdits {

  //Save a list of curently active edits (ent time was not recived yet)
  // for each component, store a list of active users and thier start edit time
  //userEdits =  new Map<String, {"userID":String, "time":any}[]>([]);
  userEdits =  new Map([]);




  /**
   * get a list of currently active editors by the componnent ID
   *  WARNING : this methos is not thread safe, and should be updated later on
   * @param componentID the id of the component
   */
  getCurrentEditorsList(componentID) {
    if(!this.userEdits.has(componentID)){
      this.userEdits.set(componentID, []);
    }

    // the reson for temp is only to eliminate typescript error
    let temp = this.userEdits.get(componentID);

    if(temp){
      return temp;
    }

    return [];
  }


  /**
   * a user as start editing a component - saving a record of it until this user finish the edit
   *  WARNING : this methos is not thread safe, and should be updated later on
   * @param userID user id
   * @param componentID the id of the edited component
   */
  startEdit(userID, componentID, time){
    // save the edit record
    this.getCurrentEditorsList(componentID).push({"userID":userID, "time":time});
  }

  /**
   * mark the end of a user edt, and return it's start ednt time
   * @param userID the id of the editor
   * @param componentID the id of the edited component
   */
  endEdit(userID, componentID){
    return this.removeUserEntryofComponent(userID, componentID);

  }



  // ------------------------------------- private methods ---------------------------------------------------

  /**
   * delete a useredit entry on a component
   * WARNING : this methos is not thread safe, and should be updated later on
   * @param userID the id of the editor
   * @param componentID the id of the component
   */
   /*private*/ removeUserEntryofComponent(userID, componentID){
    //let arr:{"userID":String, "time":any}[] = this.getCurrentEditorsList(componentID);
    let arr = this.getCurrentEditorsList(componentID);
    let time = undefined;

    arr.forEach( (item, index) => {
      if(item.userID === userID) {
        // remove the entry
        arr.splice(index,1);

        if(arr.length == 0){
          this.userEdits.delete(componentID)
        }

        time = item.time;
        return;
      };
    });

    return time;
 }
}







module.exports =  { ActiveEdits };