const body = document.querySelector("body");

const cohortName = "2404-FTB-MT-WEB-PT";

const APIUrl = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohortName}/events`;

const main = document.querySelector("main");

const newEventForm = document.querySelector("#addNewPartyForm")


const state = {
  parties:[]
};

const fetchAllParties = async () => {

  try {
  const request = await fetch(APIUrl);
  const response = await request.json();

  state.parties = response.data;

  console.log(state.parties)
} catch(error) {
  console.log("Error fetching the parties", error)
}
};



const deleteParty = async (partyId) => {

  try {
    const response = await fetch(`${APIUrl}/${partyId}`, {
      method: "DELETE"
    });

    const result = await response.json();
    
    await fetchAllParties();
    await renderAllParties();

    console.log("result is here", result);
  

  } catch (err) {
    console.error("error deleting party",
      
      err
    );
  }
};

const addNewParty = async(partyObj) => {

  try {

    console.log("adding new party", partyObj);

    const response = await fetch (APIUrl, {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(partyObj)
      
    });

    const result = await response.json();

    console.log("API response", result);

    await fetchAllParties();
    await renderAllParties();

    console.log("new parties are here", state)

  } catch (error) {
    "Oops! Error trying to create a new party", error
  }

}

const renderNewPartyForm = () => {

  try {

    const newPartyForm = document.createElement ("form");

    const nameInput = document.createElement ("input");
    const descInput = document.createElement ("input");
    const dateInput = document.createElement ("input");
    const locationInput = document.createElement ("input");

    const nameLabel = document.createElement ("label");
    const descLabel = document.createElement ("label");
    const dateLabel = document.createElement ("label");
    const locationLabel = document.createElement ("label");

    nameLabel.textContent = "Name";
    descLabel.textContent = "Description";
    dateLabel.textContent = "Date";
    locationLabel.textContent = "Location";

    const submitButton = document.createElement ("button");
    submitButton.textContent = "Create New Party";

    submitButton.addEventListener("click", (event) => {

      event.preventDefault();

      const newPartyObj = {
        name: nameInput.value,
        description: descInput.value,
        date: dateInput.value,
        location: locationInput.value
      };

      addNewParty(newPartyObj);

      nameInput.value = "";
      descInput.value="";
      dateInput.value="";
      locationInput.value="";

      


    });

    newPartyForm.append(nameLabel, nameInput, descLabel, descInput, dateLabel, dateInput, locationLabel, locationInput, submitButton)

    newEventForm.append(newPartyForm);

    newPartyForm.style.display = "flex";
    newPartyForm.style.flexDirection = "column";

   




  

  } catch (error) {
    "Ooops! Error while adding a new party", error
  }
}



renderNewPartyForm()



const renderAllParties = async (parties) => {

   await fetchAllParties();

  const holders = [];

  state.parties.map(party => {
    
    const partyHolder = document.createElement("div");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Party";

    deleteButton.addEventListener("click", async () => {

      await deleteParty(party.id);

      await renderAllParties();

  });
    

    const nameParty = document.createElement("h2");
    const descriptionParty = document.createElement("h3");
    const dateParty = document.createElement("h3");
    const locationParty = document.createElement("h3");

    nameParty.textContent = party.name;
    descriptionParty.textContent = party.description;
    dateParty.textContent = party.date;
    locationParty.textContent = party.location;

    partyHolder.append(nameParty, descriptionParty, dateParty, locationParty, deleteButton);
    partyHolder.style.border = "1px solid black";
    partyHolder.style.margin = "2em";
    partyHolder.style.padding = "2em";

    holders.push(partyHolder);

    // console.log("partyHolder is here", partyHolder)
  });

  main.replaceChildren(...holders)

};



renderAllParties();