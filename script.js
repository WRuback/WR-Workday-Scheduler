// Grabbing elements that are needed.
var today = $("#currentDay");
var schedule = $("#scheduler");

// This will store the local storage item of the event plans.
var plans = "";

//Sets up the scene.
function init(){
    // Sets the current day display to today.
    today.text(moment().format("MMMM Do, YYYY"));
    // If not made yet, this creates a blank plan list. Each part of the array is a time from 9am [0], to 5pm [8].
    if(localStorage.getItem("plans") === null){
        localStorage.setItem("plans", JSON.stringify([
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ]));
    }
    plans = JSON.parse(localStorage.getItem("plans"));
    // Runs the scheduler builder.
    buildScheduler();
}

// Create the row element, and puts the information into the row's individual elements.
function buildRow(time, plan){
    // Sets up the Row parent div.
    let scheduleRow = $("<div>");
    scheduleRow.addClass("row");

    // Creates the time display element, applies classes and appends it to the row.
    let timeDisplay = $("<p>");
    timeDisplay.addClass("col-2 hour text-right p-2");
    timeDisplay.text(time.format("hA"));
    scheduleRow.append(timeDisplay);

    // Creates the plan input element, applies classes and appends it to the row.
    let planInput = $("<textarea>");
    planInput.addClass("col-8");
    //Check the current time. If it is after the current time, set style to future. Before, the past. If the same, set to present.
    if(time.hour() > moment().hour()){
        planInput.addClass("future");
    }
    else if(time.hour() < moment().hour()) {
        planInput.addClass("past");
    }
    else{
        planInput.addClass("present");
    }
    planInput.val(plan);
    scheduleRow.append(planInput);

    // Creates the save button element, applies classes and appends it to the row.
    let saveButton = $("<button>");
    saveButton.addClass("col-2 btn saveBtn");
    // Adds the Floppy disk icon element to the button.
    saveButton.append("<i>").addClass("fa fa-floppy-o fa-3x");
    scheduleRow.append(saveButton);

    // Adds the newly made row to the schedule object.
    schedule.append(scheduleRow);
}

// Creates each of the rows in the schedule.
function buildScheduler(){
    // Sets the time item to be 8am. When the loop runs, one hour will be added, making the starter element have the right time of 9am.
    let hour = moment("8AM", "hA");
    // The plans, grabbed from local storage, is the exact length to start at 9am, and end at 5pm.
    for(let i =0;i<plans.length; i++){
        hour.add(1, "h");
        buildRow(hour, plans[i]);
    }
}

// Saves the added text to the local storage. No update on the screen needs to be done, as the saved item is already displayed on the page, and will be re-displayed on a page refresh.
function savePlan(event){
    // These navigate from the pressed button, to the textbox.
    let planBox = $(event.target).siblings("textarea");
    // Find the parent row, and it's index in the schedule. This will be the same index as where the new plan needs to be saved in the plans array, due to the order they were added in.
    plans[planBox.parent().index()] = planBox.val();
    localStorage.setItem("plans",JSON.stringify(plans));

}

// Runs the setup function.
init();
// Sets the save buttons to have the call for savePlan.
schedule.on("click", ".btn", savePlan);