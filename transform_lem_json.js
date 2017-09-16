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
    lem.notations[i].id = String(lem.notations[i].id) || getUniqueID(lem);

    let bbID = lem.notations[i].building_block;
    delete lem.notations[i].building_block;

    lem.actions.push({
      id: getUniqueID(lem),
      action_type: "notationEdge",
      source: lem.notations[i].id,
      target: String(bbID)
    });
  }

  addStartID(startID, lem);
  addStopID(stopID, lem);

  return lem;
}

function getUniqueID(lem) {
  let newID = 0;
  let unique = false;

  let numberOfElements = lem.actions.length + lem.building_blocks.length + lem.contexts.length + lem.building_blocks.length;
  while (unique === false && newID < 1.5 * numberOfElements) {
    newID++;

    unique = true;
    for (let i = 0; i < lem.actions.length; i++) {
      if (lem.actions[i].id == newID) {
        unique = false;
        break;
      }
    }

    for (let i = 0; i < lem.building_blocks.length; i++) {
      if (lem.building_blocks[i].id == newID) {
        unique = false;
        break;
      }
    }

    for (let i = 0; i < lem.contexts.length; i++) {
      if (lem.contexts[i].id == newID) {
        unique = false;
        break;
      }
    }

    for (let i = 0; i < lem.notations.length; i++) {
      if (lem.notations[i].id == newID) {
        unique = false;
        break;
      }
    }
  }

  return String(newID);
}

function addStartID(id, lem) {
  let newID = getUniqueID(lem);

  lem.actions.push({
    "id": newID,
    "action_type": "Learner Action",
    "source": "start",
    "target": String(id)
  });
}

function addStopID(id, lem) {
  let newID = getUniqueID(lem);

  lem.actions.push({
    "id": newID,
    "action_type": "Learner Action",
    "source": String(id),
    "target": "stop"
  });
}
