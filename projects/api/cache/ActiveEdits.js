class ActiveEdits {

  //Save a list of curently active edits (ent time was not recived yet)
  // for each component, store a list of active users and thier start edit time
  userEdits =  new Map();

  //use for seperation between difrent key properties
  seperator = '\t';




  /**
   * get a list of currently active editors by the componnent ID
   * @param companyID the id of the company
   * @param componentID the id of the component
   */
  getCurrentEditorsList(companyID, componentID) {
    let lst = [];

    for (const [ key, value ] of Object.entries(this.userEdits)) {
      if((this.getPropertyOfKey(key, 'companyID') === companyID)  &&  (this.getPropertyOfKey(key, 'componentID') === componentID)){
        lst.push(this.getPropertyOfKey(key, 'userID'));
      }
    }

    return lst;
  }


  /**
   * a user as start editing a component - saving a record of it until this user finish the edit
   *  WARNING : this methos is not thread safe, and should be updated later on
   * @param companyID  the company
   * @param componentID the id of the edited component
   * @param userID user id
   * @param time the tine the edid started at
   */
  startEdit(companyID, componentID, userID, time){
    // save the edit record
    this.userEdits[this.createKey(companyID, componentID, userID)] = time;
  }

  /**
   * mark the end of a user edt, and return it's start ednt time
   * @param companyID  the company
   * @param componentID the id of the edited component
   * @param userID user id
   */
  endEdit(companyID, componentID, userID){
    let key   = this.createKey(companyID, componentID, userID);
    let time  = this.userEdits[key];
    delete this.userEdits[key];

    return time;
  }



  // ------------------------------------- private methods ---------------------------------------------------

  createKey(companyID, componentID, userID){
    companyID   = companyID   .toString().replace('\t', '');
    componentID = componentID .toString().replace('\t', '');
    userID      = userID      .toString().replace('\t', '');

    return (companyID.concat(componentID)).concat(userID)
  }

  getPropertyOfKey(key, property) {
    let splited = key.split(seperator);

    if (property === 'companyID'){
      return splited[0]
    }

    if (property === 'componentID'){
      return splited[1]
    }

    if (property === 'userID'){
      return splited[2]
    }

    return '';
  }

}







module.exports =  { ActiveEdits };
