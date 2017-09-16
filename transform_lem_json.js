function toNew(lem) {
  let startID = lem.startIDs[0];
  let stopID = lem.stopIDs[0];

  delete lem.startIDs;
  delete lem.stopIDs;

  for(let i = 0; i < lem.building_blocks.length; i++) {
    lem.building_blocks[i].id = String(lem.building_blocks[i].id);
  }

  for(let i = 0; i < lem.contexts.length; i++) {
    lem.contexts[i].id = String(lem.contexts[i].id);
    for(let j = 0; j < lem.contexts[i].building_blocks.length; j++) {
      lem.contexts[i].building_blocks[j].id = String(lem.contexts[i].building_blocks[j].id);
    }
  }

  for(let i = 0; i < lem.actions.length; i++) {
    lem.actions[i].id = String(lem.actions[i].id);
    lem.actions[i].source = String(lem.actions[i].source);
    lem.actions[i].target = String(lem.actions[i].target);
  }

  for(let i = 0; i < lem.notations.length; i++) {
    lem.notations[i].building_block = String(lem.notations[i].building_block);
  }

  addStartID(startID, lem);
  addStopID(stopID, lem);

  console.log(lem);
}

function getUniqueActionID(lem) {
  let newID = 0;
  let unique = false;

  while (unique === false && newID < 100) {
    newID++;

    unique = true;
    for (let i = 0; i < lem.actions.length; i++) {
      if (lem.actions[i].id === String(newID)) {
        unique = false;
        break;
      }
    }
  }

  return newID;
}

function addStartID(id, lem) {
  let newID = getUniqueActionID(lem);

  lem.actions.push({
    "id": String(newID),
    "action_type": "Learner Action",
    "source": "start",
    "target": String(id)
  });
}

function addStopID(id, lem) {
  let newID = getUniqueActionID(lem);

  lem.actions.push({
    "id": String(newID),
    "action_type": "Learner Action",
    "source": String(id),
    "target": "stop"
  });
}
